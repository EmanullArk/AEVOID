# Ficha Técnica Estandarizada — FC-LAB-011 (lab-11-owasp-zap)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-011** |
| **Nombre de la Práctica** | Análisis Dinámico de Seguridad (DAST), Interceptación Proxy y Escaneo Automatizado con OWASP ZAP |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D03 — Seguridad web & D04 — APIs y Servicios Web** (con interacción en D01 Sistemas) |
| **Fase de ÆVØID** | **Fase 03 — Identificación, Fase 04 — Análisis & Fase 05 — Mitigación** |
| **Enfoque** | DAST Automatizado / Interceptación Proxy / Purple Team |
| **Estándar de Referencia** | **OWASP Top 10 (A05: Security Misconfiguration, A01: Broken Access Control, A07: Identification and Authentication Failures)** |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Aprender a utilizar **OWASP ZAP (Zed Attack Proxy)** en Kali Linux como una herramienta integral de **Análisis Dinámico de Seguridad de Aplicaciones (DAST)** y como proxy de interceptación del tráfico HTTP/HTTPS.

El objetivo central fue combinar el análisis automatizado con la inspección manual del tráfico web para descubrir fallas de configuración, ausencia de cabeceras de seguridad, cookies mal configuradas y vectores de ataque en formularios de autenticación. Para ello, primero desplegamos ZAP y configuramos el navegador Mozilla Firefox como cliente proxy sobre la plataforma controlada **DVWA** en Docker. Posteriormente, ejecutamos escaneos automatizados, inspeccionamos el árbol de alertas y generamos reportes formales de auditoría; finalmente, extendimos el análisis a portales de autenticación externos (como la interfaz de login de Spotify) para comparar las políticas de seguridad implementadas en producción frente a entornos didácticos.

---

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo (Red Team):** Instalación y configuración de OWASP ZAP en Kali, parametrización del proxy manual en Firefox (`127.0.0.1:8090`), ejecución del rastreador web (*Spider*) y lanzamiento del escaneo activo (*Active Scan*) contra las aplicaciones objetivo.
* **Analista Defensivo (Blue Team):** Revisión de las alertas arrojadas por ZAP, identificación de cabeceras de respuesta faltantes (CSP, X-Frame-Options, HSTS), verificación de atributos de cookies de sesión (`HttpOnly`, `SameSite`, `Secure`) y diseño de las directivas de servidor web para corregir cada fallo.
* **Evaluador Purple Team:** Contrastar los hallazgos automatizados frente a las categorías del **OWASP Top 10**, validar la tasa de falsos positivos, generar el reporte consolidado de vulnerabilidades y establecer el plan de remediación priorizado en la matriz de riesgos de ÆVØID.

---

### 3. Entorno de Trabajo y Despliegue
* **Sistema Operativo Anfitrión:** Kali Linux (Rolling Release).
* **Herramienta DAST:** OWASP ZAP (Zed Attack Proxy) ejecutándose en modo GUI.
* **Navegador Web:** Mozilla Firefox con configuración de proxy manual en `127.0.0.1:8090`.
* **Objetivo de Prueba Local:** Contenedor Docker ejecutando DVWA en `http://127.0.0.1:8080`.
* **Objetivos Complementarios de Análisis Pasivo:** Portales web de inicio de sesión y formulario de autenticación de Spotify (`https://accounts.spotify.com`).

---

### 4. Procedimiento Técnico Paso a Paso y Resultados Obtenidos

#### Paso 1: Puesta a Punto del Entorno y Proxy de Interceptación
1. Verificamos la presencia y versión de **OWASP ZAP** en Kali Linux.
2. Levantamos el contenedor de **DVWA** sobre Docker garantizando conectividad local en el puerto `8080`.
3. Configuramos los parámetros de red en Firefox:
   * **Proxy HTTP:** `127.0.0.1`
   * **Puerto:** `8090`
   * Marcamos la opción de aplicar el mismo proxy para HTTPS y añadimos excepciones para localhost según necesidad de captura.
4. En ZAP verificamos en *Tools > Options > Local Proxies* que el puerto de escucha coincidiera en el `8090`, estableciendo la comunicación bidireccional entre el navegador y la herramienta.

#### Paso 2: Escaneo Automatizado (Automated Scan) y Rastreo Spider sobre DVWA
1. En la pestaña *Quick Start* de OWASP ZAP seleccionamos **Automated Scan**.
2. Ingresamos la URL de prueba local:
   ```text
   http://127.0.0.1:8080
   ```
