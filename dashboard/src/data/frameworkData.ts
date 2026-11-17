import type {
  FrameworkPhase,
  RaciRow,
  RoleDefinition,
  TeamMember,
  TraceabilityRow,
} from '../types/aevoid';

export const FRAMEWORK_META = {
  name: 'ÆVØID',
  fullTitle: 'Framework Metodológico de Ciberseguridad ÆVØID',
  subtitle: 'Metodología para la Evaluación, Análisis y Fortalecimiento de la Seguridad Informática',
  version: '1.3.0',
  versionNote: 'Versión consolidada (10 fichas de laboratorio en catálogo React; FC-LAB-010 omitido)',
  date: 'Noviembre de 2026',
  institution: 'Universidad Santo Tomás — Seccional Tunja',
  faculty: 'Ingeniería de Sistemas (8° Semestre)',
  course: 'Ciberseguridad White Hat & Blue Team Strategies',
  professor: 'Sergio Arley Puerto Moreno',
  driveUrl: 'https://drive.google.com/drive/folders/1l7C8SUD9tOp-fl7noQSQNtzoc9Z6bK56?usp=sharing',
  vision:
    'Conectar el ataque (Red Team), la defensa (Blue Team) y la mejora continua (Purple Team) mediante una guía práctica, repetible, autorizada y respaldada por hashes SHA-256.',
  generalObjective:
    'Establecer un enfoque sistemático, accesible y estandarizado para evaluar y fortalecer controles de ciberseguridad en aplicaciones web, servicios de red, arquitecturas en la nube, procesos humanos y sistemas basados en Inteligencia Artificial.',
  specificObjectives: [
    'Delimitar el alcance mediante Reglas de Compromiso (RoE) firmadas.',
    'Medir la línea base defensiva antes de ejecutar pruebas técnicas.',
    'Ejecutar pruebas reproducibles paso a paso (OSINT, DNS, web, forense, prompt injection y DAST).',
    'Priorizar riesgos cruzando probabilidad de ocurrencia e impacto.',
    'Mitigar con criterio técnico mediante hardening, parches y guardrails.',
    'Verificar efectividad repitiendo pruebas (re-testing) hasta cerrar hallazgos.',
  ],
  principles: [
    {
      title: 'Autorización Expresa',
      detail: 'Cero ataques sin permiso por escrito del responsable del sistema.',
    },
    {
      title: 'Proporcionalidad y Mínimo Impacto',
      detail: 'Pruebas diseñadas para evaluar sin tumbar servidores ni interrumpir operaciones.',
    },
    {
      title: 'Confidencialidad Estricta',
      detail: 'Información descubierta durante la auditoría bajo secreto profesional y datos sintéticos.',
    },
    {
      title: 'Integridad de Evidencias',
      detail: 'Cada captura y archivo se sella en el minuto cero con hash criptográfico SHA-256.',
    },
    {
      title: 'Mejora Continua',
      detail: 'Los hallazgos del Red Team retroalimentan permanentemente las defensas del Blue Team.',
    },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Cristian Emanuel Hernández Araque',
    role: 'Coordinador de Evaluación & Purple Team Lead',
    teamTag: 'Purple Team',
    focus:
      'Coordinación metodológica, arquitectura del framework, modelado UML (Secuencia, Actividades y Casos de Uso), integración de matrices P01-P11 y consolidación técnica.',
    driveDeliverable: 'Fichas consolidadas en Markdown, diagramas UML y estructura ÆVØID.',
  },
  {
    name: 'Maryori Brigith Barrera Ascanio',
    role: 'Evaluadora de Calidad & Auditora Blue Team',
    teamTag: 'Blue Team',
    focus:
      'Auditoría y control de calidad de laboratorios, verificación de reproducibilidad de comandos, revisión de matrices de riesgo y diseño de checklists de hardening.',
    driveDeliverable: 'Carpeta InformesMaryori/ con 11 informes formales (.docx).',
  },
  {
    name: 'Johan Sebastian Jurado Hernández',
    alias: 'ProSebJu',
    role: 'Analista Ofensivo (Red Team Lead)',
    teamTag: 'Red Team',
    focus:
      'Ejecución de ataques técnicos, despliegue web en Netlify (lab3sebastianjurado.netlify.app), pruebas de fuerza bruta, explotación web y validaciones en Kali Linux.',
    driveDeliverable: 'Carpeta ProSebJu/ con 11 informes técnicos (.docx y .pdf).',
  },
  {
    name: 'Julián Andrés Roa Lizcano',
    role: 'Custodio de Evidencias & Especialista Forense',
    teamTag: 'Forense',
    focus:
      'Cadena de custodia y catálogo SHA-256, diseño y resolución del reto reto_esteganografia_roa, simulación de pretextos y escaneo activo OWASP ZAP (1.509 peticiones, 12 alertas).',
    driveDeliverable: 'Consolidado_Laboratorios_Julian_Roa.pdf (37 páginas) y reto forense.',
  },
  {
    name: 'Andrés José Rozo Castellanos',
    role: 'Analista Defensivo (Blue Team Lead)',
    teamTag: 'Blue Team',
    focus:
      'Análisis pasivo DNS/SPF/MX, grafos OSINT en Maltego (Tesla, Microsoft, AWS), auditoría DAST OWASP ZAP en demo.testfire.net (234 URLs) y contramedidas de defensa en profundidad.',
    driveDeliverable: 'Andres Rozo_Talleres_Ciber.pdf (63 páginas) con soporte ZAP y Maltego.',
  },
];

