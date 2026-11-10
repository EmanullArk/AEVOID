# Ficha Técnica Estandarizada — FC-LAB-009 (lab-09-dvwa)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-009** |
| **Nombre de la Práctica** | Auditoría y Explotación Controlada de Vulnerabilidades Web en DVWA |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D03 — Seguridad web** (con alcance en D01 y D04) |
| **Fase de ÆVØID** | **Fase 03 — Identificación, Fase 04 — Análisis & Fase 05 — Mitigación** |
| **Enfoque** | Ofensivo / Defensivo (Red Team, Blue Team & Purple Team) |
| **Estándar de Referencia** | **OWASP Top 10 (A03: Injection, A07: Identification and Authentication Failures)** |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Desplegar localmente la plataforma **Damn Vulnerable Web Application (DVWA)** mediante contenedores Docker en Kali Linux para simular, auditar y documentar en un entorno controlado las vulnerabilidades web más críticas del **OWASP Top 10**. 

Evaluamos cuatro módulos de ataque fundamentales: **Fuerza Bruta**, **Inyección SQL (SQLi)**, **Inyección de Comandos del Sistema Operativo (Command Injection / RCE)** y **Cross-Site Scripting (XSS)** tanto en su variante reflejada (*Reflected*) como persistente (*Stored*). En cada módulo primero verificamos el comportamiento normal con entradas legítimas y luego alteramos la entrada para demostrar el impacto real que sufre un sistema cuando no valida ni sanitiza lo que el usuario envía.

---

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo (Red Team):** Despliegue del contenedor Docker, configuración del entorno en nivel *Security: Low*, inyección de cargas maliciosas (payloads) en cada formulario y extracción de información sensible del servidor y del navegador.
* **Analista Defensivo (Blue Team):** Analizar el código fuente vulnerable de cada módulo en PHP, identificar por qué la entrada llega sin desinfectar al motor de base de datos o al shell de Linux, y diseñar las reglas de sanitización, sentencias preparadas y cabeceras de seguridad.
* **Evaluador Purple Team:** Correlacionar cada ataque con su categoría OWASP, medir la severidad técnica y verificar que las medidas de remediación neutralicen la explotación sin romper la funcionalidad de la aplicación.

---

### 3. Entorno de Trabajo y Despliegue
* **Plataforma:** Contenedor Docker corriendo la imagen oficial de DVWA en Kali Linux.
* **Acceso Local:** Servicio web expuesto en el puerto `8080` (`http://localhost:8080`).
* **Configuración Inicial:** Base de datos inicializada (*Setup/Reset Database*), sesión autenticada con credenciales administrativas por defecto y nivel de seguridad establecido en **Low** (código vulnerable sin validación para fines didácticos).

---

### 4. Procedimiento Técnico Paso a Paso y Resultados Obtenidos

#### Módulo 1: Fuerza Bruta (Brute Force) — OWASP A07
1. Ingresamos al módulo e introdujimos credenciales conocidas de prueba (`admin` / `password`).
2. *Observación Técnica:* La aplicación validó las credenciales y concedió acceso al área protegida inmediatamente.
3. *Hallazgo de Seguridad:* El formulario carece por completo de mecanismos de **Rate Limiting**, retrasos artificiales (*sleep*), CAPTCHA o bloqueo temporal tras intentos fallidos consecutivos, lo que permite a un atacante automatizar ataques de diccionario masivos con herramientas como Burp Suite Intruder o Hydra.

#### Módulo 2: Inyección SQL (SQL Injection) — OWASP A03
1. **Comportamiento Normal:** Ingresamos el valor numérico `1` en el campo *User ID*. La aplicación ejecutó una consulta controlada y devolvió únicamente los datos del usuario correspondiente (`admin`).
2. **Alteración Lógica (Bypass de Autenticación/Filtro):**  
   Digitamos el payload:
   ```sql
   1' OR '1'='1
   ```
   * *Resultado:* La consulta interna se convirtió en `SELECT ... WHERE user_id = '1' OR '1'='1'`. Al ser la condición siempre verdadera, la aplicación **devolvió la totalidad de los usuarios registrados en la base de datos**, exponiendo nombres y hashes de contraseñas.
