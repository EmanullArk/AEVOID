# Ficha Técnica Estandarizada — FC-LAB-004 (lab-04-esteganografia)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-004** |
| **Nombre de la Práctica** | Análisis Forense Digital y Detección de Esteganografía (`Steghide`, `exiftool`, `binwalk`) |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D06 — Forense digital** |
| **Fase de ÆVØID** | **Fase 03 — Identificación & Fase 04 — Análisis** |
| **Enfoque** | Forense y Colaborativo (DFIR & Purple Team) |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Resolver un reto forense real aplicando una **cadena de custodia estricta**. Recibimos de nuestro compañero Julián Roa un paquete con tres imágenes sospechosas (`evidencia_A.jpeg`, `evidencia_B.jpg` y `evidencia_C.png`). El objetivo fue responder tres preguntas sin margen de error:
1. ¿Cuál es la imagen limpia de control (sin alteraciones)?
2. ¿Cuál fue alterada mediante concatenación simple de bytes?
3. ¿Cuál esconde un secreto mediante esteganografía con la herramienta `Steghide`?

### 2. ¿Cómo nos repartimos los roles?
* **Analista Forense (DFIR):** Preservar la integridad de los archivos, extraer metadatos EXIF, inspeccionar firmas binarias y extraer la carga oculta.
* **Custodio de Evidencias:** Calcular los hashes SHA-256 de cada muestra en el minuto cero para garantizar que nadie modificó los archivos durante la investigación.
* **Analista Defensivo:** Formular recomendaciones de seguridad para evitar que empleados o atacantes saquen información confidencial de una empresa camuflada dentro de imágenes.

### 3. Entorno de Trabajo y Preservación
* **Directorio de contención:** `/reto_esteganografia_roa` en Kali Linux, organizado en tres subcarpetas: `evidencias/`, `reportes/` y `extraidos/`.
* **Archivos recibidos:**
  * `evidencia_A.jpeg` (31 KB)
  * `evidencia_B.jpg` (62 KB)
  * `evidencia_C.png` (7.6 KB)

### 4. Procedimiento Técnico Paso a Paso y Cadena de Custodia
1. **Preservación y Sellado Criptográfico (Hashes SHA-256):**
   Antes de abrir o tocar cualquier archivo, calculamos sus huellas digitales:
   ```bash
   mkdir -p /reto_esteganografia_roa/{evidencias,reportes,extraidos}
   cd /reto_esteganografia_roa
   sha256sum evidencias/* > reportes/hashes.txt
   cat reportes/hashes.txt
   file evidencias/*
   ```
2. **Extracción Exhaustiva de Metadatos (`exiftool`):**
   ```bash
   exiftool evidencias/evidencia_A.jpeg > reportes/exif_A.txt
   exiftool evidencias/evidencia_B.jpg > reportes/exif_B.txt
   exiftool evidencias/evidencia_C.png > reportes/exif_C.txt
   ```
   * *Observación:* Ningún archivo contenía datos GPS ni información de cámara que revelara el contenido, pero confirmamos sus formatos lógicos reales.
3. **Inspección de Cadenas de Texto (`strings`) — ¡Primer Hallazgo!**
   La concatenación es cuando alguien pega texto al final de una imagen con un comando como `cat secreto.txt >> imagen.jpg`. El visor de imágenes la abre normal porque se detiene en el marcador de fin de JPEG (`FF D9`), pero las utilidades de bajo nivel leen todo:
   ```bash
   strings evidencias/evidencia_B.jpg | tail -n 20
   ```
   * *Hallazgo Clave 1:* Al final de `evidencia_B.jpg` encontramos un texto plano que decía textualmente:  
     `"Este archivo no fue ocultado mediante steghide, si vez este mensaje quiere decir que recuperaste la informacin con exito"`.  
     $\rightarrow$ **Quedó demostrada técnicamente la imagen concatenada.**
4. **Análisis Estructural con `binwalk`:**
   ```bash
   binwalk evidencias/*
   ```
   * *Resultado:* Confirmó estructuras de compresión válidas y descartó firmas de ejecutables o archivos ZIP camuflados.
5. **Análisis Esteganográfico con `Steghide` — ¡Segundo Hallazgo!**
   Nos quedaban `evidencia_A.jpeg` y `evidencia_C.png`:
   * Al probar `steghide info evidencias/evidencia_C.png`, la herramienta arrojó de inmediato:  
     `the file format of the file "evidencias/evidencia_C.png" is not supported`.  
     Como estudiantes de ingeniería sabemos que Steghide opera sobre JPEG, BMP y WAV, no sobre PNG. Por descarte técnico, **`evidencia_C.png` es la imagen limpia de control**.
   * Al evaluar `evidencia_A.jpeg` con la contraseña suministrada por Julián:
     ```bash
     steghide info evidencias/evidencia_A.jpeg
     # Resultado: ¡Detectó el archivo incrustado confidencial.txt de 409 bytes!
     
     cd extraidos
     steghide extract -sf ../evidencias/evidencia_A.jpeg
     cat confidencial.txt
     ```
   * *Hallazgo Clave 2:* Extrajimos exitosamente el archivo clasificado `confidencial.txt` con el mensaje secreto del reto.

### 5. Resumen de Conclusiones del Peritaje
* **`evidencia_A.jpeg`:** Imagen portadora de canal encubierto mediante **esteganografía con Steghide** (secreto extraído).
* **`evidencia_B.jpg`:** Imagen manipulada mediante **concatenación directa de bytes** (descubierta con `strings`).
* **`evidencia_C.png`:** Imagen **limpia de control** en formato PNG.

### 6. Análisis Defensivo (Blue Team)
* **¿Cuál es el peligro?** La esteganografía es muy usada para **exfiltración de datos corporativos** o comunicaciones de troyanos (C2). Un empleado desleal puede enviar una foto inofensiva por correo o subirla a redes sociales llevando gigabytes de código fuente o bases de datos sin que un firewall tradicional levante sospecha.
* **Solución Blue Team:**
  1. **Sanitización automática de imágenes (CDR - Content Disarm & Reconstruction):** Configurar proxies y servidores de correo para recomprimir (*re-encode*) toda imagen que salga o entre a la empresa. Al recompilar los píxeles, se destruyen los bits menos significativos (LSB) donde se esconde la esteganografía.
  2. **Eliminación masiva de metadatos EXIF** en pasarelas web.
  3. **Control en endpoints:** Monitorear y restringir la ejecución de binarios como `steghide` en estaciones de trabajo corporativas.