export const FRAMEWORK_PHASES: FrameworkPhase[] = [
  {
    id: 'F1',
    number: '01',
    name: 'Preparación',
    shortTag: 'RoE, Alcance y Entorno Kali',
    summary:
      'Base legal y técnica: definir qué se puede auditar, firmar Reglas de Compromiso (RoE) y preparar Kali Linux con mínimo privilegio.',
    inputs: [
      'Solicitud formal de evaluación',
      'Lista preliminar de IPs, dominios o contenedores autorizados',
      'Contactos técnicos y canales de comunicación',
    ],
    activities: [
      'Delimitar alcance exacto y activos prohibidos',
      'Firmar Reglas de Compromiso (RoE), horarios permitidos y Stop Order',
      'Ejecutar setup_env.sh y aplicar permisos POSIX chmod 700 / 600 (FC-LAB-001)',
    ],
    outputs: [
      'Plan de auditoría autorizado',
      'Lista de activos autorizados y criterios de parada de emergencia',
    ],
    closureCriteria: 'Documento de autorización RoE firmado por el Responsable del Sistema y Coordinador.',
    relatedLabs: ['FC-LAB-001'],
  },
  {
    id: 'F2',
    number: '02',
    name: 'Prevención',
    shortTag: 'Línea Base y Factor Humano',
    summary:
      'Evaluar la postura defensiva inicial, controles existentes y vulnerabilidad del factor humano antes de las pruebas técnicas.',
    inputs: [
      'Plan aprobado y arquitectura de red conocida',
      'Inventario de tecnologías y políticas de seguridad actuales',
    ],
    activities: [
      'Diagnosticar firewalls, servicios activos y políticas de correo (SPF/DKIM/DMARC)',
      'Modelar vectores de ingeniería social: phishing por WhatsApp y USB baiting (FC-LAB-005)',
    ],
    outputs: ['Documento de línea base y diagnóstico inicial'],
    closureCriteria: 'Diagnóstico aprobado por el Analista Defensivo y el Coordinador de Evaluación.',
    relatedLabs: ['FC-LAB-005'],
  },
  {
    id: 'F3',
    number: '03',
    name: 'Identificación',
    shortTag: 'Pruebas Técnicas Controladas',
    summary:
      'Ejecución práctica y reproducible de los instrumentos técnicos del catálogo, sellando cada hallazgo con SHA-256.',
    inputs: [
      'Alcance aprobado y escenarios autorizados',
      'Herramientas listas (dig, HTTrack, Steghide, Maltego, Burp Suite, DVWA, OWASP ZAP)',
    ],
    activities: [
      'OSINT pasivo y DNS footprinting (FC-LAB-002, FC-LAB-006)',
      'Clonación web, interceptación proxy HTTP y escaneo DAST (FC-LAB-003, FC-LAB-007, FC-LAB-011)',
      'Análisis forense DFIR/esteganografía y pruebas adversariales en LLMs (FC-LAB-004, FC-LAB-008)',
      'Explotación controlada web en contenedor DVWA (FC-LAB-009)',
    ],
    outputs: [
      'Bitácora cronológica de comandos ejecutados',
      'Capturas de pantalla de hallazgos y paquete sellado con hashes SHA-256',
    ],
    closureCriteria: 'Registro íntegro de evidencias entregado al Custodio bajo cadena de custodia.',
    relatedLabs: [
      'FC-LAB-002',
      'FC-LAB-003',
      'FC-LAB-004',
      'FC-LAB-005',
      'FC-LAB-006',
      'FC-LAB-007',
      'FC-LAB-008',
      'FC-LAB-009',
      'FC-LAB-011',
    ],
  },
  {
    id: 'F4',
    number: '04',
    name: 'Análisis',
    shortTag: 'Depuración y Matriz de Riesgos',
    summary:
      'Descartar falsos positivos, correlacionar debilidades y calcular la severidad según probabilidad e impacto en el negocio.',
    inputs: [
      'Bitácoras de prueba y evidencias verificadas',
      'Respuestas observadas de los servidores y alertas de herramientas',
    ],
    activities: [
      'Depurar falsos positivos (ej. PNG en Steghide, grep inocuos, reglas pasivas de ZAP)',
      'Valorar probabilidad (1-4) e impacto (1-4) para asignar severidad Crítica, Alta, Media, Baja o Info',
      'Consolidar Matriz de Hallazgos y Riesgos (Anexo B)',
    ],
    outputs: ['Matriz de Hallazgos y Riesgos priorizada'],
    closureCriteria: 'Matriz revisada y consensuada entre Red Team y Blue Team bajo moderación Purple.',
    relatedLabs: ['FC-LAB-003', 'FC-LAB-004', 'FC-LAB-007', 'FC-LAB-008', 'FC-LAB-009', 'FC-LAB-011'],
  },
  {
    id: 'F5',
    number: '05',
    name: 'Mitigación',
    shortTag: 'Hardening y Parches Blue Team',
    summary:
      'Diseñar y aplicar soluciones técnicas reales: sentencias preparadas, cabeceras HTTP, DNSSEC, CDR y guardrails en IA.',
    inputs: ['Matriz de riesgos con hallazgos Críticos (<24h) y Altos (<7 días) priorizados'],
    activities: [
      'Firmar zonas DNS con DNSSEC y restringir SPF (-all) y AXFR',
      'Migrar secretos fuera de localStorage hacia cookies HttpOnly, Secure y SameSite',
      'Adoptar respuestas anti-enumeración homogéneas, Rate Limiting y MFA',
      'Implementar PDO, erradicar exec/shell_exec, desplegar CSP/XFO y Guardrails en backend (NeMo/Pydantic)',
    ],
    outputs: ['Registro de cambios aplicados, parches de código y guías de hardening (Anexo D)'],
    closureCriteria: 'Despliegue de parches y configuraciones confirmado por los administradores.',
    relatedLabs: ['FC-LAB-008', 'FC-LAB-009', 'FC-LAB-011'],
  },
  {
    id: 'F6',
    number: '06',
    name: 'Verificación',
    shortTag: 'Re-testing y Métricas 100%',
    summary:
      'Reejecutar exactamente las pruebas originales para comprobar que la brecha quedó cerrada sin romper la operación.',
    inputs: ['Sistema mitigado y casos de prueba originales de Fase 03'],
    activities: [
      'Reejecutar pruebas idénticas (Re-testing)',
      'Verificar no-regresión funcional para usuarios legítimos',
      'Calcular indicadores KPI del ciclo (100% cobertura, remediación y descarte de FP)',
    ],
    outputs: ['Informe Final de Efectividad con métricas cuantitativas'],
    closureCriteria: 'Visto bueno del Evaluador de Calidad y entrega formal al Responsable del Sistema.',
    relatedLabs: ['FC-LAB-001', 'FC-LAB-011'],
  },
];

