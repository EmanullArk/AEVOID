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
