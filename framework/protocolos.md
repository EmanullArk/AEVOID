# Protocolos Técnicos y Reglas de Compromiso — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

---

## 1. Reglas de Compromiso (Rules of Engagement - RoE)
Antes de iniciar cualquier evaluación técnica bajo **ÆVØID**, se deben acordar por escrito las siguientes pautas operativas:
1. **Ventana Horaria de Pruebas:** Establecer días y horas específicas para evitar afectar la operación normal del cliente o de la universidad.
2. **Direcciones IP de Origen:** Notificar con antelación las direcciones IP públicas desde las cuales el equipo lanzará los escaneos o peticiones para no saturar los sistemas de detección.
3. **Criterios de Parada Inmediata (Stop Order):**
   * Se detendrá la prueba si el servidor o servicio objetivo sufre una caída de disponibilidad no programada.
   * Se detendrá si se accede accidentalmente a información personal o bancaria real no sintética.
   * Se detendrá si el Responsable del Sistema o el docente solicita la suspensión de la actividad.

---

## 2. Protocolo de Cadena de Custodia Forense
Para cualquier evidencia digital capturada (capturas de terminal, volcados de red, imágenes sospechosas):
* En el segundo cero tras obtener la evidencia, se generará su huella criptográfica SHA-256 (`sha256sum archivo > hash.txt`).
* Se registrará en la bitácora: fecha, hora exacta, nombre del integrante que ejecutó el comando y herramienta utilizada.
* Los archivos fuente originales se marcarán como de solo lectura (`chmod 400`) y se trabajará exclusivamente sobre copias de trabajo.
