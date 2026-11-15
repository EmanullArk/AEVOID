# Anexo B: Matriz de Hallazgos y Riesgos — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Esta matriz categoriza las debilidades y hallazgos descubiertos durante las evaluaciones, correlacionando la probabilidad de ocurrencia y el impacto estimado en la organización:

| ID Hallazgo | Activo Afectado | Descripción de la Vulnerabilidad | Probabilidad | Impacto | Severidad Global | Tratamiento Propuesto |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| **H-01** | Zona DNS pública (`scanme.nmap.org`) | Ausencia de firmas criptográficas DNSSEC en la zona autoritativa. | Media | Alto | **Media** | Implementar firma DNSSEC mediante KSK/ZSK y delegar registro DS. |
| **H-02** | Aplicación Web Netlify | Almacenamiento persistente de identificadores en `localStorage` (`STORE_KEY`). | Alta | Medio | **Baja** | Migrar persistencia de estados sensibles a cookies `HttpOnly` y `Secure`. |
| **H-03** | Repositorio multimedia / Exfiltración | Fuga de datos clasificados mediante canal encubierto esteganográfico en JPG. | Baja | Crítico | **Alta** | Desplegar soluciones DLP en pasarelas de red y re-compresión de imágenes. |
| **H-04** | Canal de mensajería (WhatsApp) | Vulnerabilidad humana al engaño por pretexto académico y falsificación de identidad. | Alta | Alto | **Alta** | Capacitación periódica y políticas institucionales de canales oficiales. |
| **H-05** | Perímetro corporativo (`tesla.com`) | Exposición pública pasiva de topología cloud, rangos IP y proveedores en registros DNS/BGP. | Alta | Medio | **Media** | Ocultamiento de servidores no esenciales y auditoría a proveedores externos. |
| **H-06** | Formularios Web de Autenticación | Riesgo de ataque de fuerza bruta distribuida en portales con payload ofuscado en Base64. | Media | Alto | **Media** | Implementación de rate-limiting estricto y Autenticación Multifactor (MFA). |
| **H-07** | Aplicación con IA / LLM | Vulnerabilidad a Prompt Injection y fuga del System Prompt (LLM07) por falta de separación entre control e input. | Alta | Alto | **Alta** | Encapsular entradas en etiquetas inmutables, asumir prompt como público y desplegar Guardrails en backend. |
| **H-08** | APIs y Agentes con IA | Exceso de agencia y Tool Abuse (LLM06) con riesgo de ejecución de mutaciones o exfiltración vía APIs conectadas. | Media | Crítico | **Alta** | Limitar APIs a solo lectura, usar tokens de usuario final y exigir confirmación humana (Human-in-the-Loop). |
| **H-09** | Servidor Web / API de Ping | Ejecución Remota de Comandos (RCE) por concatenación directa de parámetros en shell del SO Linux. | Alta | Crítico | **Crítica** | Erradicar funciones `exec`/`system`, validar con `filter_var` y restringir privilegios de `www-data`. |
| **H-10** | Módulos Web de Entrada (DVWA) | Inyección SQL y XSS Almacenado persistente en base de datos con capacidad de robo de cookies de sesión. | Alta | Crítico | **Crítica** | Usar Sentencias Preparadas (PDO), codificación de salidas con `htmlspecialchars` y cookies `HttpOnly`. |
| **H-11** | Servidor Web / File Upload (DVWA) | Subida irrestricta de archivos ejecutables (`shell.php`) permitiendo RCE como `www-data` y exfiltración de `/etc/passwd`. | Alta | Crítico | **Crítica** | Implementar whitelist de extensiones, verificación de tipo MIME real, renombrado aleatorio y deshabilitar ejecución de scripts en uploads. |
| **H-12** | Módulo de Cambio de Clave (DVWA) | Cross-Site Request Forgery (CSRF) por tramitación de peticiones en GET y carencia de tokens anti-CSRF aleatorios. | Alta | Alto | **Alta** | Implementar tokens CSRF por sesión (Synchronizer Token Pattern), tramitar únicamente por POST y configurar cookies con `SameSite=Strict`. |
| **H-13** | Parámetros de Inclusión URL (DVWA) | Inclusión Local de Archivos (LFI) por falta de validación de rutas relativas y absolutas, con riesgo de ejecución encadenada de webshells. | Alta | Crítico | **Crítica** | Validar rutas contra lista blanca rígida de archivos permitidos, prohibir parámetros directos de inclusión y usar `basename()` / `realpath()`. |
| **H-14** | Módulo de Búsqueda / Parámetro ID (DVWA) | Inyección SQL a ciegas (Blind SQLi booleana) que permite la inferencia y extracción de metadatos de BD mediante condiciones true/false. | Media | Crítico | **Alta** | Parametrizar todas las consultas con sentencias preparadas PDO y neutralizar respuestas informativas diferenciadas. |
| **H-15** | Servidores Web / Aplicaciones Auditadas | Ausencia de cabeceras de seguridad HTTP (CSP, X-Frame-Options, X-Content-Type-Options) y cookies de sesión sin flags de seguridad. | Alta | Alto | **Alta** | Desplegar cabeceras de seguridad en servidor web/proxy inverso y forzar atributos `HttpOnly`, `Secure` y `SameSite` en todas las cookies. |
| **H-16** | Servidor Web / Banners de Respuesta | Divulgación de versiones exactas de servidor y módulos en cabecera `Server` y `X-Powered-By`. | Alta | Bajo | **Baja** | Configurar `ServerTokens Prod`, `ServerSignature Off` en Apache y `expose_php = Off` en PHP para ocultar banners. |
