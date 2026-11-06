# Anexo B: Matriz de Hallazgos y Riesgos — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Esta matriz categoriza las debilidades y hallazgos descubiertos durante las evaluaciones, correlacionando la probabilidad de ocurrencia y el impacto estimado en la organización:

| ID Hallazgo | Activo Afectado | Descripción de la Vulnerabilidad | Probabilidad | Impacto | Severidad Global | Tratamiento Propuesto |
| :---: | :--- | :--- | :---: | :---: | :---: | :--- |
| **H-01** | Zona DNS pública (`scanme.nmap.org`) | Ausencia de firmas criptográficas DNSSEC en la zona autoritativa. | Media | Alto | **Media** | Implementar firma DNSSEC mediante KSK/ZSK y delegar registro DS. |
| **H-02** | Aplicación Web Netlify | Almacenamiento persistente de identificadores en `localStorage` (`STORE_KEY`). | Alta | Medio | **Baja** | Migrar persistencia de estados sensibles a cookies `HttpOnly` y `Secure`. |
| **H-03** | Repositorio multimedia / Exfiltración | Fuga de datos clasificados mediante canal encubierto esteganográfico en JPG. | Baja | Crítico | **Alta** | Desplegar soluciones DLP en pasarelas de red y re-compresión de imágenes. |
| **H-04** | Canal de mensajería (WhatsApp) | Vulnerabilidad humana al engaño por pretexto académico y falsificación de identidad. | Alta | Alto | **Alta** | Capacitación periódica y políticas institucionales de canales oficiales. |
| **H-05** | Perímetro corporativo (`tesla.com`) | Exposición pública pasiva de topología cloud, rangos IP y proveedores en registros DNS/BGP. | Alta | Medio | **Media** | Ocultamiento de servidores no esenciales y auditoría a proveedores externos. |
| **H-06** | Formularios Web de Autenticación | Riesgo de ataque de fuerza bruta distribuida en portales con payload ofuscado en Base64. | Media | Alto | **Media** | Implementación de rate-limiting estricto y Autenticación Multifactor (MFA). |
| **H-07** | Aplicación con IA / LLM | Vulnerabilidad a Prompt Injection y fuga del System Prompt (LLM07) por falta de separación entre control e input. | Alta | Alto | **Alta** | Encapsular entradas en etiquetas inmutables, asumir prompt como público y desplegar Guardrails en backend. |
| **H-08** | APIs y Agentes con IA | Exceso de agencia y Tool Abuse (LLM06) con riesgo de ejecución de mutaciones o exfiltración vía APIs conectadas. | Media | Crítico | **Alta** | Limitar APIs a solo lectura, usar tokens de usuario final y exigir confirmación humana (Human-in-the-Loop). |
