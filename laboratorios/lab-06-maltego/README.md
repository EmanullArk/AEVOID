# Ficha Técnica Estandarizada — FC-LAB-006 (lab-06-maltego)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-006** |
| **Nombre de la Práctica** | Reconocimiento Digital Pasivo y Mapeo de Infraestructura con `Maltego` |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D02 — Reconocimiento y OSINT** |
| **Fase de ÆVØID** | **Fase 03 — Identificación** |
| **Enfoque** | OSINT Pasivo / Mapeo de Superficie y Cadena de Suministro |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Aprender a hacer **reconocimiento 100% pasivo** con la herramienta `Maltego` en Kali Linux. El reto consistió en mapear toda la infraestructura digital de objetivos de gran envergadura (`tesla.com`, `microsoft.com`) y de nuestra propia universidad (`santototunja.edu.co`) sin enviar un solo paquete directo a sus servidores. 

A partir de consultas a registros públicos y bases de datos BGP, descubrimos servidores de correo (MX), servidores DNS (NS), políticas SPF, bloques de red (Netblocks), números de sistema autónomo (ASN) y dependencias con proveedores en la nube.

### 2. ¿Cómo nos repartimos los roles?
* **Analista OSINT:** Ejecución de transformaciones (*transforms*) en Maltego, correlación de nodos y generación de grafos de infraestructura.
* **Analista Defensivo:** Evaluar el riesgo de depender de terceros en la nube (AWS, Microsoft, Akamai) y la exposición de correos de contacto.
* **Evaluador Purple Team:** Comparar los grafos jerárquicos contra la vista circular para validar qué tan clara es la visualización.

### 3. Entorno y Objetivos Analizados
* **Herramienta:** Maltego Community Edition sobre Kali Linux.
* **Objetivos:** `tesla.com`, `microsoft.com` y `santototunja.edu.co`.
* **Alcance:** Exclusivamente fuentes abiertas (OSINT). Cero interacción invasiva.

### 4. Procedimiento Técnico y Transformaciones Ejecutadas en Maltego
1. **Mapeo de Servidores de Correo (MX):**
   * *Transform:* `To DNS Name - MX`.
   * *Qué encontramos:* En `tesla.com` el correo no está alojado en servidores propios, sino en el servicio de protección en la nube de Microsoft (`tesla-com.mail.protection.outlook.com` con prioridad 10). Lo mismo ocurrió con `microsoft.com` y con `santototunja.edu.co` (la universidad usa Microsoft 365 Exchange Online).
2. **Identificación de Servidores Autoritativos (NS):**
   * *Transform:* `To DNS Name - NS`.
   * *Qué encontramos:* Tesla confía su resolución DNS a dos gigantes especializados en mitigación de ataques DDoS y alta disponibilidad: **UltraDNS** y **Akamai**.
3. **Auditoría de Políticas de Correo SPF:**
   * *Transform:* `To DNS Name - SPF`.
   * *Qué encontramos:* Reglas públicas que declaran qué rangos de IP tienen permiso legítimo para enviar correos a nombre de la organización, evitando suplantaciones fáciles.
4. **De Direcciones IP a Bloques de Red (Netblocks):**
   * *Transform:* `To IP Address` $\rightarrow$ `To Netblock`.
   * *Caso real analizado:* Tomamos la IP `8.45.124.203` y Maltego nos mostró que pertenece al bloque `8.45.124.0` al `8.45.124.255` (un segmento completo de 256 direcciones administradas por el mismo operador).
5. **Descubrimiento de Sistemas Autónomos (ASN) y Proveedores Cloud:**
   * *Transform:* `To AS Number`.
   * *Caso real analizado:* Al consultar a quién pertenecía el rango `54.240.84.248 - 54.240.84.251`, apareció el **ASN 16509**, que corresponde a **Amazon (AWS)**. Así demostramos que Tesla usa servidores en la nube de Amazon para ciertas operaciones, a pesar de usar Microsoft para su correo.
6. **Optimización con Vista Circular:**
   * Cambiamos la distribución del grafo a una disposición circular concéntrica: el dominio queda en el centro y todas las dependencias (DNS, IPs, correo, nube) conectadas alrededor. Para un analista, esto permite explicarle a la gerencia en 30 segundos de quién depende la empresa.

---

### 5. Cuestionario de Análisis Resuelto por el Equipo
* **¿Por qué un dominio tiene múltiples IPs y CDNs?** Para no caerse nunca (alta disponibilidad), balancear la carga de millones de visitas y acelerar la carga del sitio entregando el contenido desde servidores cercanos al usuario geográficamente.
* **¿Qué riesgos tiene esta infraestructura distribuida?** Aunque da velocidad y soporte, **centraliza el riesgo de terceros (cadena de suministro)**: si los servidores de Microsoft 365 sufren una caída global, la universidad se queda sin correo; si Akamai o AWS tienen problemas, la página de Tesla deja de responder a nivel mundial.
* **¿Por qué empezamos siempre con reconocimiento pasivo?** Porque no deja rastro en los firewalls de la víctima, es 100% legal y permite planificar cualquier evaluación conociendo a fondo el terreno antes de mandar un solo paquete.

---

### 6. Análisis Defensivo (Blue Team)
* **¿Cómo se mitiga esta exposición?** Aunque muchos registros DNS deben ser públicos para que Internet funcione, una organización no debería exponer más de la cuenta:
  1. Configurar directivas estrictas de DMARC (`p=reject`) para complementar el registro SPF y evitar que los dominios sean usados para phishing.
  2. No publicar subdominios con nombres reveladores (como `vpn-vieja.dominio.com` o `test-backend.dominio.com`).
  3. Establecer acuerdos de nivel de servicio (SLAs) de seguridad con los proveedores en la nube (AWS, Azure, Cloudflare).
