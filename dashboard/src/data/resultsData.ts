import type {
  KpiMetric,
  RiskFinding,
  SeverityLevel,
  TestCaseRow,
  TestEvaluationRow,
} from '../types/aevoid';

export const KPI_METRICS: KpiMetric[] = [
  {
    id: 'cobertura',
    name: 'Cobertura de Pruebas',
    definition: 'Proporción de casos de prueba ejecutados frente a los planificados en el alcance.',
    formula: '(11 / 11) × 100',
    valueLabel: '100%',
    numericPercent: 100,
    highlight: '11 de 11 pruebas técnicas ejecutadas en resultados consolidados',
  },
  {
    id: 'hallazgos',
    name: 'Hallazgos Catalogados (Anexo B)',
    definition: 'Vulnerabilidades y debilidades clasificadas por probabilidad e impacto.',
    formula: 'Conteo absoluto H-01 a H-16',
    valueLabel: '16',
    highlight: '4 Críticas · 7 Altas · 3 Medias · 2 Bajas',
  },
  {
    id: 'correcciones',
    name: 'Tasa de Correcciones Verificadas',
    definition: 'Porcentaje de medidas de remediación y controles defensivos formulados y auditados.',
    formula: '(11 / 11) × 100',
    valueLabel: '100%',
    numericPercent: 100,
    highlight: 'Controles Blue Team documentados por dominio D01–D08',
  },
  {
    id: 'falsos-positivos',
    name: 'Descarte de Falsos Positivos',
    definition: 'Eficacia descartando alertas engañosas (PNG en Steghide, grep inocuos, reglas pasivas ZAP).',
    formula: 'Descartes correctos / Total muestras × 100',
    valueLabel: '100%',
    numericPercent: 100,
    highlight: 'Descarte evidencia_C.png, falsos positivos HTTrack y depuración ZAP',
  },
  {
    id: 'reproducibilidad',
    name: 'Reproducibilidad Metodológica',
    definition: 'Capacidad de replicar procedimientos obteniendo resultados consistentes.',
    formula: 'Índice de consistencia técnica',
    valueLabel: '100%',
    numericPercent: 100,
    highlight: 'Contenedores Docker, comandos bash, proxies y guardrails documentados',
  },
];

export const SEVERITY_RUBRIC_SLAS: {
  severity: SeverityLevel;
  cvss: string;
  sla: string;
  description: string;
}[] = [
  {
    severity: 'Crítica',
    cvss: '9.0 – 10.0',
    sla: 'Inmediato (< 24 horas)',
    description:
      'Compromiso total del servidor, ejecución remota de comandos (RCE), lectura arbitraria de /etc/passwd o XSS Stored persistente.',
  },
  {
    severity: 'Alta',
    cvss: '7.0 – 8.9',
    sla: '< 7 días hábiles',
    description:
      'Exfiltración esteganográfica de documentos, phishing con impacto financiero, Prompt Injection con abuso de APIs o fallos CSRF / ausencia de CSP y flags HttpOnly.',
  },
  {
    severity: 'Media',
    cvss: '4.0 – 6.9',
    sla: '< 30 días hábiles',
    description:
      'Ausencia de firmas DNSSEC, exposición pasiva de infraestructura cloud/BGP o riesgo de fuerza bruta en login sin MFA ni rate limiting.',
  },
  {
    severity: 'Baja',
    cvss: '0.1 – 3.9',
    sla: 'Próximo ciclo de mantenimiento',
    description:
      'Persistencia local no recomendada en frontend (localStorage) o divulgación de banners y versiones en cabeceras Server/X-Powered-By.',
  },
  {
    severity: 'Informativa',
    cvss: '0.0',
    sla: 'Línea base operativa',
    description: 'Configuración y endurecimiento del entorno operativo base en Kali Linux (chmod 700/600).',
  },
];