export const ROLES_CATALOG: RoleDefinition[] = [
  {
    code: 'RS',
    name: 'Responsable del Sistema',
    description: 'Dueño del activo o autoridad académica (Docente Sergio Arley Puerto Moreno). Define límites y otorga aval legal.',
    deliverable: 'Autorización firmada y Reglas de Compromiso (RoE).',
    teamTag: 'Transversal',
  },
  {
    code: 'CE',
    name: 'Coordinador de Evaluación',
    description: 'Líder del proyecto. Planifica tiempos, asigna tareas y asegura cumplimiento del alcance.',
    deliverable: 'Plan de evaluación y actas de inicio/cierre.',
    teamTag: 'Purple Team',
  },
  {
    code: 'AO',
    name: 'Analista Ofensivo (Red Team)',
    description: 'Ejecuta pruebas técnicas: DNS, clonación web, Burp Suite, Prompt Injection, DVWA y escaneo DAST.',
    deliverable: 'Bitácora de comandos, PoCs y registros técnicos.',
    teamTag: 'Red Team',
  },
  {
    code: 'AD',
    name: 'Analista Defensivo (Blue Team)',
    description: 'Analiza alertas, mide línea base, propone mitigaciones y aplica parches de hardening.',
    deliverable: 'Diagnóstico de controles, parches y cambios aplicados.',
    teamTag: 'Blue Team',
  },
  {
    code: 'CP',
    name: 'Coordinador Purple Team',
    description: 'Integrador que articula Red Team y Blue Team, traduciendo hallazgos en matrices comprensibles.',
    deliverable: 'Matriz de Riesgos y Plan de Mitigación unificado.',
    teamTag: 'Purple Team',
  },
  {
    code: 'CUST',
    name: 'Custodio de Evidencias',
    description: 'Responsable de la cadena de custodia forense y generación de huellas SHA-256.',
    deliverable: 'Registro de cadena de custodia y catálogo de hashes.',
    teamTag: 'Forense',
  },
  {
    code: 'EV',
    name: 'Evaluador de Calidad',
    description: 'Auditor interno que valida consistencia metodológica y reproducibilidad al 100%.',
    deliverable: 'Rúbrica de validación metodológica y visto bueno.',
    teamTag: 'Blue Team',
  },
];

