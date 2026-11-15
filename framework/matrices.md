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

* **Crítica:** Falla que permite compromiso total del servidor, ejecución remota de comandos en el sistema operativo mediante RCE o subida de webshells (`lab-09`, `lab-10`), inclusión local de archivos sensibles (`/etc/passwd`), o robo masivo persistente de sesiones con XSS Stored. *Plazo de atención: Inmediato (< 24 horas).*
* **Alta:** Exfiltración demostrada de archivos clasificados (`lab-04`), engaño por phishing con robo de dinero (`lab-05`), vulnerabilidad a Prompt Injection con llamadas destructivas a APIs (`lab-08`), vulnerabilidades DAST que exponen cookies de sesión a secuestro o carencia de Content Security Policy (`lab-11`), o cambios forzados de credenciales administrativas por CSRF (`lab-10`). *Plazo de atención: < 7 días hábiles.*
* **Media:** Exposición de infraestructura en la nube (`lab-06`), falta de DNSSEC (`lab-02`), riesgo de fuerza bruta en login si carece de MFA (`lab-07`), o inferencia ciega de metadatos de base de datos (`lab-10`). *Plazo de atención: < 30 días hábiles.*
* **Baja / Informativa:** Buenas prácticas de programación frontend (`lab-03`), exposición pasiva de banners de servidor web (`lab-11`) y permisos del sistema operativo base (`lab-01`). *Plazo de atención: Próximo ciclo de mantenimiento.*