export const RISK_MATRIX_GRID: {
  probability: 'Muy Alta' | 'Alta' | 'Media' | 'Baja';
  probScore: number;
  cells: {
    impact: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
    impactScore: number;
    severity: SeverityLevel;
  }[];
}[] = [
  {
    probability: 'Muy Alta',
    probScore: 4,
    cells: [
      { impact: 'Bajo', impactScore: 1, severity: 'Media' },
      { impact: 'Medio', impactScore: 2, severity: 'Alta' },
      { impact: 'Alto', impactScore: 3, severity: 'Crítica' },
      { impact: 'Crítico', impactScore: 4, severity: 'Crítica' },
    ],
  },
  {
    probability: 'Alta',
    probScore: 3,
    cells: [
      { impact: 'Bajo', impactScore: 1, severity: 'Media' },
      { impact: 'Medio', impactScore: 2, severity: 'Media' },
      { impact: 'Alto', impactScore: 3, severity: 'Alta' },
      { impact: 'Crítico', impactScore: 4, severity: 'Crítica' },
    ],
  },
  {
    probability: 'Media',
    probScore: 2,
    cells: [
      { impact: 'Bajo', impactScore: 1, severity: 'Baja' },
      { impact: 'Medio', impactScore: 2, severity: 'Media' },
      { impact: 'Alto', impactScore: 3, severity: 'Media' },
      { impact: 'Crítico', impactScore: 4, severity: 'Alta' },
    ],
  },
  {
    probability: 'Baja',
    probScore: 1,
    cells: [
      { impact: 'Bajo', impactScore: 1, severity: 'Informativa' },
      { impact: 'Medio', impactScore: 2, severity: 'Baja' },
      { impact: 'Alto', impactScore: 3, severity: 'Media' },
      { impact: 'Crítico', impactScore: 4, severity: 'Media' },
    ],
  },
];

