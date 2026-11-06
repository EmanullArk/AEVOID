# Rúbricas y Matrices de Evaluación de Riesgos — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

---

## 1. Rúbrica de Estimación de Severidad

La severidad de los hallazgos en **ÆVØID** se calcula cruzando la **Probabilidad de Ocurrencia** con el **Impacto en el Negocio**:

| Probabilidad \ Impacto | Bajo (1) | Medio (2) | Alto (3) | Crítico (4) |
| :--- | :---: | :---: | :---: | :---: |
| **Muy Alta (4)** | Media | Alta | Crítica | Crítica |
| **Alta (3)** | Media | Media | Alta | Crítica |
| **Media (2)** | Baja | Media | Media | Alta |
| **Baja (1)** | Informativa | Baja | Media | Media |

---

## 2. Niveles de Severidad y Tiempos de Respuesta Recomendados

* **Crítica:** Falla que permite compromiso total del servidor o robo masivo inmediato sin autenticación. *Plazo de atención: Inmediato (< 24 horas).*
* **Alta:** Exfiltración demostrada de archivos clasificados (`lab-04`), engaño por phishing con robo de dinero (`lab-05`) o vulnerabilidad a Prompt Injection con llamadas destructivas a APIs (`lab-08`). *Plazo de atención: < 7 días hábiles.*
* **Media:** Exposición de infraestructura en la nube (`lab-06`), falta de DNSSEC (`lab-02`) o riesgo de fuerza bruta en login si carece de MFA (`lab-07`). *Plazo de atención: < 30 días hábiles.*
* **Baja / Informativa:** Buenas prácticas de programación frontend (`lab-03`) y permisos del sistema operativo base (`lab-01`). *Plazo de atención: Próximo ciclo de mantenimiento.*