export const RACI_MATRIX: RaciRow[] = [
  { phase: '01. Preparación', RS: 'A', CE: 'R', AO: 'C', AD: 'C', CP: 'C', CUST: 'I', EV: 'I' },
  { phase: '02. Prevención', RS: 'I', CE: 'A', AO: 'I', AD: 'R', CP: 'C', CUST: 'I', EV: 'C' },
  { phase: '03. Identificación', RS: 'I', CE: 'A', AO: 'R', AD: 'C', CP: 'C', CUST: 'R', EV: 'I' },
  { phase: '04. Análisis', RS: 'I', CE: 'A', AO: 'C', AD: 'C', CP: 'R', CUST: 'C', EV: 'C' },
  { phase: '05. Mitigación', RS: 'I', CE: 'A', AO: 'I', AD: 'R', CP: 'C', CUST: 'I', EV: 'I' },
  { phase: '06. Verificación', RS: 'I', CE: 'A', AO: 'R', AD: 'C', CP: 'R', CUST: 'C', EV: 'R' },
];

export const TRACEABILITY_MATRIX: TraceabilityRow[] = [
  {
    instrument: 'FC-LAB-001',
    domain: 'D01',
    phase: '01',
    testCases: 'CP-01',
    finding: 'Configuración base',
    control: 'Permisos restrictivos POSIX (chmod 700/600)',
    verificationResult: 'Aprobado (Entorno blindado)',
  },
  {
    instrument: 'FC-LAB-002',
    domain: 'D02',
    phase: '03',
    testCases: 'CP-02',
    finding: 'H-01 (DNS sin DNSSEC)',
    control: 'Firma DNSSEC autoritativa (KSK/ZSK)',
    verificationResult: 'Aprobado (Mapeo completo)',
  },
  {
    instrument: 'FC-LAB-003',
    domain: 'D03',
    phase: '03/04',
    testCases: 'CP-03, CP-04',
    finding: 'H-02 (Inseguridad en frontend)',
    control: 'Erradicar localStorage, usar cookies seguras',
    verificationResult: 'Aprobado (Réplica en :8080)',
  },
  {
    instrument: 'FC-LAB-004',
    domain: 'D06',
    phase: '03/04',
    testCases: 'CP-05, CP-06, CP-07',
    finding: 'H-03 (Exfiltración encubierta)',
    control: 'Pasarelas DLP y re-compresión de imágenes (CDR)',
    verificationResult: 'Aprobado (Extracción confidencial.txt)',
  },
  {
    instrument: 'FC-LAB-005',
    domain: 'D05',
    phase: '02/03',
    testCases: 'CP-08',
    finding: 'H-04 (Ingeniería social)',
    control: 'Concientización, bloqueo USB y canales oficiales',
    verificationResult: 'Aprobado (10 factores modelados)',
  },
  {
    instrument: 'FC-LAB-006',
    domain: 'D02',
    phase: '03',
    testCases: 'CP-09',
    finding: 'H-05 (Exposición cloud pasiva)',
    control: 'Auditoría a proveedores cloud y ofuscación DNS',
    verificationResult: 'Aprobado (Grafo en Tesla/AWS)',
  },
  {
    instrument: 'FC-LAB-007',
    domain: 'D03/D04',
    phase: '03/04',
    testCases: 'CP-10',
    finding: 'H-06 (Fuerza bruta y enumeración)',
    control: 'Respuestas unificadas anti-enumeración y MFA',
    verificationResult: 'Aprobado (4 plataformas auditadas)',
  },
  {
    instrument: 'FC-LAB-008',
    domain: 'D08',
    phase: '03/05',
    testCases: 'CP-11, CP-12',
    finding: 'H-07, H-08 (Prompt Injection e IA)',
    control: 'Guardrails deterministas y Human-in-the-Loop',
    verificationResult: 'Aprobado (5 vectores OWASP LLM)',
  },
  {
    instrument: 'FC-LAB-009',
    domain: 'D03',
    phase: '03/05',
    testCases: 'CP-13, CP-14',
    finding: 'H-09, H-10 (SQLi, RCE, XSS en DVWA)',
    control: 'Sentencias preparadas PDO, CSP y cookies HttpOnly',
    verificationResult: 'Aprobado (Exploit contenido y parchado)',
  },
  {
    instrument: 'FC-LAB-011',
    domain: 'D03/D04',
    phase: '03/04',
    testCases: 'CP-19, CP-20',
    finding: 'H-15, H-16 (DAST, Headers y Cookies)',
    control: 'Headers CSP/XFO, cookies flags y DevSecOps CI/CD',
    verificationResult: 'Aprobado (Reporte DAST en DVWA/Spotify)',
  },
];

