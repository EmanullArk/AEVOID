# Ficha Técnica Estandarizada — FC-LAB-001 (lab-01-shell)

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-001** |
| **Nombre de la Práctica** | Comandos Shell y Gestión de Entornos en Kali Linux |
| **Versión** | 1.0 (Noviembre 2026) |
| **Dominio Metodológico** | **D01 — Entornos y sistemas** |
| **Fase de ÆVØID** | **Fase 01 — Preparación** |
| **Enfoque** | Transversal / Soporte Operativo |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
Acondicionar nuestro sistema operativo base (Kali Linux) y dominar la terminal para no depender de interfaces gráficas. Aprendemos a estructurar carpetas aisladas de trabajo, configurar permisos restrictivos bajo el estándar POSIX (`chmod 700 / 600`), filtrar flujos de datos con tuberías (`|`) y comandos como `grep`, `awk` y `sed`, y automatizar tareas repetitivas que necesitaremos en los siguientes laboratorios.

### 2. ¿Cómo nos repartimos los roles?
* **Ejecutor (Analista Ofensivo / Transversal):** Configuración de variables de entorno, creación de alias útiles y scripts de recolección inicial.
* **Defensor (Analista Defensivo):** Aplicar el principio de mínimo privilegio en los archivos y auditar que los historiales de comandos (`.bash_history` / `.zsh_history`) no guarden secretos ni tokens en texto plano.
* **Revisor (Evaluador de Calidad):** Comprobar que cualquier comando ejecutado sea limpio, repetible y no rompa la máquina virtual.

### 3. Entorno de Trabajo
* **Sistema:** Máquina Virtual Kali Linux 2026 (arquitectura x86_64).
* **Alcance:** Sistema de archivos local, usuarios estándar y elevación con `sudo`.
* **Permiso:** Entorno académico local debidamente autorizado.

### 4. Procedimiento Técnico Paso a Paso
1. **Creación de la Estructura Segura de Auditoría:**
   ```bash
   # Creamos el directorio base y subcarpetas aisladas
   mkdir -p ~/auditoria_aevoid/{evidencias,reportes,scripts,temp}
   cd ~/auditoria_aevoid
   
   # Bloqueamos el acceso para que ningún otro usuario local pueda leer nuestras evidencias
   chmod 700 evidencias reportes
   ls -ld evidencias reportes
   ```
2. **Filtrado Avanzado con Tuberías (Pipes):**
   ```bash
   # Filtrado de eventos con privilegios elevados en los logs del sistema
   head -n 50 /var/log/auth.log | grep "COMMAND" | awk '{print $1, $2, $3, $5, $6}'
   
   # Registro de bitácora inicial con fecha y hora del sistema
   echo "[$(date '+%Y-%m-%d %H:%M:%S')] Entorno preparado y validado por el Equipo ÆVØID" > reportes/bitacora.txt
   chmod 600 reportes/bitacora.txt
   ```
3. **Búsquedas Recursivas y Sanitización:**
   ```bash
   # Buscar archivos ejecutables o scripts en el directorio
   find . -type f -name "*.sh" -exec ls -lh {} \;
   
   # Comprobar que no hayamos dejado accidentalmente contraseñas en archivos temporales
   grep -rnw '.' -e 'password' -e 'token' -e 'secret'
   ```

### 5. Evidencias Obtenidas
* Árbol de carpetas del proyecto con permisos restrictivos `700/600`.
* Salidas de terminal limpias mostrando el filtrado de logs del sistema sin errores.
* Bitácora inicial sellada con fecha y hora.

### 6. Criterio de Aceptación
El estudiante o analista debe ser capaz de moverse fluidamente por la terminal sin ratón, empaquetar resultados y restringir permisos para evitar fuga de información local.

### 7. Análisis Defensivo (Blue Team)
* **Punto clave:** Muchos atacantes que logran acceso a una máquina leen el archivo `~/.bash_history` para robar comandos o credenciales que el administrador escribió con prisas.
* **Solución:** Configurar la variable `HISTCONTROL=ignorespace`, limpiar historiales al terminar sesiones y habilitar `auditd` para monitorear ejecuciones sospechosas de `sudo`.