export const TEST_EVALUATIONS: TestEvaluationRow[] = [
  {
    id: 'P01',
    name: 'Reconocimiento y Footprinting DNS',
    instrument: 'FC-LAB-002',
    labSlug: 'lab-02-dns',
    leads: 'Andrés Rozo & Cristian Hernández',
    expected: 'Mapeo de IPs, servidores NS, resolución inversa y validación DNSSEC en scanme.nmap.org.',
    obtained: 'IPv4 45.33.32.156, NS de Linode y PTR exacto. Ausencia de firmas DNSSEC y datos registrales en Dynadot.',
    severity: 'Media',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P02',
    name: 'Exposición y Auditoría de Secretos en Frontend',
    instrument: 'FC-LAB-003',
    labSlug: 'lab-03-httrack',
    leads: 'Sebastian Jurado & Maryori Barrera',
    expected: 'Reconstrucción del sitio web y detección de credenciales o endpoints sensibles en cliente.',
    obtained: 'Réplica local (localhost:8080) y Netlify. Grep descartó claves duras, pero expuso 100% UI y localStorage (STORE_KEY).',
    severity: 'Baja',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P03',
    name: 'Análisis Forense y Detección de Esteganografía',
    instrument: 'FC-LAB-004',
    labSlug: 'lab-04-esteganografia',
    leads: 'Julián Roa & Sebastian Jurado',
    expected: 'Discriminación de archivos alterados, detección de concatenación y extracción con Steghide.',
    obtained: 'evidencia_B.jpg con texto concatenado; evidencia_C.png descartada; confidencial.txt extraído de evidencia_A.jpeg. SHA-256 preservados.',
    severity: 'Alta',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P04',
    name: 'Acondicionamiento Operativo de Entorno Kali',
    instrument: 'FC-LAB-001',
    labSlug: 'lab-01-shell',
    leads: 'Maryori Barrera & Cristian Hernández',
    expected: 'Entorno POSIX con mínimo privilegio y estructura de contención para auditorías.',
    obtained: 'Directorios aislados con permisos 700/600, alias operativos y comandos de filtrado validados.',
    severity: 'Informativa',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P05',
    name: 'Modelado de Vectores de Ingeniería Social',
    instrument: 'FC-LAB-005',
    labSlug: 'lab-05-ingenieria-social',
    leads: 'Julián Roa & Maryori Barrera',
    expected: 'Análisis de tácticas psicológicas y defensas contra phishing y USB baiting.',
    obtained: 'Caracterización en escenario "Guía del Parcial" (WhatsApp + PDF simulado) y "No More Hidding" (USB). Políticas y bloqueo USB.',
    severity: 'Alta',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P06',
    name: 'Mapeo OSINT Pasivo de Infraestructura Cloud',
    instrument: 'FC-LAB-006',
    labSlug: 'lab-06-maltego',
    leads: 'Andrés Rozo & Sebastian Jurado',
    expected: 'Mapeo pasivo de dominio, MX, DNS, Netblocks y ASN sin tráfico intrusivo.',
    obtained: 'Topología híbrida tesla.com/microsoft.com: MX Microsoft 365, NS Akamai/UltraDNS, Netblock 8.45.124.0/24 y AWS (ASN 16509).',
    severity: 'Media',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P07',
    name: 'Interceptación de Login y Prevención de Enumeración',
    instrument: 'FC-LAB-007',
    labSlug: 'lab-07-burp',
    leads: 'Julián Roa & Andrés Rozo',
    expected: 'Manipulación HTTP en formularios de login y evaluación de respuestas de error.',
    obtained: 'Comparativa de 4 plataformas (Juice Shop, Q10, PortSwigger, SAC USTA). Uso de POST y respuestas homogéneas; Base64 en SAC.',
    severity: 'Media',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P08',
    name: 'Robustez ante Prompt Injection y Exceso de Agencia en IA',
    instrument: 'FC-LAB-008',
    labSlug: 'lab-08-prompt-injection',
    leads: 'Sebastian Jurado & Cristian Hernández',
    expected: 'Evaluación de frontera control vs datos en LLMs, escape semántico y fuga de System Prompt.',
    obtained: '5 vectores OWASP LLM (LLM01, LLM02, LLM05, LLM06, LLM07), técnicas Base64/multilingüe y arquitectura Guardrails + Pydantic + HITL.',
    severity: 'Alta',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P09',
    name: 'Explotación de Fallas Críticas Web en DVWA',
    instrument: 'FC-LAB-009',
    labSlug: 'lab-09-dvwa',
    leads: 'Sebastian Jurado & Maryori Barrera',
    expected: 'Evaluación de Brute Force, SQLi, Command Injection (RCE) y XSS Reflected/Stored.',
    obtained: 'Volcado BD con SQLi, ejecución www-data y lectura de /etc/passwd, XSS Stored en Guestbook. Defensas PDO, CSP y HttpOnly.',
    severity: 'Crítica',
    status: 'Ejecutada y Aprobada',
  },
  {
    id: 'P10',
    name: 'Evaluación Consolidada Avanzada (Registro Resultados)',
    instrument: 'Registro Consolidado P10 (Ficha omitida en catálogo)',
    labSlug: 'lab-10-dvwa-avanzado',
    leads: 'Sebastian Jurado & Cristian Hernández',
    expected: 'Evaluación consolidada de controles anti-CSRF, carga de archivos, inclusión de rutas y Blind SQLi.',
    obtained: 'Hallazgos consolidados H-11 a H-14 y controles Blue Team documentados en Anexos A–D.',
    severity: 'Crítica',
    status: 'Ejecutada (Ficha omitida)',
  },
  {
    id: 'P11',
    name: 'Escaneo DAST, Interceptación Proxy y Reportes con OWASP ZAP',
    instrument: 'FC-LAB-011',
    labSlug: 'lab-11-owasp-zap',
    leads: 'Julián Roa & Andrés Rozo',
    expected: 'Análisis dinámico automatizado en DVWA y portales externos vía proxy Firefox.',
    obtained: 'Detección OWASP A05 (falta CSP, XFO, XCTO), cookies sin HttpOnly/SameSite, 1.509 peticiones / 12 alertas y 234 URLs en testfire.',
    severity: 'Alta',
    status: 'Ejecutada y Aprobada',
  },
];

