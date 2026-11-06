# Especificación Formal de las Fases — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

A continuación se detallan las entradas, actividades, salidas y criterios de cierre de las 6 fases de **ÆVØID**:

---

### Fase 01: Preparación
* **Entradas:** Solicitud formal de la evaluación, alcance preliminar de sistemas y canales de comunicación.
* **Actividades:** Definir el alcance exacto, acordar las Reglas de Compromiso (RoE), asignar roles a los integrantes del equipo y acondicionar las máquinas virtuales Kali Linux con permisos estrictos (`chmod 700 / 600`).
* **Salidas:** Plan de evaluación autorizado y criterios de parada de emergencia.
* **Criterio de Cierre:** Documento de autorización firmado por el Responsable del Sistema y el Coordinador de Evaluación.

### Fase 02: Prevención
* **Entradas:** Plan aprobado, arquitectura de red conocida y catálogo de controles defensivos existentes.
* **Actividades:** Diagnóstico preliminar de defensas perimetrales, revisión de políticas de correo (SPF) y modelado de vulnerabilidades humanas frente a ingeniería social (phishing y USB baiting).
* **Salidas:** Documento de línea base y diagnóstico inicial.
* **Criterio de Cierre:** Línea base aprobada por el Analista Defensivo y el Coordinador.

### Fase 03: Identificación
* **Entradas:** Escenarios de prueba autorizados y herramientas de laboratorio listas (Burp Suite, Maltego, dig, HTTrack, Steghide, OWASP LLM Suite).
* **Actividades:** Ejecución de pruebas técnicas controladas: recolección OSINT pasiva, footprinting DNS, clonación web, interceptación proxy de peticiones de login, análisis forense de imágenes sospechosas y pruebas adversariales de prompt injection.
* **Salidas:** Bitácora cronológica de comandos, capturas de pantalla de hallazgos y paquetes de evidencias con hashes SHA-256.
* **Criterio de Cierre:** Registro íntegro de evidencias entregado al Custodio bajo estricta cadena de custodia.

### Fase 04: Análisis
* **Entradas:** Bitácoras de prueba, evidencias verificadas y respuestas observadas de los servidores.
* **Actividades:** Depuración de falsos positivos, valoración de la probabilidad e impacto de cada fallo, cálculo de severidad (Baja, Media, Alta o Crítica) y correlación de debilidades.
* **Salidas:** Matriz de Hallazgos y Riesgos priorizada.
* **Criterio de Cierre:** Matriz consensuada entre el Analista Ofensivo y el Analista Defensivo bajo moderación del Purple Team.

### Fase 05: Mitigación
* **Entradas:** Matriz de riesgos con las fallas priorizadas.
* **Actividades:** Diseño e implementación de parches técnicos: endurecimiento DNS con DNSSEC, eliminación de datos sensibles en `localStorage`, adopción de respuestas de error unificadas (anti-enumeración), y guardrails deterministas en backend para IA (*Human-in-the-Loop*).
* **Salidas:** Registro de cambios de configuración, parches de código y guías de hardening.
* **Criterio de Cierre:** Despliegue de las soluciones confirmado por el equipo administrador.

### Fase 06: Verificación
* **Entradas:** Sistema mitigado y casos de prueba originales de la Fase 03.
* **Actividades:** Reejecución idéntica de las pruebas (Re-testing), comprobación de no-regresión de fallas y cálculo de indicadores de efectividad.
* **Salidas:** Informe Final de Efectividad con métricas cuantitativas (100% de cobertura y severidades resueltas).
* **Criterio de Cierre:** Visto bueno del Evaluador de Calidad y entrega formal del informe al Responsable del Sistema.
