# Plantilla Estandarizada para Nuevos Laboratorios — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Utilice esta plantilla oficial para documentar cualquier nueva práctica o laboratorio futuro (a partir del Laboratorio 12 en adelante), garantizando la misma estructura técnica y metodológica aplicada en los 11 laboratorios ya consolidados:

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-XXX** (ej. **FC-LAB-012**) |
| **Nombre de la Práctica** | [Título descriptivo y riguroso de la práctica técnica] |
| **Versión** | 1.0 (Mes y Año) |
| **Dominio Metodológico** | **[D01 a D08 según catálogo: Sistemas, OSINT, Web, APIs, Humano, Forense, Cripto, Seguridad IA]** |
| **Fase de ÆVØID** | **[Fase 01 a 06 aplicable: Preparación, Prevención, Identificación, Análisis, Mitigación, Verificación]** |
| **Enfoque** | [Ofensivo (Red Team) / Defensivo (Blue Team) / Integrador (Purple Team) / Forense] |
| **Estándar de Referencia** | **[OWASP Top 10 / OWASP LLM / NIST SP 800-115 / MITRE ATT&CK / RFC específico]** |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

---

### 1. ¿Cuál es el objetivo de esta práctica?
[Describir en lenguaje natural, claro y desde la perspectiva de estudiantes de octavo semestre qué se busca probar o demostrar técnicamente. Explicar qué hipótesis se evalúa, qué módulos se analizan y por qué es importante para la seguridad de la organización.]

---

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo (Red Team):** [Quién del equipo ejecuta los comandos, herramientas de prueba, scripts o vectores de explotación controlados.]
* **Analista Defensivo (Blue Team):** [Quién analiza logs, código fuente, configuraciones vulnerables o diseña las medidas de remediación y hardening.]
* **Evaluador Purple Team:** [Quién valida la reproducibilidad técnica, mide la severidad con la matriz de riesgos de ÆVØID y verifica que los parches funcionen sin romper la aplicación.]

---

### 3. Entorno de Trabajo y Despliegue / Autorización
* **Sistema Operativo Anfitrión / VM:** [Ej. Kali Linux Rolling, Ubuntu Server, Windows Sandbox.]
* **Objetivo de Prueba (Target):** [Dirección IP, URL local, contenedor Docker, paquete de evidencias o servicio cloud autorizado.]
* **Límites de la Prueba (RoE):** [Restricciones de denegación de servicio, límites de ancho de banda o ventanas horarias acordadas.]
* **Herramientas Utilizadas:** [Lista de herramientas, versiones y utilitarios empleados.]

---

### 4. Procedimiento Técnico Paso a Paso y Resultados Obtenidos

#### Módulo / Paso 1: [Nombre de la Prueba o Vector Inicial]
1. **Comportamiento Normal:** [Explicar cómo opera el sistema con una entrada legítima esperada.]
2. **Alteración o Inyección Técnica:**  
   [Comando, payload o solicitud enviada:]
   ```bash
   # Comando ejecutado en terminal o carga inyectada
   herramienta --parametro valor
   ```
3. **Observación Técnica y Resultado:** [Qué respondió el sistema, códigos HTTP, capturas o salidas de consola obtenidas.]

#### Módulo / Paso 2: [Nombre de la Prueba Avanzada o Explotación]
1. **Procedimiento Técnico:** [Pasos detallados de la prueba.]
2. **Comando / Petición:**
   ```bash
   comando_avanzado
   ```
3. **Hallazgo de Seguridad Identificado:** [Impacto real en confidencialidad, integridad o disponibilidad.]

---

### 5. Tabla Comparativa de Vulnerabilidades / Hallazgos Evaluados

| Vulnerabilidad / Prueba | Módulo Afectado | Entrada / Vector Aplicado | Impacto Técnico Demostrado | Categoría OWASP / Estándar |
| :--- | :--- | :--- | :--- | :---: |
| **[Nombre Falla 1]** | [Módulo/Ruta] | `[Payload/Comando]` | [Consecuencia observable en el sistema] | **A0X:2021** |
| **[Nombre Falla 2]** | [Módulo/Ruta] | `[Payload/Comando]` | [Consecuencia observable en el sistema] | **A0X:2021** |

---

### 6. Análisis Defensivo y Plan de Mitigación (Blue Team)

Como futuros ingenieros de sistemas, planteamos las soluciones técnicas de fondo para erradicar las fallas encontradas:

1. **[Mitigación para Falla 1]:**
   * *Causa raíz:* [Por qué ocurrió el fallo en el código o configuración.]
   * *Solución recomendada:* [Código seguro, directiva de servidor web o configuración requerida.]
   ```php
   // Ejemplo de código seguro o configuración
   ```
2. **[Mitigación para Falla 2]:**
   * *Configuración o directiva:* [Reglas de firewall, headers HTTP, políticas de contraseñas, etc.]

---

### 7. Criterio de Aceptación y Validación Metodológica en ÆVØID
* **Condición de Éxito:** [Condición observable y verificable mediante capturas o hashes que demuestra que la prueba fue concluida satisfactoriamente.]
* **Conformidad Metodológica:** Los hallazgos se integran formalmente a la **Fase 03 (Identificación)**, se valoran en la **Fase 04 (Análisis)** y se mitigan en la **Fase 05 (Mitigación)** de **ÆVØID**.
