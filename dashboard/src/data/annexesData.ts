import type { EvidenceGroup, MitigationDomain } from '../types/aevoid';

export const EVIDENCE_GROUPS: EvidenceGroup[] = [
  {
    labId: 'FC-LAB-001',
    labTitle: 'Comandos Shell y Kali Linux',
    slug: 'lab-01-shell',
    items: [
      { code: 'C-01.1', description: 'Verificación de conectividad inicial y navegación básica (pwd, ls -la, cd).' },
      { code: 'C-01.2', description: 'Creación de directorios de auditoría y permisos chmod 700 / 600.' },
      { code: 'C-01.3', description: 'Filtrado de flujos y cadenas con tuberías (cat, head, tail, grep).' },
      { code: 'C-01.4', description: 'Búsquedas recursivas y automatización básica con scripts shell en Kali.' },
    ],
  },
  {
    labId: 'FC-LAB-002',
    labTitle: 'DNS Footprinting y Reconocimiento',
    slug: 'lab-02-dns',
    items: [
      { code: 'C-02.1', description: 'Conectividad hacia Internet verificada mediante ráfaga ICMP (ping 8.8.8.8).' },
      { code: 'C-02.2', description: 'Consulta directa nslookup scanme.nmap.org mostrando IPv4 (45.33.32.156) e IPv6.' },
      { code: 'C-02.3', description: 'Identificación de servidores NS delegados en Linode (nslookup -type=ns).' },
      { code: 'C-02.4', description: 'Resolución inversa PTR confirmando asociación de la IP con scanme.nmap.org.' },
      { code: 'C-02.5', description: 'Consulta estructurada con dig exhibiendo valores TTL y servidores de respuesta.' },
      { code: 'C-02.6', description: 'Superación de timeout forzando consulta al resolver de Google (dig @8.8.8.8).' },
      { code: 'C-02.7', description: 'Doble comprobación dig +dnssec confirmando ausencia de firma digital.' },
      { code: 'C-02.8', description: 'Consulta WHOIS en Dynadot documentando registrador, fechas y estado DNSSEC: unsigned.' },
    ],
  },
  {
    labId: 'FC-LAB-003',
    labTitle: 'Clonación Web e Inspección de Secretos',
    slug: 'lab-03-httrack',
    items: [
      { code: 'C-03.1', description: 'Sitio web en producción funcional en https://lab3-httrack-7958.netlify.app/.' },
      { code: 'C-03.2', description: 'Instalación y comprobación de versión de HTTrack 3.49-14 en terminal.' },
      { code: 'C-03.3', description: 'Descarga automatizada y árbol de ficheros descargados con tree.' },
      { code: 'C-03.4', description: 'Despliegue de servidor espejo local con python3 -m http.server 8080.' },
      { code: 'C-03.5', description: 'Comparativa lado a lado (Sitio original vs. Réplica local en puerto 8080).' },
      { code: 'C-03.6', description: 'Búsqueda unificada con grep y análisis de variables en localStorage (STORE_KEY).' },
      { code: 'C-03.7', description: 'Réplica cruzada del sitio de Sebastián Jurado (https://lab3sebastianjurado.netlify.app/).' },
    ],
  },
  {
    labId: 'FC-LAB-004',
    labTitle: 'Forense Digital y Esteganografía',
    slug: 'lab-04-esteganografia',
    items: [
      { code: 'C-04.1', description: 'Aislamiento forense en /reto_esteganografia_roa (evidencias/, reportes/, extraidos/).' },
      { code: 'C-04.2', description: 'Registro criptográfico SHA-256 en hashes.txt y verificación con file.' },
      { code: 'C-04.3', description: 'Extracción de metadatos EXIF con exiftool en evidencia_A.jpeg, evidencia_B.jpg y evidencia_C.png.' },
      { code: 'C-04.4', description: 'Detección concluyente de concatenación de bytes en evidencia_B.jpg con strings.' },
      { code: 'C-04.5', description: 'Inspección estructural con binwalk verificando firmas binarias de compresión.' },
      { code: 'C-04.6', description: 'Descarte técnico en evidencia_C.png (formato PNG no soportado por Steghide).' },
      { code: 'C-04.7', description: 'Ejecución de steghide info sobre evidencia_A.jpeg descubriendo confidencial.txt (409 bytes).' },
      { code: 'C-04.8', description: 'Extracción exitosa con steghide extract y lectura de confidencial.txt.' },
    ],
  },
  {
    labId: 'FC-LAB-005',
    labTitle: 'Ingeniería Social y Factor Humano',
    slug: 'lab-05-ingenieria-social',
    items: [
      { code: 'C-05.1', description: 'Modelado del escenario físico "No More Hidding" (USB baiting).' },
      { code: 'C-05.2', description: 'Análisis del escenario digital "Guía del Parcial" (PDF falso USTA_SimulacionV2_instalacion_2026.pdf en WhatsApp).' },
      { code: 'C-05.3', description: 'Matriz formal de caracterización de vectores de persuasión.' },
      { code: 'C-05.4', description: 'Formulación de políticas de prevención y concientización institucional.' },
    ],
  },
  {
    labId: 'FC-LAB-006',
    labTitle: 'Reconocimiento OSINT con Maltego',
    slug: 'lab-06-maltego',
    items: [
      { code: 'C-06.1', description: 'Grafo general de infraestructura de tesla.com con entidades descubiertas.' },
      { code: 'C-06.2', description: 'Resolución MX hacia tesla-com.mail.protection.outlook.com (prioridad 10).' },
      { code: 'C-06.3', description: 'Detección de servidores autoritativos NS en Akamai y UltraDNS.' },
      { code: 'C-06.4', description: 'Identificación de netblock 8.45.124.0/24 desde IP 8.45.124.203.' },
      { code: 'C-06.5', description: 'Transformación To AS Number arrojando ASN 16509 (Amazon AWS).' },
      { code: 'C-06.6', description: 'Conversión de grafo a disposición circular concéntrica.' },
      { code: 'C-06.7', description: 'Nodo de contacto institucional extraído (domain@teslamotors.com).' },
      { code: 'C-06.8', description: 'Grafos comparativos para microsoft.com y santototunja.edu.co.' },
    ],
  },
  {
    labId: 'FC-LAB-007',
    labTitle: 'Interceptación y Análisis Web con Burp Suite',
    slug: 'lab-07-burp',
    items: [
      { code: 'C-07.1', description: 'Configuración de Burp Suite Proxy e Intercept en navegador Chromium.' },
      { code: 'C-07.2', description: 'Interceptación POST en OWASP Juice Shop con payload JSON plano.' },
      { code: 'C-07.3', description: 'Envío de solicitud a Repeater y modificación arbitraria de contraseña.' },
      { code: 'C-07.4', description: 'Recepción HTTP 401 Unauthorized con mensaje genérico de rechazo.' },
      { code: 'C-07.5', description: 'Interceptación de UVirtual (Q10) en formato application/x-www-form-urlencoded.' },
      { code: 'C-07.6', description: 'Interceptación de PortSwigger Academy documentando CSRF, OAuth y reCAPTCHA.' },
      { code: 'C-07.7', description: 'Interceptación de SAC USTA con endpoint /fetch/{token} y Base64.' },
      { code: 'C-07.8', description: 'Comparativa de respuestas unificadas anti-enumeración.' },
    ],
  },
  {
    labId: 'FC-LAB-008',
    labTitle: 'Seguridad de IA y Prompt Injection',
    slug: 'lab-08-prompt-injection',
    items: [
      { code: 'C-08.1', description: 'Vectores de escape semántico mediante tags XML falsos para romper jerarquía.' },
      { code: 'C-08.2', description: 'Simulación de Tool Abuse (LLM06) invocando funciones sensibles.' },
      { code: 'C-08.3', description: 'Evaluación de evasión con Base64, sinónimos y traducción multilingüe (LLM05).' },
      { code: 'C-08.4', description: 'Pruebas de extracción de contexto System Prompt Leakage (LLM07).' },
      { code: 'C-08.5', description: 'Arquitectura de contención: encapsulamiento, Guardrails (NeMo/Pydantic) y Human-in-the-Loop.' },
    ],
  },
  {
    labId: 'FC-LAB-009',
    labTitle: 'Explotación y Auditoría Web en DVWA',
    slug: 'lab-09-dvwa',
    items: [
      { code: 'C-09.1', description: 'Despliegue Docker de DVWA en puerto 8080 y nivel Security: Low.' },
      { code: 'C-09.2', description: 'Módulo Brute Force autenticando sin tasa ni bloqueo.' },
      { code: 'C-09.3', description: "SQL Injection con entrada legítima 1, alteración 1' OR '1'='1 y error con 1'." },
      { code: 'C-09.4', description: 'Command Injection revelando usuario www-data, ruta pwd y listado ls.' },
      { code: 'C-09.5', description: 'Lectura de /etc/passwd y metadatos kernel uname -a en entorno aislado.' },
      { code: 'C-09.6', description: 'XSS Reflejado alterando DOM y exponiendo document.cookie.' },
      { code: 'C-09.7', description: 'XSS Almacenado en Guestbook con persistencia en base de datos.' },
    ],
  },
  {
    labId: 'Anexo C — P10',
    labTitle: 'Evidencias Consolidadas P10 (Anexo C)',
    slug: 'anexo-p10',
    items: [
      { code: 'C-10.1 – C-10.2', description: 'Validación CSRF en cambio de contraseña sin token de sincronización.' },
      { code: 'C-10.3 – C-10.9', description: 'Pruebas de carga en File Upload y verificación de privilegios www-data en entorno aislado.' },
      { code: 'C-10.10 – C-10.12', description: 'Pruebas de Directory Traversal (LFI) en inclusión de rutas locales.' },
      { code: 'C-10.13 – C-10.15', description: "Blind SQLi booleana comparando respuestas true/false e inferencia con SUBSTRING()." },
    ],
  },
  {
    labId: 'FC-LAB-011',
    labTitle: 'Escaneo Automatizado DAST con OWASP ZAP',
    slug: 'lab-11-owasp-zap',
    items: [
      { code: 'C-11.1', description: 'Verificación de OWASP ZAP en Kali Linux y contenedor DVWA en 127.0.0.1:8080.' },
      { code: 'C-11.2', description: 'Proxy manual Firefox en 127.0.0.1:8090 sincronizado con ZAP.' },
      { code: 'C-11.3', description: 'Automated Scan y rastreo web con ZAP Spider sobre aplicación local.' },
      { code: 'C-11.4', description: 'Historial de peticiones GET/POST, tiempos de respuesta y códigos HTTP.' },
      { code: 'C-11.5', description: 'Árbol de Alertas en DVWA (falta CSP, X-Frame-Options, HttpOnly).' },
      { code: 'C-11.6', description: 'Exportación de reporte DAST formal en HTML estructurado.' },
      { code: 'C-11.7 – C-11.9', description: 'Escaneo sobre URLs externas de autenticación con "No proxy" en Firefox.' },
      { code: 'C-11.10', description: 'Escaneo pasivo y mapeo sobre accounts.spotify.com.' },
      { code: 'C-11.11', description: 'Resumen comparativo de alertas clasificado por severidad y OWASP Top 10.' },
    ],
  },
];