export const TECHNICAL_PROTOCOLS = [
  {
    title: 'Reglas de Compromiso (RoE)',
    items: [
      'Ventana Horaria de Pruebas: acordar días y horas específicas para no afectar operación.',
      'Direcciones IP de Origen: notificar IPs públicas autorizadas antes de iniciar escaneos.',
      'Stop Order (Parada Inmediata): detener si hay caída no programada, acceso accidental a datos reales no sintéticos o solicitud del docente/responsable.',
    ],
  },
  {
    title: 'Cadena de Custodia Forense',
    items: [
      'Generar huella criptográfica SHA-256 en el segundo cero (sha256sum archivo > hash.txt).',
      'Registrar en bitácora fecha, hora exacta, integrante ejecutor y herramienta usada.',
      'Marcar archivos fuente originales como solo lectura (chmod 400) y trabajar sobre copias.',
    ],
  },
  {
    title: 'Pruebas Web y Escaneo DAST',
    items: [
      'Aislamiento estricto en contenedores Docker locales o loopback (127.0.0.1).',
      'Limitar hilos concurrentes en Spider y Active Scanner de OWASP ZAP para evitar DoS.',
      'Cero persistencia residual: limpiar artefactos o registros temporales tras verificar la prueba.',
    ],
  },
];

export const LAB_TEMPLATE_MARKDOWN = `# Ficha Técnica Estandarizada — FC-LAB-XXX

| Campo | Detalle en el Proyecto |
| :--- | :--- |
| **Identificador** | **FC-LAB-XXX** |
| **Nombre de la Práctica** | [Título descriptivo y riguroso] |
| **Versión** | 1.0 (Mes y Año) |
| **Dominio Metodológico** | **[D01 a D08]** |
| **Fase de ÆVØID** | **[Fase 01 a 06]** |
| **Enfoque** | [Red Team / Blue Team / Purple Team / Forense] |
| **Estándar de Referencia** | **[OWASP Top 10 / OWASP LLM / NIST SP 800-115 / MITRE ATT&CK]** |
| **Equipo Ejecutor** | Maryori Barrera, Cristian Hernández, Sebastian Jurado, Julian Roa, Andres Rozo |
| **Docente** | Sergio Arley Puerto Moreno |

### 1. ¿Cuál es el objetivo de esta práctica?
[Describir qué se busca probar o demostrar técnicamente.]

### 2. ¿Cómo nos repartimos los roles?
* **Analista Ofensivo (Red Team):** [...]
* **Analista Defensivo (Blue Team):** [...]
* **Evaluador Purple Team:** [...]

### 3. Entorno de Trabajo y Despliegue / Autorización
* **Sistema Anfitrión / VM:** [...]
* **Objetivo (Target):** [...]
* **Límites (RoE):** [...]
* **Herramientas:** [...]

### 4. Procedimiento Técnico Paso a Paso y Resultados Obtenidos
[...]

### 5. Tabla Comparativa de Vulnerabilidades / Hallazgos Evaluados
[...]

### 6. Análisis Defensivo y Plan de Mitigación (Blue Team)
[...]

### 7. Criterio de Aceptación y Validación Metodológica en ÆVØID
[...]`;
