# Ficha Técnica Estandarizada — FC-LAB-002 (lab-02-dns)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-002** |
| **Nombre de la Práctica** | DNS Footprinting y Reconocimiento de Red (`nslookup` y `dig`) |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D02 — Reconocimiento y OSINT** |
| **Fase de ÆVØID** | **Fase 03 — Identificación** |
| **Enfoque** | Ofensivo Controlado (Footprinting Pasivo / Semi-activo) |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Aprender a mapear la infraestructura DNS de un dominio autorizado (`scanme.nmap.org`) sin necesidad de lanzar escaneos ruidosos. Averiguamos sus direcciones IPv4 e IPv6, qué servidores autoritativos (NS) controlan la zona, comprobamos la resolución inversa (PTR), medimos los tiempos de caché (TTL), investigamos si tienen activadas firmas criptográficas (**DNSSEC**) y revisamos los datos públicos del registrador con `whois`.

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo:** Envío de consultas DNS recursivas, directas, inversas y depuración con `dig`.
* **Analista Defensivo:** Verificar si el dominio expone información innecesaria en registros TXT o si permite transferencias de zona (*AXFR*).
* **Evaluador Purple Team:** Diagnosticar fallas de red durante la práctica (como el timeout del resolver local) y documentar cómo se resolvieron.

### 3. Entorno y Objetivo de Prueba
* **Objetivo:** `scanme.nmap.org` (Servidor de prueba autorizado por el proyecto Nmap para fines educativos).
* **Máquina:** Kali Linux con salida a Internet verificada.

### 4. Procedimiento Técnico Paso a Paso y Solución de Incidencias
1. **Comprobación de Salida a Internet:**
   ```bash
   ping -c 3 8.8.8.8
   ```
2. **Resolución Directa con `nslookup`:**
   ```bash
   nslookup scanme.nmap.org
   ```
   * *Qué descubrimos:* La dirección IPv4 es `45.33.32.156`, además de una dirección IPv6 asociada.
3. **Identificación de Servidores de Nombres (NS):**
   ```bash
   nslookup -type=ns scanme.nmap.org
   ```
   * *Qué descubrimos:* La infraestructura está delegada en los servidores DNS de **Linode** (`ns1.linode.com`, etc.).
4. **Resolución Inversa (Reverse DNS / PTR):**
   ```bash
   nslookup 45.33.32.156
   ```
   * *Qué descubrimos:* El registro PTR apunta limpiamente al nombre original `scanme.nmap.org`, confirmando la autenticidad del host.
5. **Consulta Avanzada con `dig` y Superación del Timeout:**
   Al intentar consultar con `dig scanme.nmap.org +trace`, nuestro resolver local en la máquina virtual falló por timeout de conexión. Como ingenieros en formación, no nos quedamos varados: forzamos la consulta directamente a los DNS públicos de Google (`@8.8.8.8`):
   ```bash
   dig @8.8.8.8 scanme.nmap.org +trace
   ```
   * *Resultado:* Obtuvimos la cadena completa de delegación desde los servidores raíz (*root servers*) hasta Linode, con sus respectivos TTLs.
6. **Verificación de Seguridad DNSSEC:**
   ```bash
   dig @8.8.8.8 scanme.nmap.org +dnssec
   dig @8.8.8.8 scanme.nmap.org DNSKEY
   ```
   * *Hallazgo Clave:* No recibimos ningún registro `RRSIG` ni claves `DNSKEY`. El dominio **no tiene activado DNSSEC**.
7. **Consulta Registral (WHOIS):**
   ```bash
   whois scanme.nmap.org
   ```
   * *Datos encontrados:* Registrado a través de **Dynadot**, fechas de creación/expiración y confirmación en el registrador de que el estado es `DNSSEC: unsigned`.

### 5. Evidencias Obtenidas
* Respuestas de terminal de `nslookup` (directa, inversa y NS).
* Trazas completas de `dig` forzando el servidor `8.8.8.8`.
* Salida de WHOIS confirmando la ausencia de firmas criptográficas.

### 6. Criterio de Aceptación
Obtener el mapa completo de direccionamiento del dominio, su proveedor de nube (Linode) y el estado de DNSSEC sin haber enviado ningún paquete agresivo ni invasivo.

### 7. Análisis Defensivo (Blue Team)
* **¿Cuál es el riesgo?** Al no tener DNSSEC activado, los usuarios que consultan `scanme.nmap.org` en redes Wi-Fi públicas o intermedias pueden ser víctimas de **envenenamiento de caché DNS (*DNS Cache Poisoning / Spoofing*)**, redirigiéndolos a páginas clonadas o maliciosas sin que el navegador se dé cuenta.
* **Solución Blue Team:**
  1. Habilitar DNSSEC en el panel de Linode generando el par de llaves KSK (Key Signing Key) y ZSK (Zone Signing Key).
  2. Publicar el registro DS (Delegation Signer) en el registrador (Dynadot).
  3. Bloquear intentos de transferencia de zona (`AXFR`) hacia IPs no autorizadas.