export const DRIVE_SOURCES = [
  {
    author: 'Andrés José Rozo Castellanos',
    artifact: 'Andres Rozo_Talleres_Ciber.pdf',
    scope: '63 páginas: escaneos ZAP, grafos Maltego y talleres 6 a 11.',
  },
  {
    author: 'Julián Andrés Roa Lizcano',
    artifact: 'Consolidado_Laboratorios_Julian_Roa.pdf',
    scope: '37 páginas: DAST activo de 1.509 peticiones en ZAP, reto esteganográfico y talleres 6 a 11.',
  },
  {
    author: 'Maryori Brigith Barrera Ascanio',
    artifact: 'InformesMaryori/ (11 archivos .docx)',
    scope: 'Informes formales individuales cubriendo laboratorios del 1 al 11.',
  },
  {
    author: 'Johan Sebastian Jurado Hernández (ProSebJu)',
    artifact: 'ProSebJu/ (11 informes .docx y .pdf)',
    scope: 'Despliegues en Netlify, Kali Linux y laboratorios web.',
  },
  {
    author: 'Cristian Emanuel Hernández Araque',
    artifact: 'Repositorio Git ÆVØID (Markdown + UML)',
    scope: 'Fichas consolidadas en Markdown, diagramación UML vectorial SVG y arquitectura del framework.',
  },
];

