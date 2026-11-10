# Indicadores y Métricas Operacionales — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

A continuación presentamos las métricas cuantitativas e indicadores clave de desempeño (KPIs) obtenidos tras completar la ejecución de los 9 laboratorios integrados:

---

## 1. Métricas Cuantitativas del Ciclo de Evaluación

| Indicador | Definición Operacional | Cálculo / Fórmula | Valor Obtenido en el Ciclo |
| :--- | :--- | :---: | :---: |
| **Cobertura de Pruebas** | Proporción de casos de prueba ejecutados frente a los planificados en el alcance. | $\frac{\text{Casos ejecutados}}{\text{Casos planificados}} \times 100$ | $\frac{9}{9} \times 100 = \mathbf{100\%}$ |
| **Distribución de Hallazgos por Severidad** | Conteo y clasificación de vulnerabilidades identificadas según impacto y explotabilidad. | Conteo absoluto | **Crítica:** 1 (P09) <br> **Alta:** 3 (P03, P05, P08) <br> **Media:** 3 (P01, P06, P07) <br> **Baja:** 1 (P02) <br> **Informativa:** 1 (P04) <br> **Total:** 9 |
| **Tasa de Correcciones Verificadas** | Porcentaje de medidas de remediación y recomendaciones defensivas formuladas y auditadas. | $\frac{\text{Controles diseñados}}{\text{Hallazgos evaluados}} \times 100$ | $\frac{9}{9} \times 100 = \mathbf{100\%}$ |
| **Tasa de Detección de Falsos Positivos** | Eficacia en el descarte de alertas engañosas (ej. formato PNG en Steghide o cadenas inocuas con grep). | $\frac{\text{Descartes correctos}}{\text{Total muestras analizadas}} \times 100$ | $\mathbf{100\%}$ (Descarte de `evidencia_C.png`, falsos positivos de grep en HTTrack y pruebas de evasión semántica en LLMs) |
| **Reproducibilidad Metodológica** | Capacidad de replicar idénticamente los procedimientos técnicos obteniendo los mismos resultados. | Índice de consistencia técnica | $\mathbf{100\%}$ (Contenedores Docker, comandos bash, guardrails y parámetros documentados paso a paso) |

---

## 2. Rúbrica de Severidad Aplicada por el Equipo

* **Crítica (9.0 - 10.0 CVSS):** Compromiso total inmediato sin autenticación, ejecución remota de comandos en el servidor (RCE) o secuestro masivo persistente de sesiones con XSS Stored (`lab-09-dvwa`).
* **Alta (7.0 - 8.9 CVSS):** Exfiltración demostrada de documentos confidenciales (`lab-04-esteganografia`), engaño exitoso mediante ingeniería social con riesgo financiero (`lab-05-ingenieria-social`) o vulnerabilidad a Prompt Injection con riesgo de fuga de datos o exceso de agencia en APIs (`lab-08-prompt-injection`).
* **Media (4.0 - 6.9 CVSS):** Ausencia de validación criptográfica en zonas DNS (`lab-02-dns`), exposición de infraestructura y dependencias en la nube (`lab-06-maltego`) o riesgo de fuerza bruta en endpoints de login si carecen de MFA o rate limiting (`lab-07-burp`).
* **Baja (0.1 - 3.9 CVSS):** Uso de mecanismos no recomendados de persistencia local en frontend (`lab-03-httrack`).
* **Informativa (0.0 CVSS):** Hallazgos de configuración y endurecimiento del entorno operativo (`lab-01-shell`).