3. **Provocación de Error de Sintaxis:**  
   Ingresamos simplemente una comilla simple:
   ```text
   1'
   ```
   * *Resultado:* La aplicación respondió con un error explícito de sintaxis SQL de MySQL (`You have an error in your SQL syntax...`). Esto confirmó de inmediato que el parámetro entra sin escapar ni parametrizar directamente a la base de datos.

#### Módulo 3: Inyección de Comandos (Command Injection / RCE) — OWASP A03 (¡Hallazgo Crítico!)
1. **Comportamiento Normal:** Ingresamos la dirección IP de loopback `127.0.0.1`. La aplicación ejecutó el comando `ping -c 4 127.0.0.1` y devolvió las 4 respuestas ICMP esperadas.
2. **Encadenamiento de Comandos mediante `;`:**  
   Aprovechando que la aplicación concatena la entrada directamente en la función `shell_exec()` del sistema operativo Linux, inyectamos comandos sucesivos:
   * **Identificación de Privilegios:**
     ```bash
     127.0.0.1 ; whoami
     ```
     * *Resultado:* El servidor ejecutó el ping y devolvió abajo: `www-data`, revelando el usuario bajo el cual corre el servicio Apache en el servidor.
   * **Enumeración de Archivos y Rutas:**
     ```bash
     127.0.0.1 ; ls
     127.0.0.1 ; pwd
     ```
     * *Resultado:* Se listó el contenido del directorio interno y se obtuvo la ruta absoluta: `/var/www/html/vulnerabilities/exec`.
   * **Reconocimiento del Sistema Operativo:**
     ```bash
     127.0.0.1 ; uname -a
     ```
     * *Resultado:* Devolvió la versión exacta del kernel de Linux y arquitectura sobre la que corre el contenedor.
   * **Exfiltración de Archivos Críticos del Sistema:**
     ```bash
     127.0.0.1 ; cat /etc/passwd
     ```
     * *Resultado Crítico:* **Lectura completa del archivo `/etc/passwd`**, exponiendo todos los usuarios locales del sistema operativo, sus UIDs y shells asignadas.

#### Módulo 4: Cross-Site Scripting Reflejado (XSS Reflected) — OWASP A03
1. **Comportamiento Normal:** Ingresamos un nombre ordinario en el formulario. La aplicación respondió en pantalla con un saludo: `Hello Cristian`.
2. **Inyección de Código JavaScript:**  
   Digitamos el payload básico:
   ```html
   <script>alert('XSS')</script>
   ```
   * *Resultado:* El navegador interpretó la etiqueta y disparó una ventana emergente (*popup*), demostrando que la entrada se refleja sin codificar entidades HTML.
3. **Modificación del Contenido del DOM (Defacement Dinámico):**
   ```html
   <script>document.body.style.background='red'</script>
   ```
   * *Resultado:* Todo el fondo de la página cambió instantáneamente a color rojo, probando que un atacante puede alterar la apariencia visual para engañar a los usuarios.
4. **Simulación de Robo de Sesión:**
   ```html
   <script>alert(document.cookie)</script>
   ```
   * *Resultado:* Apareció un popup mostrando la cookie de sesión activa (`PHPSESSID` y `security=low`), evidenciando cómo un vector reflejado puede capturar credenciales de sesión si el usuario hace clic en un enlace malicioso.

#### Módulo 5: Cross-Site Scripting Almacenado / Persistente (XSS Stored) — OWASP A03 (¡Hallazgo Crítico!)
1. **Comportamiento Normal:** Llenamos los campos *Name* y *Message* del libro de visitas (*Guestbook*) con texto normal; los datos quedaron almacenados y se mostraron en la lista.
2. **Inyección Persistente en Base de Datos:**  
   Enviamos el nombre `hacker` con los siguientes mensajes maliciosos:
   ```html
   <script>alert('XSS Stored')</script>
   <script>alert(1)</script>
   <script>alert(document.cookie)</script>
   ```
3. *Hallazgo Crítico:* El código JavaScript no solo se ejecutó al enviarlo, sino que **quedó guardado de forma permanente en la base de datos**. Cada vez que cualquier usuario o administrador recarga o visita la página del libro de visitas, el script se ejecuta automáticamente en su propio navegador sin necesidad de hacer clic en ningún enlace externo, exponiendo sus cookies de sesión a un secuestro masivo (*Session Hijacking*).

---

### 5. Tabla Comparativa de Vulnerabilidades Evaluadas en DVWA

