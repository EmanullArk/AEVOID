# Glosario Técnico y Metodológico — ÆVØID

> **Framework de Ciberseguridad ÆVØID**  
> **Universidad Santo Tomás — Seccional Tunja | Ingeniería de Sistemas (8° Semestre)**  
> **Equipo ÆVØID:** Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo  
> **Docente:** Sergio Arley Puerto Moreno  

Este glosario define en lenguaje claro y riguroso los 30 términos fundamentales que utilizamos a lo largo de nuestro framework:

1. **Red Team:** El equipo o rol encargado de simular ataques reales bajo autorización, probando las defensas desde la perspectiva de un adversario.
2. **Blue Team:** El equipo o rol encargado de defender: monitorea eventos, responde a incidentes y aplica configuraciones de endurecimiento (*hardening*).
3. **Purple Team:** El trabajo colaborativo continuo donde Red y Blue comparten hallazgos y conocimientos para cerrar brechas de seguridad rápido.
4. **SOC (Centro de Operaciones de Seguridad):** El equipo o instalación encargada de vigilar y analizar el tráfico y las alertas de seguridad en tiempo real.
5. **CSIRT:** Equipo especializado en coordinar la respuesta técnica cuando ocurre un incidente de seguridad informático.
6. **Pentesting (Pruebas de Penetración):** Auditoría técnica acotada en tiempo y alcance que busca explotar vulnerabilidades para medir el nivel de riesgo real.
7. **OSINT (Inteligencia de Fuentes Abiertas):** Metodología para recolectar y analizar información que ya es pública y accesible en Internet (DNS, redes, WHOIS).
8. **Footprinting:** La fase inicial de reconocimiento donde se mapea el perímetro de una empresa (IPs, dominios, proveedores) sin atacarla directamente.
9. **Superficie de Ataque:** La sumatoria de todos los puntos por donde un atacante podría intentar entrar a un sistema (puertos abiertos, APIs, empleados, etc.).
10. **Vulnerabilidad:** Una debilidad o fallo en el diseño, código o configuración de un sistema que puede ser aprovechado para causar daño.
11. **Amenaza:** Cualquier agente, circunstancia o atacante que tiene el potencial de explotar una vulnerabilidad.
12. **Riesgo:** La probabilidad de que una amenaza explote una vulnerabilidad combinada con el impacto que eso tendría para la organización.
13. **SIEM:** Plataforma de software que centraliza, analiza y correlaciona millones de logs y eventos de seguridad para detectar anomalías.
14. **EDR:** Solución de seguridad instalada en las máquinas de los usuarios (endpoints) que detecta y bloquea comportamientos sospechosos en vivo.
15. **IOC (Indicador de Compromiso):** Evidencia forense de que un sistema fue hackeado (por ejemplo, el hash de un virus, una IP maliciosa o un archivo extraño).
16. **TTP (Tácticas, Técnicas y Procedimientos):** La forma y los patrones de comportamiento que caracterizan cómo opera un grupo de atacantes.
17. **MITRE ATT&CK:** Matriz global de conocimiento que categoriza todas las técnicas reales que usan los hackers durante un ataque.
18. **OWASP:** Comunidad internacional abierta que publica estándares y guías de seguridad para desarrollo web, APIs e Inteligencia Artificial.
19. **Hardening (Endurecimiento):** Proceso de asegurar un servidor o software apagando servicios innecesarios, cambiando contraseñas por defecto y cerrando puertos.
20. **Cadena de Custodia:** Registro formal que certifica quién obtuvo una prueba digital, cuándo, cómo y demuestra que no fue alterada.
21. **Evidencia Digital:** Cualquier archivo, captura, registro o log que sirve como prueba técnica en una investigación forense.
22. **DFIR (Forense Digital y Respuesta a Incidentes):** Especialidad técnica que investiga qué pasó durante un ataque y contiene el daño.
23. **Esteganografía:** El arte de esconder un archivo o mensaje secreto dentro de otro archivo portador (como una foto o audio) para que pase desapercibido.
24. **DNSSEC:** Extensión criptográfica del protocolo DNS que añade firmas digitales para evitar que falsifiquen las respuestas de nombres de dominio.
25. **SPF:** Registro de texto en el DNS que declara qué servidores de correo tienen permiso legítimo para enviar mensajes a nombre de una empresa.
26. **ASN (Número de Sistema Autónomo):** Identificador numérico global que agrupa las redes y rangos de IP de un proveedor de Internet o nube (ej. Amazon AWS).
27. **Enumeración de Usuarios:** Técnica de reconocimiento web donde un atacante prueba nombres para ver si el servidor le confirma cuáles usuarios existen realmente.
28. **Prompt Injection:** Manipulación mediante lenguaje natural de las instrucciones de un LLM para saltarse sus directivas originales y tomar el control del asistente.
29. **Fase Metodológica:** Bloque estructurado de pasos y entregables definidos dentro del ciclo de vida de nuestro framework.
30. **Validación:** Comprobación empírica y documentada de que una solución de seguridad aplicada realmente cerró la vulnerabilidad sin romper el sistema.
