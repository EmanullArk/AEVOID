# Anexo C: Registro y Catálogo de Evidencias [CAPTURAS] — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Este anexo consolida el inventario ordenado de evidencias gráficas (capturas de pantalla) y huellas criptográficas generadas durante la ejecución de los laboratorios del framework, garantizando la trazabilidad probatoria y la cadena de custodia:

---

## 1. Inventario de Evidencias Gráficas por Laboratorio

### FC-LAB-001: Comandos Shell y Kali Linux (`lab-01-shell`)
* **Evidencia C-01.1:** Verificación de conectividad inicial y comandos básicos de navegación (`pwd`, `ls -la`, `cd`).
* **Evidencia C-01.2:** Creación de directorios de auditoría y configuración de permisos con `chmod 700 / 600`.
* **Evidencia C-01.3:** Filtrado de flujos y cadenas con tuberías (`cat`, `head`, `tail`, `grep`).
* **Evidencia C-01.4:** Búsquedas recursivas y automatización básica con scripts shell en Kali Linux.

### FC-LAB-002: DNS Footprinting y Reconocimiento (`lab-02-dns`)
* **Evidencia C-02.1:** Conectividad hacia Internet verificada mediante ráfaga ICMP (`ping 8.8.8.8`).
* **Evidencia C-02.2:** Consulta directa con `nslookup scanme.nmap.org` mostrando IPv4 (`45.33.32.156`) e IPv6.
* **Evidencia C-02.3:** Identificación de servidores NS delegados en Linode (`nslookup -type=ns`).
* **Evidencia C-02.4:** Resolución inversa PTR confirmando asociación de la IP con `scanme.nmap.org`.
* **Evidencia C-02.5:** Consulta estructurada con `dig` exhibiendo valores TTL y servidores de respuesta.
* **Evidencia C-02.6:** Diagnóstico y superación de timeout forzando consulta al resolver de Google (`dig @8.8.8.8`).
* **Evidencia C-02.7:** Doble comprobación de seguridad con `dig +dnssec` confirmando ausencia de firma digital.
* **Evidencia C-02.8:** Consulta WHOIS en Dynadot documentando registrador, fechas y estado `DNSSEC: unsigned`.

### FC-LAB-003: Clonación Web e Inspección de Secretos (`lab-03-httrack`)
* **Evidencia C-03.1:** Sitio web en producción desplegado y funcional en `https://lab3-httrack-7958.netlify.app/`.
* **Evidencia C-03.2:** Instalación y comprobación de versión de `HTTrack 3.49-14` en terminal.
* **Evidencia C-03.3:** Descarga automatizada y visualización del árbol de ficheros descargados con `tree`.
* **Evidencia C-03.4:** Despliegue de servidor espejo local con `python3 -m http.server 8080`.
* **Evidencia C-03.5:** Comparativa en pestañas lado a lado (Sitio original vs. Réplica local en puerto 8080).
* **Evidencia C-03.6:** Búsqueda unificada de secretos y credenciales con `grep` y análisis de variables en `localStorage` (`STORE_KEY`).
* **Evidencia C-03.7:** Réplica cruzada del sitio desplegado por el compañero Sebastián Jurado (`https://lab3sebastianjurado.netlify.app/`).

### FC-LAB-004: Forense Digital y Esteganografía (`lab-04-esteganografia`)
* **Evidencia C-04.1:** Aislamiento del entorno forense en `/reto_esteganografia_roa` y estructura de carpetas (`evidencias/`, `reportes/`, `extraidos/`).
* **Evidencia C-04.2:** Registro criptográfico de huellas SHA-256 en `hashes.txt` y verificación con `file`.
* **Evidencia C-04.3:** Extracción masiva de metadatos EXIF con `exiftool` en `evidencia_A.jpeg`, `evidencia_B.jpg` y `evidencia_C.png`.
* **Evidencia C-04.4:** Detección concluyente de concatenación de bytes en `evidencia_B.jpg` mediante el comando `strings` (mensaje de texto plano al final del archivo).
* **Evidencia C-04.5:** Inspección estructural con `binwalk` verificando firmas binarias de compresión.
* **Evidencia C-04.6:** Intento y descarte técnico en `evidencia_C.png` (formato PNG no soportado por Steghide).
* **Evidencia C-04.7:** Ejecución de `steghide info` sobre `evidencia_A.jpeg` autenticando con passphrase y descubriendo la carga embebida `confidencial.txt` (409 bytes).
* **Evidencia C-04.8:** Extracción exitosa con `steghide extract` y lectura del contenido secreto en `confidencial.txt`.

### FC-LAB-005: Ingeniería Social y Factor Humano (`lab-05-ingenieria-social`)
* **Evidencia C-05.1:** Modelado narrativo del escenario físico "No More Hidding" (USB malware de recuperación de archivos).
* **Evidencia C-05.2:** Recepción y análisis del escenario digital "Guía del Parcial" recibido de Julián Roa (archivo PDF institucional falso `USTA_SimulacionV2_instalacion_2026.pdf` compartido en WhatsApp).
* **Evidencia C-05.3:** Matriz formal de caracterización de vectores de persuasión (confianza, urgencia, pretexto académico).
* **Evidencia C-05.4:** Formulación de políticas de prevención y concientización institucional.