export const MITIGATION_DOMAINS: MitigationDomain[] = [
  {
    id: 'D02',
    domainLabel: 'Dominio D02: DNS y Superficie Externa',
    labsRef: 'FC-LAB-002 & FC-LAB-006',
    controls: [
      {
        title: 'Despliegue de DNSSEC y Validación',
        details: [
          'Generar par de claves KSK (Key Signing Key) y ZSK (Zone Signing Key) en el servidor autoritativo.',
          'Firmar zona autoritativa y delegar registro DS hacia el registrador (ej. Dynadot).',
          'Validar cadena de confianza con dig @8.8.8.8 dominio.com +dnssec.',
        ],
      },
      {
        title: 'Restricción AXFR y Políticas de Correo (SPF / DMARC)',
        details: [
          'Permitir transferencias de zona AXFR únicamente hacia IPs de servidores secundarios autorizados.',
          'Migrar SPF de modificador permisivo (~all) a estricto (-all).',
          'Configurar DMARC con política obligatoria de rechazo (v=DMARC1; p=reject).',
        ],
        codeSnippet: {
          language: 'bind',
          caption: 'Restricción de transferencia de zona en BIND',
          code: 'allow-transfer { 192.0.2.10; 198.51.100.20; };',
        },
      },
    ],
  },
  {
    id: 'D03-D04-AUTH',
    domainLabel: 'Dominio D03 & D04: Frontend, Login y Cabeceras DAST',
    labsRef: 'FC-LAB-003, FC-LAB-007 & FC-LAB-011',
    controls: [
      {
        title: 'Erradicación de Secretos en Frontend y Cookies Seguras',
        details: [
          'Prohibir almacenamiento de tokens o identidades sensibles en localStorage/sessionStorage (STORE_KEY).',
          'Emitir cookies de sesión con banderas HttpOnly, Secure y SameSite=Strict.',
        ],
        codeSnippet: {
          language: 'ini',
          caption: 'Hardening de cookies de sesión en php.ini',
          code: `session.cookie_httponly = 1
session.cookie_secure = 1
session.cookie_samesite = "Lax"`,
        },
      },
      {
        title: 'Anti-Enumeración, Rate Limiting, MFA y HSTS',
        details: [
          'Mantener respuestas genéricas unificadas ("Usuario o clave incorrectos") en tiempo constante.',
          'Configurar límite máximo de 5 intentos erróneos por IP cada 15 minutos + MFA (TOTP / FIDO2).',
          'No confiar en Base64 como cifrado: forzar TLS 1.3 con HSTS.',
        ],
        codeSnippet: {
          language: 'http',
          caption: 'Cabecera HTTP Strict-Transport-Security',
          code: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
        },
      },
      {
        title: 'Cabeceras de Seguridad HTTP, Supresión de Banners y DevSecOps',
        details: [
          'Desplegar X-Frame-Options, X-Content-Type-Options, CSP, HSTS y Referrer-Policy en Nginx/Apache.',
          'Ocultar versiones exactas de Apache y PHP con ServerTokens Prod, ServerSignature Off y expose_php = Off.',
          'Integrar owasp/zap2docker-weekly (zap-baseline.py) en CI/CD por cada Pull Request.',
        ],
        codeSnippet: {
          language: 'nginx',
          caption: 'Cabeceras defensivas en Nginx',
          code: `add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;`,
        },
      },
    ],
  },
  {
    id: 'D03-WEB-REMEDIATION',
    domainLabel: 'Dominio D03: Remediación OWASP (SQLi, RCE, XSS, CSRF, Uploads, LFI)',
    labsRef: 'FC-LAB-009 & Anexo D',
    controls: [
      {
        title: 'Sentencias Preparadas PDO y Erradicación de Shell',
        details: [
          'Sustituir concatenaciones SQL por consultas parametrizadas PDO o MySQLi y mínimo privilegio en BD.',
          'Prohibir funciones system(), exec(), shell_exec(), passthru(); validar IPs con filter_var($ip, FILTER_VALIDATE_IP).',
          'Aislar contenedores con rootfs de solo lectura y usuario sin privilegios (www-data).',
        ],
        codeSnippet: {
          language: 'php',
          caption: 'Consulta SQL parametrizada segura con PDO',
          code: `$stmt = $pdo->prepare('SELECT first_name, last_name FROM users WHERE user_id = :id');
$stmt->execute(['id' => $id]);
$user = $stmt->fetch();`,
        },
      },
      {
        title: 'Mitigación de XSS, CSRF, File Upload y LFI',
        details: [
          'XSS: codificación contextual htmlspecialchars($string, ENT_QUOTES, "UTF-8") + CSP + HttpOnly.',
          'CSRF: Synchronizer Token Pattern con random_bytes(32), hash_equals(), método POST exclusivo y re-autenticación.',
          'File Upload: whitelist estricta (.jpg, .png, .pdf), verificación MIME con finfo_file(), UUID, ruta fuera de webroot y php_flag engine off.',
          'LFI: listas blancas estáticas de vistas, basename() y verificación canónica con realpath().',
        ],
      },
    ],
  },
  {
    id: 'D05-D06',
    domainLabel: 'Dominio D05 & D06: Factor Humano y Forense CDR',
    labsRef: 'FC-LAB-004 & FC-LAB-005',
    controls: [
      {
        title: 'Controles Físicos y Canales Oficiales (Ingeniería Social)',
        details: [
          'Bloquear puertos USB no autorizados con Directivas de Grupo (GPO) o usbguard en Linux.',
          'Prohibir envío de software o guías académicas por WhatsApp; validar siempre en Moodle/Teams institucional.',
          'Ejecutar campañas continuas de phishing simulado y monitoreo EDR de procesos hijos anómalos.',
        ],
      },
      {
        title: 'Sanitización CDR y Eliminación de Metadatos EXIF',
        details: [
          'Ejecutar stripping automático de metadatos EXIF en proxies y pasarelas de correo.',
          'Re-codificar imágenes JPEG/PNG (Content Disarm & Reconstruction) para destruir canales ocultos LSB.',
          'Inspeccionar discordancias MIME/extensión y tamaños anómalos en flujos salientes.',
        ],
      },
    ],
  },
  {
    id: 'D08-AI',
    domainLabel: 'Dominio D08: Seguridad en Inteligencia Artificial y LLMs',
    labsRef: 'FC-LAB-008',
    controls: [
      {
        title: 'Separación Control vs. Datos y Guardrails Deterministas',
        details: [
          'Encapsular entradas en etiquetas explícitas (<user_input>...</user_input>) o usar arquitectura Dual-LLM.',
          'No confiar en la auto-regulación del modelo: validar entradas/salidas en backend con NeMo Guardrails y Pydantic/JSON Schema.',
        ],
      },
      {
        title: 'Mínimo Privilegio (LLM06), Human-in-the-Loop y System Prompt Público (LLM07)',
        details: [
          'Restringir herramientas/APIs conectadas a solo lectura por defecto usando el token del usuario autenticado.',
          'Exigir confirmación humana física (2FA/OTP/clic consciente) para acciones destructivas o transacciones.',
          'Asumir el System Prompt como público: nunca almacenar secretos ni lógica de autorización en instrucciones textuales.',
        ],
      },
    ],
  },
];

