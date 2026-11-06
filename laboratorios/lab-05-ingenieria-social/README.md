# Ficha Técnica Estandarizada — FC-LAB-005 (lab-05-ingenieria-social)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-005** |
| **Nombre de la Práctica** | Modelado de Ingeniería Social y Vectores Humanos (Phishing / USB Baiting) |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D05 — Factor humano** |
| **Fase de ÆVØID** | **Fase 02 — Prevención & Fase 03 — Identificación** |
| **Enfoque** | Factor Humano / Prevención y Modelado de Amenazas |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Entender que de nada sirve tener los firewalls más caros si el ser humano sigue siendo el eslabón más débil de la cadena. Diseñamos, intercambiamos y analizamos escenarios reales de engaño en el ámbito universitario y financiero, identificando los gatillos psicológicos que usan los atacantes (la urgencia por un parcial, la confianza entre compañeros y la apariencia institucional) para formular controles de prevención y concientización.

### 2. ¿Cómo nos repartimos los roles?
* **Modelador Ofensivo:** Diseñar señuelos creíbles aprovechando situaciones cotidianas de la universidad (entorno USTA Tunja).
* **Analista Defensivo:** Mapear los indicadores de alerta (*Red Flags*) y proponer políticas organizacionales para neutralizar el engaño.
* **Evaluador Purple Team:** Construir la matriz de análisis para desglosar el pretexto, canal, técnicas y tratamientos aplicables.

### 3. Escenarios Construidos e Intercambiados en el Grupo

#### Escenario 1: Vector Físico — La USB "No More Hidding" (Creado por Cristian Hernández)
Un estudiante borra por accidente archivos importantes de su proyecto de grado. Recuerda que encontró en la universidad una memoria USB con una etiqueta que dice *"Recuperador de Archivos"*, con un programa ejecutable llamado `No More Hidding.exe`. Con la urgencia de recuperar su trabajo, la conecta y ejecuta el programa. Aparece una barra de carga, recupera los archivos, pero a los pocos días el equipo funciona lento y aparecen movimientos extraños en sus cuentas.
$\rightarrow$ **Técnica:** *USB Baiting* (cebo físico con troyano embebido).

#### Escenario 2: Vector Digital — "La Guía del Parcial" (Creado por Julián Roa)
Carlos es estudiante de Ingeniería de Sistemas. El miércoles por la tarde recibe un mensaje en el grupo de WhatsApp de la materia Simulación:  
> *"Parcialito viernes, acá la guía de instalación del software que pidió el profe. Sin esto no van a poder correr los modelos 😬"*.  

El mensaje incluye el archivo `USTA_SimulacionV2_instalacion_2026.pdf`, con portada institucional y logo de la Santo Tomás. Carlos lo abre de inmediato. Esa misma noche ingresa a la sucursal web de su banco para pagar un servicio. Días después nota retiros no autorizados de su dinero.

---

### 4. Matriz de Análisis Técnico del Escenario

| Elemento Analizado | Identificación en el Escenario | Justificación de Ingeniería |
| :--- | :--- | :--- |
| **Contexto** | Académico y Financiero | La amenaza nace en un grupo universitario de mensajería y culmina en pérdidas bancarias. |
| **Objetivo del Atacante** | Obtener credenciales bancarias | El atacante busca dinero; el software académico solo fue la fachada para infectar el equipo. |
| **Canal Utilizado** | WhatsApp | Red social informal donde la gente baja la guardia porque asume que todos son amigos. |
| **Pretexto (Storyline)** | Guía de instalación para el parcial | Usa una necesidad académica ineludible de la materia Simulación. |
| **Identidad Simulada** | Compañero de clase | Explota la confianza implícita entre estudiantes de la misma carrera. |
| **Mecanismo de Persuasión** | Urgencia, miedo y autoridad | La cercanía del parcial nubla el juicio crítico de la víctima ("sin esto no van a poder correr los modelos"). |
| **Acción Solicitada** | Abrir y ejecutar el archivo adjunto | Descargar un ejecutable camuflado con doble extensión o exploit en visor PDF. |
| **Clasificación** | Spear Phishing / Suplantación | Ataque altamente dirigido al nicho de estudiantes de sistemas. |
| **Indicadores de Alerta** | Fichero no solicitado, canal informal | El docente nunca anunció el archivo por la plataforma oficial (Moodle/Teams). |

---

### 5. Análisis Defensivo (Blue Team)
* **¿Por qué funciona este ataque?** Porque apela a emociones básicas: el afán de salvar una materia y la confianza en un compañero. Ningún antivirus detiene al 100% a un usuario convencido de abrir un archivo.
* **Solución Blue Team:**
  1. **Regla de Canales Oficiales:** Prohibir terminantemente que software, instaladores o documentos académicos evaluativos se compartan por grupos informales de WhatsApp. Todo debe canalizarse por el campus virtual oficial de la USTA.
  2. **Bloqueo físico de puertos USB:** En terminales corporativos o de laboratorios universitarios, bloquear mediante Directivas de Grupo (GPO) o `usbguard` la lectura de dispositivos USB no autorizados.
  3. **Campañas de Phishing Simulado:** Realizar simulacros periódicos en la universidad para entrenar el ojo crítico de estudiantes y funcionarios ante correos o mensajes sospechosos.
  4. **Protección EDR:** Monitorear comportamientos anómalos (por ejemplo, si un visor de PDF intenta ejecutar PowerShell o crear llaves de registro sospechosas).