### FC-LAB-006: Reconocimiento OSINT con Maltego (`lab-06-maltego`)
* **Evidencia C-06.1:** Grafo general de infraestructura de `tesla.com` con entidades descubiertas.
* **Evidencia C-06.2:** Resolución de servidor de correo MX apuntando a `tesla-com.mail.protection.outlook.com` (prioridad 10).
* **Evidencia C-06.3:** Detección de servidores autoritativos NS en proveedores especializados (Akamai y UltraDNS).
* **Evidencia C-06.4:** Identificación de netblock `8.45.124.0/24` a partir de la IP `8.45.124.203`.
* **Evidencia C-06.5:** Transformación a número de sistema autónomo arrojando el **ASN 16509 (Amazon AWS)**.
* **Evidencia C-06.6:** Conversión de grafo a disposición circular concéntrica resaltando relaciones radiales.
* **Evidencia C-06.7:** Nodo de contacto institucional extraído (`domain@teslamotors.com`).
* **Evidencia C-06.8:** Grafos comparativos de reconocimiento pasivo para `microsoft.com` y `santototunja.edu.co` (TIC Santo Tomás).

### FC-LAB-007: Interceptación y Análisis Web con Burp Suite (`lab-07-burp`)
* **Evidencia C-07.1:** Configuración de Burp Suite Proxy e Intercept en navegador Chromium.
* **Evidencia C-07.2:** Formulario de login de OWASP Juice Shop con Intercept activo deteniendo la solicitud POST con payload JSON plano.
* **Evidencia C-07.3:** Envío de solicitud a Repeater y modificación arbitraria de la contraseña.
* **Evidencia C-07.4:** Recepción de código HTTP `401 Unauthorized` con mensaje genérico de rechazo.
* **Evidencia C-07.5:** Interceptación del portal UVirtual (Q10) con formato `application/x-www-form-urlencoded`.
* **Evidencia C-07.6:** Interceptación del portal PortSwigger Web Security Academy documentando defensas avanzadas (tokens CSRF, estado OAuth, reCAPTCHA).
* **Evidencia C-07.7:** Interceptación de la plataforma SAC de la Universidad Santo Tomás evidenciando endpoint dinámico `/sgacampus/services/basf00/login/fetch/{token}` y credenciales codificadas en Base64.
* **Evidencia C-07.8:** Comparativa de respuestas unificadas de error como mecanismo de defensa contra ataques de enumeración de usuarios.

### FC-LAB-008: Seguridad de IA y Prompt Injection (`lab-08-prompt-injection`)
* **Evidencia C-08.1:** Modelado de vectores de escape semántico inyectando tags falsos (`</input>`, `<admin>`) para romper la jerarquía de instrucciones del System Prompt.
* **Evidencia C-08.2:** Simulación de escenarios de abuso de herramientas (*Tool Abuse* - LLM06) forzando llamadas no autorizadas a funciones de base de datos y APIs.
* **Evidencia C-08.3:** Evaluación de técnicas de evasión de filtros del frontend mediante ofuscación en Base64, sinónimos rebuscados y traducción multilingüe (LLM05).
* **Evidencia C-08.4:** Pruebas de extracción de contexto y reglas internas (*System Prompt Leakage* - LLM07) bajo pretextos de auditoría de seguridad.
* **Evidencia C-08.5:** Diseño de arquitectura de contención defensiva: encapsulamiento de inputs, Guardrails deterministas en backend (NeMo/Pydantic) y compuerta *Human-in-the-Loop*.

### FC-LAB-009: Explotación y Auditoría Web en DVWA (`lab-09-dvwa`)
* **Evidencia C-09.1:** Despliegue del contenedor Docker con DVWA corriendo en el puerto local 8080 y configuración inicial en nivel *Security: Low*.
* **Evidencia C-09.2:** Módulo Brute Force autenticando con `admin / password` sin restricciones de tasa ni bloqueo de cuenta.
* **Evidencia C-09.3:** SQL Injection con entrada legítima `1`, alteración lógica mediante `1' OR '1'='1` volcando todos los usuarios y fuga de error de sintaxis con `1'`.
* **Evidencia C-09.4:** Command Injection ejecutando ping `127.0.0.1`, encadenamiento con `; whoami` revelando el usuario `www-data` y reconocimiento de directorios con `; pwd` y `; ls`.
* **Evidencia C-09.5:** Exfiltración no autorizada de cuentas locales del sistema mediante inyección de `; cat /etc/passwd` y extracción de datos del kernel con `; uname -a`.
* **Evidencia C-09.6:** XSS Reflejado disparando popups con `<script>alert('XSS')</script>`, defacement dinámico del fondo a rojo y exposición de `document.cookie`.
* **Evidencia C-09.7:** XSS Almacenado / Persistente en el libro de visitas (*Guestbook*) guardando código malicioso en la base de datos y robando cookies automáticamente a cada visitante.
