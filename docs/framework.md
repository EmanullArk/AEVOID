# Definición, Alcance y Principios Rectores de ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

---

## 1. Definición Formal
**ÆVØID** es una propuesta de framework metodológico creada por estudiantes de Ingeniería de Sistemas que articula procedimientos de seguridad ofensiva (**Red Team**), defensiva (**Blue Team**) y colaborativa (**Purple Team**). 

Su propósito es estructurar cómo se identifican, analizan, mitigan y verifican los riesgos de seguridad en sistemas informáticos, garantizando que cada prueba técnica esté debidamente autorizada, sea repetible y esté respaldada por evidencias digitales inmutables.

---

## 2. Objetivos del Framework

### Objetivo General
Establecer un enfoque sistemático, accesible y estandarizado para evaluar y fortalecer controles de ciberseguridad en aplicaciones web, servicios de red, arquitecturas en la nube, procesos humanos y sistemas basados en Inteligencia Artificial.

### Objetivos Específicos
1. **Delimitar el alcance:** Establecer claramente qué se puede tocar y qué no, mediante Reglas de Compromiso (RoE) firmadas.
2. **Medir la línea base:** Analizar las defensas iniciales antes de lanzar cualquier prueba técnica.
3. **Ejecutar pruebas reproducibles:** Aplicar procedimientos técnicos (OSINT, DNS, web, forense, prompt injection) que cualquier otro analista pueda replicar paso a paso.
4. **Priorizar riesgos:** Transformar hallazgos técnicos en matrices de riesgo claras, evaluando probabilidad e impacto.
5. **Mitigar con criterio:** Diseñar controles de hardening, parches y guardrails para tapar las fallas encontradas.
6. **Verificar efectividad:** Repetir las pruebas (re-testing) para certificar con hechos que la solución funcionó.

---

## 3. Principios Rectores
* **Autorización Expresa:** Cero ataques sin permiso por escrito del dueño del sistema.
* **Proporcionalidad y Mínimo Impacto:** Las pruebas se diseñan para evaluar, no para tumbar servidores ni interrumpir las operaciones del negocio.
* **Confidencialidad Estricta:** La información descubierta durante las pruebas se maneja bajo secreto profesional.
* **Integridad de Evidencias:** Cada captura y registro se sella con su hash criptográfico SHA-256 para preservar la cadena de custodia.
* **Mejora Continua:** Los hallazgos del Red Team retroalimentan las defensas del Blue Team de forma permanente.