export const TEST_CASES_MATRIX: TestCaseRow[] = [
  { code: 'CP-01', domain: 'D01', phase: '01', tool: 'Bash / Kali', objective: 'Validar entorno y permisos', params: 'chmod 700 auditoria/, grep, pipes', successCriteria: 'Estructura segura y scripts operativos' },
  { code: 'CP-02', domain: 'D02', phase: '03', tool: 'nslookup / dig', objective: 'Mapeo de zona y DNSSEC', params: 'nslookup -type=ns scanme.nmap.org, dig +trace +dnssec', successCriteria: 'Identificación de IP, NS y estado DNSSEC' },
  { code: 'CP-03', domain: 'D03', phase: '03', tool: 'HTTrack', objective: 'Reconstrucción web y clonación', params: 'httrack https://... -O . -%v', successCriteria: 'Réplica funcional idéntica en localhost:8080' },
  { code: 'CP-04', domain: 'D03', phase: '04', tool: 'grep / GNU', objective: 'Búsqueda de secretos frontend', params: 'grep -E -i -rn "api_key|token|secret" .', successCriteria: 'Descarte de claves duras y hallazgo de localStorage' },
  { code: 'CP-05', domain: 'D06', phase: '03', tool: 'sha256sum', objective: 'Preservación forense y custodia', params: 'sha256sum evidencias/* > hashes.txt', successCriteria: 'Generación de huellas criptográficas inmutables' },
  { code: 'CP-06', domain: 'D06', phase: '03', tool: 'strings', objective: 'Detección de concatenación', params: 'strings evidencia_B.jpg | tail -n 25', successCriteria: 'Localización de mensaje en claro tras fin de JPEG' },
  { code: 'CP-07', domain: 'D06', phase: '03', tool: 'Steghide', objective: 'Extracción de canal encubierto', params: 'steghide extract -sf evidencia_A.jpeg', successCriteria: 'Extracción exitosa del fichero confidencial.txt' },
  { code: 'CP-08', domain: 'D05', phase: '02', tool: 'Matriz Vectores', objective: 'Modelado de ingeniería social', params: 'Análisis de pretextos en WhatsApp y USB', successCriteria: 'Identificación de factores de vulnerabilidad' },
  { code: 'CP-09', domain: 'D02', phase: '03', tool: 'Maltego', objective: 'Mapeo OSINT pasivo', params: 'Transforms: To MX, To NS, To Netblock, To ASN', successCriteria: 'Grafo circular de infraestructura en nube (AWS/Azure)' },
  { code: 'CP-10', domain: 'D03/D04', phase: '03', tool: 'Burp Suite', objective: 'Interceptación de login', params: 'Proxy HTTP + Repeater (POST login)', successCriteria: 'Comparación de 4 esquemas y prevención enumeración' },
  { code: 'CP-11', domain: 'D08', phase: '03', tool: 'OWASP LLM Suite', objective: 'Escape semántico y fuga de System Prompt', params: 'Prompts adversariales, tags XML falsos, evasión Base64', successCriteria: 'Evaluación de frontera de control vs datos y tasa ISR' },
  { code: 'CP-12', domain: 'D08', phase: '05', tool: 'Guardrails / Pydantic', objective: 'Contención de exceso de agencia en APIs', params: 'Schemas deterministas, scopes solo lectura, Human-in-the-Loop', successCriteria: 'Bloqueo determinista en backend y confirmación en UI' },
  { code: 'CP-13', domain: 'D03', phase: '03', tool: 'DVWA (SQLi & RCE)', objective: 'Evaluación de inyecciones SQL y comandos del SO', params: "Payloads 1' OR '1'='1 y ; whoami ; cat /etc/passwd", successCriteria: 'Volcado de BD y lectura de /etc/passwd en entorno aislado' },
  { code: 'CP-14', domain: 'D03', phase: '03', tool: 'DVWA (XSS Reflected/Stored)', objective: 'Inyección de scripts y persistencia en base de datos', params: "<script>alert(document.cookie)</script> en inputs y Guestbook", successCriteria: 'Ejecución de scripts en cliente y exposición de cookies' },
  { code: 'CP-15', domain: 'D03', phase: '03', tool: 'DVWA (CSRF)', objective: 'Cambio de clave sin token anti-CSRF', params: 'GET /vulnerabilities/csrf/ con parámetros directos', successCriteria: 'Modificación sin comprobación de origen ni re-autenticación' },
  { code: 'CP-16', domain: 'D03', phase: '03', tool: 'DVWA (File Upload)', objective: 'Validación de subida de archivos ejecutables', params: 'Subida controlada a /hackable/uploads/ en Docker local', successCriteria: 'Detección de falta de validación MIME/extensión' },
  { code: 'CP-17', domain: 'D03', phase: '03', tool: 'DVWA (LFI)', objective: 'Evaluación de inclusión local de archivos', params: 'Parámetro page con rutas relativas o absolutas', successCriteria: 'Lectura de cuentas de Linux y validación de path traversal' },
  { code: 'CP-18', domain: 'D03', phase: '03', tool: 'DVWA (Blind SQLi)', objective: 'Inferencia lógica booleana de metadatos', params: "1' AND 1=2 # vs 1' AND database()='dvwa' # y SUBSTRING()", successCriteria: 'Identificación de respuesta true/false y nombre de BD' },
  { code: 'CP-19', domain: 'D03/D04', phase: '03', tool: 'OWASP ZAP (Proxy & Spider)', objective: 'Interceptación HTTP y rastreo automático de rutas', params: 'Proxy Firefox 127.0.0.1:8090 + Spider http://127.0.0.1:8080', successCriteria: 'Mapeo del árbol de sitios y captura cronológica' },
  { code: 'CP-20', domain: 'D03/D04', phase: '03/04', tool: 'OWASP ZAP (Active Scan & DAST)', objective: 'Auditoría DAST y análisis de cabeceras/cookies', params: 'Automated Scan en DVWA y login externo (Spotify)', successCriteria: 'Detección de fallas A05 y exportación reporte HTML' },
];

