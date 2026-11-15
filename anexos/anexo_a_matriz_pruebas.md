# Anexo A: Matriz de Casos de Prueba — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

| Código Caso | Dominio | Fase | Herramienta | Objetivo Específico | Parámetros / Comandos Clave | Criterio de Éxito |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| **CP-01** | D01 | 01 | Bash / Kali | Validar entorno y permisos | `chmod 700 auditoria/`, `grep`, pipes | Estructura segura y scripts operativos |
| **CP-02** | D02 | 03 | `nslookup` / `dig` | Mapeo de zona y DNSSEC | `nslookup -type=ns scanme.nmap.org`, `dig +trace +dnssec` | Identificación de IP, NS y estado DNSSEC |
| **CP-03** | D03 | 03 | `HTTrack` | Reconstrucción web y clonación | `httrack https://... -O . -%v` | Réplica funcional idéntica en localhost:8080 |
| **CP-04** | D03 | 04 | `grep` / GNU | Búsqueda de secretos frontend | `grep -E -i -rn "api_key\|token\|secret" .` | Descarte de claves duras y hallazgo de localStorage |
| **CP-05** | D06 | 03 | `sha256sum` | Preservación forense y custodia | `sha256sum evidencias/* > hashes.txt` | Generación de huellas criptográficas inmutables |
| **CP-06** | D06 | 03 | `strings` | Detección de concatenación | `strings evidencia_B.jpg \| tail -n 25` | Localización de mensaje en claro tras fin de JPEG |
| **CP-07** | D06 | 03 | `Steghide` | Extracción de canal encubierto | `steghide extract -sf evidencia_A.jpeg` | Extracción exitosa del fichero `confidencial.txt` |
| **CP-08** | D05 | 02 | Matriz Vectores | Modelado de ingeniería social | Análisis de pretextos en WhatsApp y USB | Identificación de 10 factores de vulnerabilidad |
| **CP-09** | D02 | 03 | `Maltego` | Mapeo OSINT pasivo | Transforms: `To MX`, `To NS`, `To Netblock`, `To ASN` | Grafo circular de infraestructura en nube (AWS/Azure) |
| **CP-10** | D03/D04 | 03 | `Burp Suite` | Interceptación de login | Proxy HTTP + Repeater (`POST` login) | Comparación de 4 esquemas y prevención enumeración |
| **CP-11** | D08 | 03 | OWASP LLM Suite | Escape semántico y fuga de System Prompt | Prompts adversariales, tags XML falsos, evasión Base64 | Evaluación de frontera de control vs datos y tasa ISR |
| **CP-12** | D08 | 05 | Guardrails / Pydantic | Contención de exceso de agencia en APIs | Schemas deterministas, scopes de solo lectura, Human-in-the-Loop | Bloqueo determinista en backend y confirmación obligatoria en UI |
| **CP-13** | D03 | 03 | DVWA (SQLi & RCE) | Explotación de inyecciones SQL y comandos del SO | Payloads `1' OR '1'='1` y `; whoami ; cat /etc/passwd` | Volcado completo de BD y lectura arbitraria de `/etc/passwd` en Linux |
| **CP-14** | D03 | 03 | DVWA (XSS Reflected/Stored) | Inyección de scripts y persistencia en base de datos | `<script>alert(document.cookie)</script>` en inputs y Guestbook | Ejecución de scripts en cliente y secuestro masivo persistente de cookies |
| **CP-15** | D03 | 03 | DVWA (CSRF) | Cambio no autorizado de clave por omisión de token | `GET /vulnerabilities/csrf/?password_new=...` por URL directa | Modificación exitosa de clave administrativa sin comprobación de origen |
| **CP-16** | D03 | 03 | DVWA (File Upload & RCE) | Carga de webshell PHP y ejecución de comandos remotos | Creación de `shell.php` con nano y subida a `/hackable/uploads/` | Control del servidor como `www-data` y exfiltración de `/etc/passwd` |
| **CP-17** | D03 | 03 | DVWA (LFI & Encadenamiento) | Inclusión local de archivos y ejecución de scripts locales | `page=/etc/passwd` y `page=../../hackable/uploads/shell.php` | Lectura de cuentas de Linux y reactivación de webshell para RCE |
| **CP-18** | D03 | 03 | DVWA (Blind SQLi Booleana) | Inferencia lógica de datos de base de datos a ciegas | `1' AND 1=2 #` vs `1' AND database()='dvwa' #` y `SUBSTRING()` | Identificación de respuesta true/false y reconstrucción del nombre de la BD |
| **CP-19** | D03/D04 | 03 | OWASP ZAP (Proxy & Spider) | Interceptación de tráfico HTTP y rastreo automático de rutas | Proxy Firefox `127.0.0.1:8090` + Spider sobre `http://127.0.0.1:8080` | Mapeo integral del árbol de sitios y captura cronológica de peticiones |
| **CP-20** | D03/D04 | 03/04 | OWASP ZAP (Active Scan & DAST) | Auditoría automatizada DAST y análisis de cabeceras/cookies | Automated Scan contra DVWA y endpoints externos (login Spotify) | Detección de fallas A05 (falta de CSP, cookies sin HttpOnly) y reporte HTML |
