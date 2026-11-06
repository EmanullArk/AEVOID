# Anexo D: Plan Integral de Mitigación y Hardening — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Este anexo recopila las directrices y controles técnicos recomendados por el equipo defensivo (**Blue Team**) para mitigar cada uno de los riesgos detectados durante las pruebas prácticas del framework:

---

## 1. Mitigaciones Técnicas por Dominio de Evaluación

### Dominio D02: DNS y Superficie Externa (`lab-02-dns` y `lab-06-maltego`)
1. **Despliegue de DNSSEC:**
   * Generar el par de claves KSK (Key Signing Key) y ZSK (Zone Signing Key) en el servidor autoritativo.
   * Firmar la zona autoritativa y exportar el registro DS (Delegation Signer) hacia el registrador (`Dynadot`).
   * Validar la cadena de confianza con la herramienta `dig @8.8.8.8 dominio.com +dnssec`.
2. **Restricción de Transferencia de Zona (AXFR):**
   * Configurar los servidores de nombres primarios para responder a solicitudes AXFR exclusivamente desde las direcciones IP de los servidores secundarios autorizados:
     ```bind
     allow-transfer { 192.0.2.10; 198.51.100.20; };
     ```
3. **Hardening de Políticas de Correo (SPF / DKIM / DMARC):**
   * Migrar registros SPF con modificador permisivo (`~all`) hacia directivas estrictas (`-all`).
   * Configurar DMARC en modo de rechazo obligatorio (`v=DMARC1; p=reject; rua=mailto:dmarc-reports@dominio.com`).

### Dominio D03 & D04: Seguridad Web y Autenticación (`lab-03-httrack` y `lab-07-burp`)
1. **Erradicación de Almacenamiento Inseguro en Frontend:**
   * Prohibir el uso de `localStorage` o `sessionStorage` para guardar tokens de sesión o identidades de usuario (`STORE_KEY`).
   * Implementar cookies de sesión configuradas con:
     * `HttpOnly`: Impide lectura o robo mediante inyección de scripts (XSS).
     * `Secure`: Obliga a su transmisión exclusiva a través de canales HTTPS cifrados con TLS 1.3.
     * `SameSite=Strict`: Neutraliza ataques de Cross-Site Request Forgery (CSRF).
2. **Mitigación de Enumeración de Cuentas y Fuerza Bruta en Login:**
   * Mantener respuestas genéricas y unificadas ante fallos de autenticación (ej. `"Usuario o clave incorrectos"`).
   * Implementar limitadores de tasa de peticiones (**Rate Limiting**) en el proxy inverso o WAF: máximo 5 intentos erróneos por IP en 15 minutos.
   * Forzar autenticación de doble factor (**MFA**) basada en TOTP o llaves FIDO2 para plataformas críticas (como el SAC institucional).
3. **Tratamiento de Ofuscación en Tránsito (Base64):**
   * Recordar que Base64 no es un mecanismo criptográfico. Reforzar el cifrado de transporte mediante cabeceras HSTS:
     ```http
     Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
     ```

### Dominio D05: Factor Humano e Ingeniería Social (`lab-05-ingenieria-social`)
1. **Control de Puertos Físicos y Medios Extraíbles:**
   * Deshabilitar el montaje automático de unidades de almacenamiento USB no corporativas mediante Directivas de Grupo (GPO en Windows) o módulos `usbguard` en Linux.
2. **Protocolos de Verificación de Identidad por Canales Alternativos:**
   * Establecer la regla institucional de que cualquier enlace, guía de instalación o software remitido por WhatsApp u otros servicios de mensajería debe contrastarse obligatoriamente con el portal oficial o el correo institucional del docente.
3. **Campañas Continuas de Simulación de Phishing:**
   * Ejecutar simulacros controlados de spear-phishing para medir la tasa de clics y reforzar la capacitación en los usuarios reincidentes.

### Dominio D06: Forense Digital y Prevención de Exfiltración (`lab-04-esteganografia`)
1. **Sanitización y Re-compresión de Archivos Multimedia (Content Disarm & Reconstruction - CDR):**
   * Configurar proxies y servidores de correo saliente para stripping automático de metadatos EXIF en archivos subidos por usuarios.
   * Forzar re-codificación de imágenes (re-encoding JPEG/PNG) en pasarelas públicas para destruir canales encubiertos esteganográficos basados en los bits menos significativos (LSB).
2. **Inspección de Flujos Binarios:**
   * Monitoreo perimetral para detectar discordancias entre cabeceras MIME y extensiones de archivos, así como tamaños de fichero anómalos respecto al contenido visual estándar.

### Dominio D08: Seguridad en Inteligencia Artificial y LLMs (`lab-08-prompt-injection`)
1. **Delimitación Estricta de Contexto y Separación de Planos (Control vs. Datos):**
   * Encapsular de forma inmutable todas las entradas del usuario dentro de etiquetas estructuradas explícitas (ej. `<user_input>...</user_input>`).
   * Instruir al modelo en el System Prompt para procesar dicho bloque únicamente como datos pasivos de análisis, jamás como instrucciones ejecutables.
   * Evaluar arquitecturas de **Doble-LLM (*Dual-LLM Architecture*)**, donde un modelo clasificador preliminar audita y neutraliza intentos de inyección antes de que el mensaje alcance al agente principal.
2. **Guardrails Deterministas en Backend (Improper Output Handling - LLM05):**
   * No delegar la seguridad en la "auto-regulación" del propio LLM. Desplegar guardrails deterministas en el backend (usando herramientas como **NeMo Guardrails** y validación de esquemas con **Pydantic / JSON Schema**).
   * Inspección regex y filtrado léxico de entradas y respuestas antes de su entrega al usuario final o a otros sistemas conectados.
3. **Mínimo Privilegio y Contención del Exceso de Agencia (*Excessive Agency* - LLM06):**
   * Restringir todas las APIs y herramientas conectadas a permisos de **solo lectura** por defecto.
   * Prohibir credenciales de superusuario compartidas; ejecutar llamadas a APIs utilizando exclusivamente el token de sesión y permisos del usuario final autenticado.
4. **Verificación Humana Obligatoria (*Human-in-the-Loop*):**
   * Exigir confirmación física consciente en interfaz gráfica (mediante 2FA, token OTP o confirmación manual en pantalla) antes de que el modelo pueda desencadenar cualquier acción destructiva, irreversible o de alto impacto (borrado de registros, pagos o envíos masivos).
5. **Asumir el System Prompt como Información Pública (LLM07):**
   * Prohibir terminantemente el almacenamiento de secretos, contraseñas, llaves de API o directivas confidenciales dentro del System Prompt. Toda la lógica de autorización debe residir en el backend.