export const SETUP_ENV_SCRIPT = `#!/bin/bash
set -e

echo "[+] Inicializando entorno de trabajo seguro para ÆVØID..."
mkdir -p ~/aevoid_workspace/{evidencias,reportes,scripts,temp}
chmod 700 ~/aevoid_workspace/evidencias ~/aevoid_workspace/reportes
chmod 755 ~/aevoid_workspace/scripts
echo "[+] Estructura creada con permisos 700 en evidencias y reportes."`;

export const GIT_WORKFLOW_DATA = {
  branches: [
    { name: 'main', purpose: 'Versión estable y verificada tras revisión por pares mediante Pull Requests.' },
    { name: 'feature/lab-08', purpose: 'Rama temporal de integración de la práctica de Prompt Injection en LLMs.' },
    { name: 'docs/glosario', purpose: 'Rama temporal para consolidar los 30 términos técnicos oficiales.' },
  ],
  tags: [
    { tag: 'v0.1.0', description: 'Diseño metodológico preliminar de ÆVØID (6 fases y estructura base).' },
    { tag: 'v0.2.0', description: 'Integración intermedia de laboratorios iniciales (DNS, Web y Forense).' },
    { tag: 'v1.0.0', description: 'Versión consolidada inicial con 8 laboratorios.' },
    { tag: 'v1.1.0', description: 'Integración de auditoría y explotación web en DVWA (Lab 9).' },
    { tag: 'v1.2.0', description: 'Integración de explotación avanzada en DVWA (Lab 10).' },
    { tag: 'v1.3.0', description: 'Versión final consolidada con métricas al 100%, OWASP ZAP (Lab 11) y anexos completos.' },
  ],
  policies: [
    'Zero Secrets: prohibido subir tokens de Netlify, contraseñas, llaves API o cadenas de conexión reales.',
    'Protección de Datos Personales: censurar correos o datos de terceros en capturas institucionales (SAC USTA).',
    'Revisión por Pares: ningún cambio entra a main sin aprobación del equipo.',
  ],
  commandsSnippet: `# Inicialización y flujo de ramas y etiquetas ÆVØID
git init
git add .
git commit -m "feat: Inicialización del framework ÆVØID con 6 fases"
git tag -a v0.1.0 -m "Versión v0.1.0: Diseño metodológico preliminar"

git checkout -b docs/glosario
git commit --allow-empty -m "docs: Estandarización de 30 términos técnicos"
git checkout main && git merge docs/glosario

git tag -a v1.3.0 -m "Versión v1.3.0: Framework ÆVØID consolidado"
git branch -M main
git push -u origin main --tags`,
};