3. Lanzamos el análisis. En pantalla observamos la ejecución secuencial en dos motores:
   * **ZAP Spider:** Rastreo web tradicional que recorre enlaces HTML, formularios y comentarios para construir el mapa completo del sitio (*Site Tree*).
   * **Active Scanner:** Motor ofensivo que inyecta cargas de prueba (SQLi, XSS, Path Traversal) en los parámetros descubiertos para forzar respuestas anómalas en el servidor.
4. El panel de *Historial (History)* registró cada una de las peticiones GET y POST tramitadas con sus respectivos tiempos de respuesta, códigos HTTP (200, 302, 404) y tamaños de payload.

#### Paso 3: Análisis del Panel de Alertas en DVWA
Al finalizar el escaneo sobre el entorno local, revisamos la pestaña de **Alertas (Alerts)**, donde ZAP clasifica los hallazgos mediante un semáforo de riesgo (Rojo = Alto, Naranja = Medio, Amarillo = Bajo, Azul = Informativo):
1. **Falta de Cabecera Anti-Clickjacking (`X-Frame-Options` ausente):**  
   La aplicación no especifica `DENY` o `SAMEORIGIN`, lo que permite que sea cargada dentro de un `<iframe>` invisible en un sitio de terceros para engañar a los usuarios y forzar clics maliciosos.
2. **Ausencia de Política de Seguridad de Contenido (`Content-Security-Policy` / CSP no configurado):**  
   Al carecer de CSP, el navegador ejecutará cualquier script en línea o recurso cargado desde dominios externos, maximizando el peligro de ataques XSS.
3. **Cookies de Sesión Inseguras (`PHPSESSID` sin `HttpOnly` ni `SameSite`):**  
   La cookie de sesión carece del atributo `HttpOnly`, permitiendo su lectura desde JavaScript con `document.cookie` (lo que comprobamos empíricamente en el FC-LAB-009 y FC-LAB-010).
4. **Falta de Protección de Tipos MIME (`X-Content-Type-Options: nosniff` ausente):**  
   Los navegadores antiguos o vulnerables podrían intentar adivinar (*sniff*) el tipo de contenido y ejecutar scripts embebidos en supuestas imágenes.
5. **Divulgación de Versión del Servidor Web:**  
   La cabecera de respuesta `Server: Apache/2.4.x (Unix) OpenSSL/... PHP/...` expone versiones exactas de software, facilitando al atacante buscar exploits públicos conocidos (*CVEs*).

#### Paso 4: Generación del Reporte Oficial de Auditoría DAST
1. Desde el menú principal de ZAP navegamos a *Report > Generate Report...*.
2. Configuramos los metadatos de la auditoría: nombre del informe, autores del equipo y nivel de detalle.
3. Generamos el reporte en formato **HTML estructurado**.
4. Este reporte constituye la evidencia documental objetiva e inmutable solicitada en auditorías de ciberseguridad, resumiendo gráficamente el total de alertas por severidad, las URLs afectadas y las soluciones recomendadas por OWASP.

#### Paso 5: Cambio de Configuración y Escaneo sobre URLs de Autenticación
1. Modificamos la configuración de Firefox a **“No proxy”** para restablecer la navegación directa a Internet.
2. En ZAP seleccionamos un nuevo objetivo de análisis ingresando la URL de una interfaz de autenticación (formulario de inicio de sesión).
3. Configuramos la URL en el Automated Scan y lanzamos el escaneo:
   * En la interfaz se apreció el progreso en tiempo real del rastreador y las peticiones enviadas hacia el endpoint.
   * Revisamos el panel de historial y las alertas generadas para este sitio, observando respuestas con diversos códigos HTTP y alertas de severidad media y baja relacionadas con políticas de almacenamiento y expiración de sesión.
4. Evaluamos el resumen final con las alertas clasificadas por nivel de riesgo y el árbol de URLs mapeadas.

#### Paso 6: Análisis de Seguridad en el Formulario de Login de Spotify
1. Como caso de estudio de infraestructura en producción a gran escala, ingresamos la URL del portal de acceso de Spotify (`https://accounts.spotify.com/es/login`) en el escaneador de ZAP.
2. ZAP inició el rastreo pasivo y exploración de endpoints públicos:
   * En el historial se registraron las peticiones de carga de recursos estáticos, APIs de autenticación y scripts de soporte.
