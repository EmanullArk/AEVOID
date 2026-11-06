# Ficha Técnica Estandarizada — FC-LAB-003 (lab-03-httrack)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-003** |
| **Nombre de la Práctica** | Clonación Web Controlada e Inspección de Secretos en Frontend (`HTTrack`) |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D03 — Seguridad web** |
| **Fase de ÆVØID** | **Fase 03 — Identificación & Fase 04 — Análisis** |
| **Enfoque** | Ofensivo / Defensivo (Auditoría de Superficie Web Expuesta) |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Entender con nuestras propias manos que **todo lo que llega al navegador del cliente es público por definición**. Usamos la herramienta `HTTrack` para clonar sitios web estáticos desplegados en la nube (`Netlify`), levantamos una réplica local idéntica con Python, comparamos ambos sitios en pestañas paralelas y realizamos búsquedas automatizadas con `grep` para cazar credenciales, llaves de API olvidadas o malas prácticas en el uso de almacenamiento local (`localStorage`).

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo:** Descarga automatizada del sitio web usando filtros para no clonar la web entera, montaje del servidor local espejo e inspección estática del código descargado.
* **Analista Defensivo:** Revisar qué datos se están guardando en el navegador del cliente y proponer cómo mover esa lógica al backend.
* **Evaluador Purple Team:** Comparar visual y funcionalmente el clon contra el sitio original y verificar que los patrones de búsqueda con `grep` no se salten nada.

### 3. Entorno y Sitios Web Evaluados
* **Sitios Web Analizados:**
  1. `https://lab3-httrack-7958.netlify.app/` (Sitio propio de prueba desplegado en Netlify).
  2. `https://lab3sebastianjurado.netlify.app/` (Sitio de nuestro compañero Sebastián Jurado para realizar prueba cruzada en el equipo).
* **Herramientas:** Kali Linux, `httrack 3.49-14`, `python3`, `tree` y `grep`.

### 4. Procedimiento Técnico Paso a Paso
1. **Instalación y Verificación de HTTrack:**
   ```bash
   sudo apt update && sudo apt install httrack -y
   httrack --version # Verificamos versión 3.49-14
   ```
2. **Descarga Controlada con Filtros Estrictos:**
   Para no clonar servidores externos ni librerías fuera del dominio, aplicamos filtros rigurosos:
   ```bash
   mkdir -p ~/clon_sitio && cd ~/clon_sitio
   httrack https://lab3-httrack-7958.netlify.app/ -O . -%v -* +lab3-httrack-7958.netlify.app/*
   ```
3. **Inspección de la Estructura Descargada:**
   ```bash
   tree -L 3
   ```
4. **Levantamiento del Servidor Local Espejo:**
   ```bash
   python3 -m http.server 8080
   ```
   * *Contraste visual:* Abrimos dos pestañas en el navegador (una con el sitio en Netlify y otra con `http://localhost:8080`). Ambos sitios se veían exactamente iguales: estilos CSS, tipografías, imágenes y scripts cliente funcionando sin problemas.
5. **Auditoría de Código y Caza de Secretos con `grep`:**
   ```bash
   # Búsqueda insensible a mayúsculas de patrones típicos de secretos
   grep -E -i -rn "api[_-]?key|token|secret|password|bearer|auth|jwt" .
   ```

### 5. Cuestionario de Análisis Realizado por el Equipo
* **¿Encontramos contraseñas o información sensible?** No. Los resultados que arrojó `grep` fueron texto puramente descriptivo de la plantilla web y líneas internas del archivo de log de HTTrack. No había credenciales reales quemadas en el código.
* **¿Qué fue posible reconstruir?** El 100% de la capa de presentación: HTML, hojas de estilo CSS, scripts JavaScript de cliente e imágenes.
* **¿Se encontraron endpoints o llamadas a un backend?** No. Era un sitio puramente estático alojado en CDN de Netlify.
* **¿Qué dato detectamos que no debería estar en el frontend?** Detectamos el uso de `localStorage` con la variable `STORE_KEY`. Aunque en este laboratorio no manejaba datos críticos, como futuros ingenieros sabemos que **guardar tokens o datos de sesión en `localStorage` es peligroso** porque cualquier script malicioso inyectado (ataque XSS) puede leerlos con una sola línea de código: `localStorage.getItem('token')`.

### 6. Análisis Defensivo (Blue Team)
* **Regla de oro:** Nunca, bajo ninguna circunstancia, se deben quemar contraseñas, secretos de JWT o llaves privadas en el frontend. Si está en JavaScript, el usuario ya lo tiene en su máquina.
* **Solución Blue Team:**
  1. Si se requiere persistencia de sesión, utilizar **cookies con banderas `HttpOnly`, `Secure` y `SameSite=Strict`**. De esa manera, JavaScript no puede acceder a la cookie ni siquiera si existe una vulnerabilidad XSS.
  2. Implementar herramientas en el pipeline de desarrollo (como GitGuardian o TruffleHog) para evitar que un programador haga `git push` con secretos por descuido.
  3. Configurar cabeceras de seguridad HTTP (`Content-Security-Policy`) en el servidor web.