| Vulnerabilidad | Módulo | Entrada Inyectada | Impacto Demostrado | Categoría OWASP |
| :--- | :--- | :--- | :--- | :---: |
| **Fuerza Bruta** | Brute Force | `admin / password` | Acceso irrestricto sin límite de intentos ni CAPTCHA. | **A07:2021** |
| **SQLi Lógica** | SQL Injection | `1' OR '1'='1` | Volcado de la totalidad de usuarios de la base de datos. | **A03:2021** |
| **SQLi Sintáctica** | SQL Injection | `1'` | Fuga de error interno de base de datos MySQL. | **A03:2021** |
| **RCE / Command Inj.** | Exec / Ping | `; whoami` / `; cat /etc/passwd` | Ejecución de comandos del SO como `www-data` y exfiltración de usuarios del servidor. | **A03:2021** |
| **XSS Reflected** | XSS (Reflected) | `<script>alert(document.cookie)</script>` | Ejecución de scripts en cliente y exposición de sesión vía URL. | **A03:2021** |
| **XSS Stored** | XSS (Stored) | `<script>alert(document.cookie)</script>` | Inyección persistente en BD que afecta a todos los visitantes del sitio. | **A03:2021** |

---

### 6. Análisis Defensivo y Plan de Mitigación (Blue Team)

Como futuros ingenieros de sistemas, concluimos que la raíz de todos estos fallos es la misma: **confiar ciegamente en lo que el usuario envía y concatenar cadenas crudas en el servidor**. Para corregirlos de forma definitiva, planteamos las siguientes soluciones técnicas:

1. **Mitigación de SQL Injection (Sentencias Preparadas):**
   * *Mala práctica (vulnerable):* `$query = "SELECT * FROM users WHERE id = '$id'";`
   * *Solución profesional:* Utilizar sentencias preparadas con **PDO** o **MySQLi**, donde la base de datos compila la consulta primero y trata la entrada estrictamente como un dato tipado, nunca como código ejecutable:
     ```php
     $stmt = $pdo->prepare('SELECT first_name, last_name FROM users WHERE user_id = :id');
     $stmt->execute(['id' => $id]);
     $user = $stmt->fetch();
     ```
2. **Mitigación de Command Injection (Erradicación de Shell Execution):**
   * *Regla de diseño:* Jamás pasar entradas del usuario a funciones como `exec()`, `system()`, `passthru()` o `shell_exec()`.
   * *Validación estricta:* Si es obligatorio recibir una dirección IP, validar con funciones nativas del lenguaje como `filter_var($ip, FILTER_VALIDATE_IP)` o expresiones regulares estrictas (`^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$`).
3. **Mitigación de XSS Reflected y Stored (Codificación y Cookies Seguras):**
   * **Codificación de salida (Context-Aware Output Encoding):** Escapar caracteres especiales antes de imprimirlos en el HTML utilizando `htmlspecialchars($input, ENT_QUOTES, 'UTF-8')`.
   * **Protección de Cookies de Sesión:** Configurar la bandera `HttpOnly` en las cookies (`session.cookie_httponly = 1` en `php.ini`). Esto le prohíbe al navegador acceder a la cookie desde JavaScript (`document.cookie`), neutralizando el robo de sesión incluso si existe un fallo XSS.
   * **Cabecera Content-Security-Policy (CSP):** Desplegar directivas estrictas como `Content-Security-Policy: default-src 'self'` para impedir la ejecución de scripts en línea (*inline scripts*).
4. **Mitigación de Fuerza Bruta:**
   * Implementar limitadores de tasa (*Rate Limiting*) en el backend o en el proxy inverso (máximo 5 intentos por IP/usuario en 15 minutos).
   * Exigir segundo factor de autenticación (**MFA**) y uso de CAPTCHA tras 3 intentos fallidos.

---

### 7. Trazabilidad con el Framework ÆVØID
* **Caso de Prueba Asociado:** **P09** (Evaluación Integral de Vulnerabilidades Web en DVWA).
* **Fase:** Fase 03 (Identificación), Fase 04 (Análisis) y Fase 05 (Mitigación).
* **Severidad:** **Crítica** (Presencia de Ejecución Remota de Comandos - RCE y XSS Almacenado persistente).
* **Estado:** **Ejecutada, Analizada y Mitigada con Éxito**.