3. **Hallazgos y Comparativa de Seguridad:**
   * A diferencia del entorno de prueba local (DVWA), el portal de Spotify demostró una postura de seguridad robusta: empleo mandatorio de HTTPS cifrado con HSTS, presencia de tokens anti-CSRF en las llamadas de autenticación y directivas restrictivas de scripts.
   * Las alertas reportadas por ZAP en este portal se ubicaron en niveles informativos y bajos, principalmente relacionadas con variaciones en cabeceras de caché (`Cache-Control`), políticas de permisos de terceros (`Permissions-Policy`) y atributos específicos de cookies transitorias.

---

### 5. Tabla Comparativa de Hallazgos Detectados por ZAP

| Hallazgo / Alerta Detectada | Severidad en ZAP | Entorno Afectado | Impacto Técnico | Categoría OWASP |
| :--- | :---: | :---: | :--- | :---: |
| **Ausencia de CSP (Content Security Policy)** | Media | DVWA | Permite ejecución de scripts no autorizados (XSS) y carga de recursos externos maliciosos. | **A05:2021** |
| **Cabecera `X-Frame-Options` Ausente** | Media | DVWA | Riesgo de secuestro de clics (*Clickjacking*) mediante marcos `<iframe>` ocultos. | **A05:2021** |
| **Cookies sin Flags `HttpOnly` / `SameSite`** | Media | DVWA | Exposición de identificadores de sesión a robo vía XSS y vulnerabilidad a ataques CSRF. | **A07:2021 / A01:2021** |
| **Ausencia de `X-Content-Type-Options: nosniff`** | Baja | DVWA | Riesgo de confusión de tipos MIME (*MIME-type sniffing*) en navegadores antiguos. | **A05:2021** |
| **Divulgación de Software en Cabecera `Server`** | Baja | DVWA | Facilita la labor de reconocimiento a atacantes al exponer versiones de Apache y PHP. | **A05:2021** |
| **Políticas de Caché y Atributos de Terceros** | Informativa / Baja | Login Spotify | Advertencias sobre expiración de almacenamiento local y directivas experimentales. | **A05:2021** |

---

### 6. Análisis Defensivo y Plan de Mitigación (Blue Team)

El valor del escaneo automatizado con ZAP radica en que permite a los defensores auditar el sistema desde la perspectiva externa de un atacante. Para corregir las alertas identificadas, planteamos las siguientes medidas de hardening:

1. **Configuración de Cabeceras de Seguridad en el Servidor Web (Nginx / Apache):**
   * Desplegar en la configuración global del servidor web o del reverse proxy las siguientes directivas HTTP obligatorias:
     ```nginx
     # Configuración recomendada para Nginx
     add_header X-Frame-Options "SAMEORIGIN" always;
     add_header X-Content-Type-Options "nosniff" always;
     add_header Referrer-Policy "strict-origin-when-cross-origin" always;
     add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;" always;
     add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
     ```
2. **Hardening de Cookies de Sesión:**
   * Garantizar que toda cookie que almacene credenciales o tokens de sesión cuente con los tres atributos fundamentales:
     ```http
     Set-Cookie: session_id=abc123xyz; Path=/; Secure; HttpOnly; SameSite=Strict
     ```
3. **Ocultamiento de Banners e Información del Servidor:**
   * En Apache, editar `apache2.conf`:
     ```apache
     ServerTokens Prod
     ServerSignature Off
     ```
   * En PHP, desactivar la exposición en `php.ini`:
     ```ini
     expose_php = Off
     ```
4. **Integración de ZAP en el Ciclo CI/CD (DevSecOps):**
   * No esperar a que el sistema esté en producción para auditarlo. Incorporar el contenedor `owasp/zap2docker-weekly` en las canalizaciones de GitHub Actions o GitLab CI para ejecutar escaneos pasivos y DAST de línea base con cada *Pull Request*, bloqueando despliegues que introduzcan cabeceras faltantes o cookies inseguras.

---

### 7. Criterio de Aceptación y Validación Metodológica en ÆVØID
* **Condición de Éxito:** Se completó el acondicionamiento del proxy de interceptación en Firefox y ZAP (`127.0.0.1:8090`), se ejecutó el Spider y Active Scan contra DVWA identificando al menos 5 categorías de alertas de seguridad, se exportó el reporte auditable en HTML y se realizó el contraste con formularios de autenticación externos.
* **Conformidad Metodológica:** Los hallazgos se integran formalmente a la **Fase 03 (Identificación)** y nutren la **Fase 04 (Análisis)** y **Fase 05 (Mitigación)** del ciclo de vida de **ÆVØID**.