export const RISK_FINDINGS: RiskFinding[] = [
  { id: 'H-01', asset: 'Zona DNS pública (scanme.nmap.org)', vulnerability: 'Ausencia de firmas criptográficas DNSSEC en la zona autoritativa.', probability: 'Media', impact: 'Alto', severity: 'Media', treatment: 'Implementar firma DNSSEC mediante KSK/ZSK y delegar registro DS.' },
  { id: 'H-02', asset: 'Aplicación Web Netlify', vulnerability: 'Almacenamiento persistente de identificadores en localStorage (STORE_KEY).', probability: 'Alta', impact: 'Medio', severity: 'Baja', treatment: 'Migrar persistencia de estados sensibles a cookies HttpOnly y Secure.' },
  { id: 'H-03', asset: 'Repositorio multimedia / Exfiltración', vulnerability: 'Fuga de datos clasificados mediante canal encubierto esteganográfico en JPG.', probability: 'Baja', impact: 'Crítico', severity: 'Alta', treatment: 'Desplegar soluciones DLP en pasarelas de red y re-compresión de imágenes (CDR).' },
  { id: 'H-04', asset: 'Canal de mensajería (WhatsApp)', vulnerability: 'Vulnerabilidad humana al engaño por pretexto académico y falsificación de identidad.', probability: 'Alta', impact: 'Alto', severity: 'Alta', treatment: 'Capacitación periódica y políticas institucionales de canales oficiales.' },
  { id: 'H-05', asset: 'Perímetro corporativo (tesla.com)', vulnerability: 'Exposición pública pasiva de topología cloud, rangos IP y proveedores en DNS/BGP.', probability: 'Alta', impact: 'Medio', severity: 'Media', treatment: 'Ocultamiento de servidores no esenciales y auditoría a proveedores externos.' },
  { id: 'H-06', asset: 'Formularios Web de Autenticación', vulnerability: 'Riesgo de ataque de fuerza bruta distribuida en portales con payload ofuscado en Base64.', probability: 'Media', impact: 'Alto', severity: 'Media', treatment: 'Implementación de rate-limiting estricto y Autenticación Multifactor (MFA).' },
  { id: 'H-07', asset: 'Aplicación con IA / LLM', vulnerability: 'Vulnerabilidad a Prompt Injection y fuga del System Prompt (LLM07) por falta de separación control/input.', probability: 'Alta', impact: 'Alto', severity: 'Alta', treatment: 'Encapsular entradas en etiquetas inmutables, asumir prompt público y desplegar Guardrails.' },
  { id: 'H-08', asset: 'APIs y Agentes con IA', vulnerability: 'Exceso de agencia y Tool Abuse (LLM06) con riesgo de mutaciones o exfiltración vía APIs conectadas.', probability: 'Media', impact: 'Crítico', severity: 'Alta', treatment: 'Limitar APIs a solo lectura, usar tokens de usuario final y exigir Human-in-the-Loop.' },
  { id: 'H-09', asset: 'Servidor Web / API de Ping', vulnerability: 'Ejecución Remota de Comandos (RCE) por concatenación directa de parámetros en shell Linux.', probability: 'Alta', impact: 'Crítico', severity: 'Crítica', treatment: 'Erradicar funciones exec/system, validar con filter_var y restringir privilegios www-data.' },
  { id: 'H-10', asset: 'Módulos Web de Entrada (DVWA)', vulnerability: 'Inyección SQL y XSS Almacenado persistente en BD con capacidad de robo de cookies de sesión.', probability: 'Alta', impact: 'Crítico', severity: 'Crítica', treatment: 'Usar Sentencias Preparadas (PDO), codificación htmlspecialchars y cookies HttpOnly.' },
  { id: 'H-11', asset: 'Servidor Web / File Upload (DVWA)', vulnerability: 'Subida irrestricta de archivos ejecutables permitiendo ejecución remota como www-data.', probability: 'Alta', impact: 'Crítico', severity: 'Crítica', treatment: 'Implementar whitelist de extensiones, verificación MIME real, renombrado UUID y deshabilitar scripts en uploads.' },
  { id: 'H-12', asset: 'Módulo de Cambio de Clave (DVWA)', vulnerability: 'Cross-Site Request Forgery (CSRF) por tramitación en GET y carencia de tokens anti-CSRF aleatorios.', probability: 'Alta', impact: 'Alto', severity: 'Alta', treatment: 'Implementar tokens CSRF por sesión, usar POST exclusivo y cookies SameSite=Strict.' },
  { id: 'H-13', asset: 'Parámetros de Inclusión URL (DVWA)', vulnerability: 'Inclusión Local de Archivos (LFI) por falta de validación de rutas relativas y absolutas.', probability: 'Alta', impact: 'Crítico', severity: 'Crítica', treatment: 'Validar rutas contra lista blanca rígida y usar basename() / realpath().' },
  { id: 'H-14', asset: 'Módulo de Búsqueda / Parámetro ID (DVWA)', vulnerability: 'Inyección SQL a ciegas (Blind SQLi booleana) con inferencia de metadatos de BD.', probability: 'Media', impact: 'Crítico', severity: 'Alta', treatment: 'Parametrizar todas las consultas con PDO y unificar respuestas ante búsquedas.' },
  { id: 'H-15', asset: 'Servidores Web / Aplicaciones Auditadas', vulnerability: 'Ausencia de cabeceras HTTP defensivas (CSP, X-Frame-Options, X-Content-Type-Options) y cookies sin flags.', probability: 'Alta', impact: 'Alto', severity: 'Alta', treatment: 'Desplegar cabeceras en servidor/proxy y forzar HttpOnly, Secure y SameSite.' },
  { id: 'H-16', asset: 'Servidor Web / Banners de Respuesta', vulnerability: 'Divulgación de versiones exactas de servidor y módulos en cabeceras Server y X-Powered-By.', probability: 'Alta', impact: 'Bajo', severity: 'Baja', treatment: 'Configurar ServerTokens Prod, ServerSignature Off y expose_php = Off.' },
];
