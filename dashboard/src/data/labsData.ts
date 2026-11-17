import type { LabDetail } from '../types/aevoid';

export const LABS_CATALOG: LabDetail[] = [
  {
    id: 'FC-LAB-001',
    slug: 'lab-01-shell',
    title: 'Comandos Shell y Gestión de Entornos en Kali Linux',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D01',
    domainName: 'Entornos y sistemas',
    phase: 'Fase 01 — Preparación',
    focus: 'Transversal / Soporte Operativo',
    teamCategory: 'Transversal',
    objective:
      'Acondicionar Kali Linux y dominar la terminal para estructurar carpetas aisladas, aplicar permisos POSIX restrictivos (chmod 700 / 600), filtrar logs con tuberías (grep, awk, sed) y prevenir fugas en historiales.',
    roles: {
      offensive: 'Configuración de variables de entorno, alias útiles y scripts iniciales.',
      defensive: 'Mínimo privilegio en archivos y auditoría de historiales (.bash_history / .zsh_history).',
      reviewer: 'Validar que cada comando sea limpio, repetible y seguro en la VM.',
    },
    environment: [
      'Máquina Virtual Kali Linux 2026 (x86_64)',
      'Sistema de archivos local, usuarios estándar y elevación con sudo',
      'Entorno académico local autorizado',
    ],
    tools: ['Bash / Zsh', 'chmod', 'grep', 'awk', 'find', 'auditd'],
    steps: [
      {
        title: 'Creación de la Estructura Segura de Auditoría',
        commands: [
          'mkdir -p ~/auditoria_aevoid/{evidencias,reportes,scripts,temp}',
          'cd ~/auditoria_aevoid',
          'chmod 700 evidencias reportes',
          'ls -ld evidencias reportes',
        ],
        commandLang: 'bash',
        observation: 'Directorios aislados bloqueando acceso de lectura a otros usuarios locales.',
      },
      {
        title: 'Filtrado Avanzado con Tuberías (Pipes)',
        commands: [
          'head -n 50 /var/log/auth.log | grep "COMMAND" | awk \'{print $1, $2, $3, $5, $6}\'',
          'echo "[$(date \'+%Y-%m-%d %H:%M:%S\')] Entorno preparado y validado por el Equipo ÆVØID" > reportes/bitacora.txt',
          'chmod 600 reportes/bitacora.txt',
        ],
        commandLang: 'bash',
        observation: 'Extracción limpia de eventos privilegiados y bitácora inicial sellada con fecha y hora.',
      },
      {
        title: 'Búsquedas Recursivas y Sanitización',
        commands: [
          'find . -type f -name "*.sh" -exec ls -lh {} \\;',
          'grep -rnw \'.\' -e \'password\' -e \'token\' -e \'secret\'',
        ],
        commandLang: 'bash',
        observation: 'Verificación de ausencia de secretos accidentales en archivos temporales.',
      },
    ],
    evidences: [
      'Árbol de carpetas del proyecto con permisos restrictivos 700/600.',
      'Salidas de terminal mostrando el filtrado de logs sin errores.',
      'Bitácora inicial sellada con fecha y hora.',
    ],
    acceptanceCriteria:
      'Moverse fluidamente por terminal, empaquetar resultados y restringir permisos para evitar fuga local.',
    blueTeamAnalysis: [
      'Riesgo de lectura de ~/.bash_history con contraseñas escritas en consola.',
      'Configurar HISTCONTROL=ignorespace, limpiar historiales y habilitar auditd para monitorear sudo.',
    ],
  },
  {
    id: 'FC-LAB-002',
    slug: 'lab-02-dns',
    title: 'DNS Footprinting y Reconocimiento de Red (nslookup y dig)',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D02',
    domainName: 'Reconocimiento y OSINT',
    phase: 'Fase 03 — Identificación',
    focus: 'Ofensivo Controlado (Footprinting)',
    teamCategory: 'Red Team',
    objective:
      'Mapear la infraestructura DNS de scanme.nmap.org sin escaneos ruidosos: IPv4/IPv6, servidores NS autoritativos, PTR inverso, TTL, firmas DNSSEC y registro WHOIS.',
    roles: {
      offensive: 'Envío de consultas DNS recursivas, directas, inversas y depuración con dig.',
      defensive: 'Verificar exposición en registros TXT o transferencias de zona (AXFR).',
      reviewer: 'Diagnosticar el timeout del resolver local y documentar su solución (@8.8.8.8).',
    },
    environment: [
      'Objetivo autorizado: scanme.nmap.org (proyecto Nmap)',
      'Kali Linux con salida a Internet verificada',
    ],
    tools: ['ping', 'nslookup', 'dig', 'whois'],
    steps: [
      {
        title: 'Comprobación de Salida y Resolución Directa / NS / PTR',
        commands: [
          'ping -c 3 8.8.8.8',
          'nslookup scanme.nmap.org',
          'nslookup -type=ns scanme.nmap.org',
          'nslookup 45.33.32.156',
        ],
        commandLang: 'bash',
        observation: 'IPv4 45.33.32.156 + IPv6, delegación en Linode (ns1.linode.com) y PTR inverso hacia scanme.nmap.org.',
      },
      {
        title: 'Superación de Timeout con dig y Verificación DNSSEC',
        commands: [
          'dig @8.8.8.8 scanme.nmap.org +trace',
          'dig @8.8.8.8 scanme.nmap.org +dnssec',
          'dig @8.8.8.8 scanme.nmap.org DNSKEY',
        ],
        commandLang: 'bash',
        observation: 'Traza completa desde root servers hasta Linode sin registros RRSIG ni DNSKEY (sin DNSSEC).',
      },
      {
        title: 'Consulta Registral (WHOIS)',
        commands: ['whois scanme.nmap.org'],
        commandLang: 'bash',
        observation: 'Registrado en Dynadot; campo oficial confirma estado DNSSEC: unsigned.',
      },
    ],
    evidences: [
      'Respuestas de nslookup (directa, inversa y NS).',
      'Trazas completas de dig forzando @8.8.8.8.',
      'Salida WHOIS confirmando ausencia de firmas criptográficas.',
    ],
    acceptanceCriteria:
      'Obtener mapa completo de direccionamiento, proveedor Linode y estado DNSSEC sin tráfico invasivo.',
    blueTeamAnalysis: [
      'Riesgo de envenenamiento de caché DNS (Cache Poisoning / Spoofing) en redes públicas sin DNSSEC.',
      'Habilitar DNSSEC en Linode (KSK/ZSK), publicar registro DS en Dynadot y restringir AXFR.',
    ],
  },
  {
    id: 'FC-LAB-003',
    slug: 'lab-03-httrack',
    title: 'Clonación Web Controlada e Inspección de Secretos en Frontend (HTTrack)',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D03',
    domainName: 'Seguridad web',
    phase: 'Fase 03 — Identificación & Fase 04 — Análisis',
    focus: 'Ofensivo / Defensivo (Superficie Web)',
    teamCategory: 'Purple Team',
    objective:
      'Demostrar que todo recurso enviado al navegador es público: clonar sitios en Netlify con HTTrack, servir réplica local con Python y buscar secretos o persistencia insegura en localStorage.',
    roles: {
      offensive: 'Descarga filtrada con HTTrack, servidor espejo local e inspección estática.',
      defensive: 'Auditar datos almacenados en cliente y proponer migración al backend.',
      reviewer: 'Contrastar visualmente el clon vs. original y validar patrones grep.',
    },
    environment: [
      'https://lab3-httrack-7958.netlify.app/',
      'https://lab3sebastianjurado.netlify.app/ (prueba cruzada)',
      'Kali Linux, httrack 3.49-14, python3, tree, grep',
    ],
    tools: ['HTTrack 3.49-14', 'python3 http.server', 'tree', 'grep'],
    steps: [
      {
        title: 'Instalación y Descarga Controlada con Filtros',
        commands: [
          'httrack --version',
          'mkdir -p ~/clon_sitio && cd ~/clon_sitio',
          'httrack https://lab3-httrack-7958.netlify.app/ -O . -%v -* +lab3-httrack-7958.netlify.app/*',
        ],
        commandLang: 'bash',
        observation: 'Descarga estricta restringida al dominio autorizado evitando clonación externa.',
      },
      {
        title: 'Inspección y Servidor Espejo Local',
        commands: ['tree -L 3', 'python3 -m http.server 8080'],
        commandLang: 'bash',
        observation: 'Réplica visual y funcional idéntica en http://localhost:8080 (HTML, CSS, JS e imágenes al 100%).',
      },
      {
        title: 'Caza Automatizada de Secretos con grep',
        commands: ['grep -E -i -rn "api[_-]?key|token|secret|password|bearer|auth|jwt" .'],
        commandLang: 'bash',
        observation: 'Sin credenciales quemadas; hallazgo de uso de localStorage bajo la variable STORE_KEY.',
      },
    ],
    qaNotes: [
      {
        question: '¿Se encontraron contraseñas o llamadas a backend?',
        answer: 'No. Los resultados de grep correspondieron a textos de plantilla y logs; sitio estático en CDN de Netlify.',
      },
      {
        question: '¿Por qué localStorage (STORE_KEY) representa un riesgo?',
        answer: 'Cualquier ataque XSS puede leer localStorage vía JavaScript; tokens de sesión requieren cookies HttpOnly.',
      },
    ],
    evidences: [
      'Sitios en Netlify clonados y contrastados lado a lado contra localhost:8080.',
      'Salidas grep y análisis de persistencia localStorage.',
    ],
    acceptanceCriteria:
      'Reconstruir el frontend completo en réplica local y auditar la ausencia o presencia de secretos en cliente.',
    blueTeamAnalysis: [
      'Nunca almacenar llaves privadas, JWT secrets o contraseñas en código frontend.',
      'Usar cookies HttpOnly + Secure + SameSite=Strict, CSP y escáneres en pipeline (GitGuardian/TruffleHog).',
    ],
  },
  {
    id: 'FC-LAB-004',
    slug: 'lab-04-esteganografia',
    title: 'Análisis Forense Digital y Detección de Esteganografía',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D06',
    domainName: 'Forense digital',
    phase: 'Fase 03 — Identificación & Fase 04 — Análisis',
    focus: 'Forense y Colaborativo (DFIR & Purple Team)',
    teamCategory: 'Forense',
    objective:
      'Resolver el reto forense reto_esteganografia_roa bajo cadena de custodia estricta para distinguir imagen limpia, concatenación binaria y canal encubierto con Steghide.',
    roles: {
      offensive: 'Analista DFIR: preservación, extracción EXIF, firmas binarias y extracción de carga oculta.',
      defensive: 'Custodio: hashes SHA-256 en minuto cero y controles DLP/CDR corporativos.',
      reviewer: 'Validar descarte técnico de falsos positivos (evidencia_C.png).',
    },
    environment: [
      'Directorio aislado /reto_esteganografia_roa (evidencias/, reportes/, extraidos/)',
      'Muestras: evidencia_A.jpeg (31 KB), evidencia_B.jpg (62 KB), evidencia_C.png (7.6 KB)',
    ],
    tools: ['sha256sum', 'file', 'exiftool', 'strings', 'binwalk', 'steghide'],
    steps: [
      {
        title: 'Preservación y Sellado SHA-256',
        commands: [
          'mkdir -p /reto_esteganografia_roa/{evidencias,reportes,extraidos}',
          'sha256sum evidencias/* > reportes/hashes.txt',
          'file evidencias/*',
        ],
        commandLang: 'bash',
        observation: 'Cadena de custodia sellada antes de manipular cualquier muestra.',
      },
      {
        title: 'Metadatos EXIF, Cadenas y Firmas Binarias',
        commands: [
          'exiftool evidencias/evidencia_A.jpeg > reportes/exif_A.txt',
          'strings evidencias/evidencia_B.jpg | tail -n 20',
          'binwalk evidencias/*',
        ],
        commandLang: 'bash',
        observation: 'evidencia_B.jpg reveló texto concatenado tras el marcador EOF (FF D9) de JPEG.',
      },
      {
        title: 'Descarte PNG y Extracción con Steghide',
        commands: [
          'steghide info evidencias/evidencia_C.png',
          'steghide info evidencias/evidencia_A.jpeg',
          'cd extraidos && steghide extract -sf ../evidencias/evidencia_A.jpeg && cat confidencial.txt',
        ],
        commandLang: 'bash',
        observation: 'evidencia_C.png descartada (PNG no soportado = control limpio). evidencia_A.jpeg contenía confidencial.txt (409 bytes).',
      },
    ],
    comparisonTable: {
      title: 'Dictamen Pericial de Muestras',
      headers: ['Archivo', 'Tamaño', 'Técnica Detectada', 'Conclusión DFIR'],
      rows: [
        ['evidencia_A.jpeg', '31 KB', 'Steghide (canal encubierto)', 'Portadora de confidencial.txt (409 bytes)'],
        ['evidencia_B.jpg', '62 KB', 'Concatenación tras FF D9', 'Texto plano al final detectado con strings'],
        ['evidencia_C.png', '7.6 KB', 'Ninguna (formato PNG)', 'Imagen limpia de control'],
      ],
    },
    evidences: [
      'reportes/hashes.txt con huellas SHA-256.',
      'Texto recuperado en evidencia_B.jpg y fichero extraído confidencial.txt.',
    ],
    acceptanceCriteria:
      'Clasificar las 3 muestras sin alterar su integridad y extraer el archivo secreto preservando hashes.',
    blueTeamAnalysis: [
      'Peligro de exfiltración de datos o C2 ocultos en imágenes corporativas.',
      'Implementar CDR (re-compresión JPEG/PNG para destruir LSB), stripping de EXIF y control de binarios en endpoints.',
    ],
  },
  {
    id: 'FC-LAB-005',
    slug: 'lab-05-ingenieria-social',
    title: 'Modelado de Ingeniería Social y Vectores Humanos (Phishing / USB Baiting)',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D05',
    domainName: 'Factor humano',
    phase: 'Fase 02 — Prevención & Fase 03 — Identificación',
    focus: 'Factor Humano / Modelado de Amenazas',
    teamCategory: 'Humano',
    objective:
      'Analizar escenarios reales de engaño universitario y financiero para identificar gatillos psicológicos (urgencia, confianza, autoridad) y diseñar políticas de prevención.',
    roles: {
      offensive: 'Modelar señuelos creíbles en entorno universitario (USTA Tunja).',
      defensive: 'Mapear Red Flags y formular controles organizacionales y técnicos.',
      reviewer: 'Tabular pretextos, canales y técnicas en matriz de 9 dimensiones.',
    },
    environment: [
      'Escenario Físico: USB "No More Hidding" (Cristian Hernández)',
      'Escenario Digital: "La Guía del Parcial" vía WhatsApp con USTA_SimulacionV2_instalacion_2026.pdf (Julián Roa)',
    ],
    tools: ['Matriz de Vectores Humanos', 'Modelado de Amenazas', 'Políticas GPO / usbguard'],
    steps: [
      {
        title: 'Escenario 1 — Vector Físico USB Baiting ("No More Hidding")',
        observation:
          'Estudiante pierde archivos y conecta una USB etiquetada "Recuperador de Archivos" ejecutando No More Hidding.exe; simula recuperación mientras instala troyano persistente.',
      },
      {
        title: 'Escenario 2 — Vector Digital WhatsApp ("La Guía del Parcial")',
        observation:
          'Mensaje de urgencia antes del parcial de Simulación adjunta PDF institucional falso; tras abrirlo, la víctima ingresa a su banco y sufre retiros no autorizados.',
      },
    ],
    comparisonTable: {
      title: 'Matriz de Análisis Técnico del Escenario WhatsApp',
      headers: ['Elemento Analizado', 'Identificación', 'Justificación de Ingeniería'],
      rows: [
        ['Contexto', 'Académico y Financiero', 'Nace en grupo universitario y culmina en fraude bancario.'],
        ['Objetivo del Atacante', 'Credenciales bancarias', 'Software académico como fachada de infección.'],
        ['Canal Utilizado', 'WhatsApp', 'Entorno informal donde disminuye la desconfianza.'],
        ['Pretexto', 'Guía de instalación para parcial', 'Necesidad académica urgente en materia Simulación.'],
        ['Identidad Simulada', 'Compañero de clase', 'Explota confianza entre estudiantes de la misma carrera.'],
        ['Persuasión', 'Urgencia, miedo y autoridad', 'Cercanía del examen nubla juicio crítico.'],
        ['Acción Solicitada', 'Abrir archivo adjunto', 'Ejecución camuflada o exploit en visor PDF.'],
        ['Clasificación', 'Spear Phishing / Suplantación', 'Ataque dirigido a nicho específico.'],
        ['Indicadores de Alerta', 'Fichero no solicitado / canal informal', 'Docente no publicó el archivo en Moodle/Teams oficial.'],
      ],
    },
    evidences: [
      'Narrativas documentadas de ambos vectores.',
      'Matriz de caracterización de persuasión y red flags.',
    ],
    acceptanceCriteria:
      'Caracterizar completamente los gatillos psicológicos y establecer controles técnicos y administrativos.',
    blueTeamAnalysis: [
      'Regla de Canales Oficiales: prohibir instaladores/guías evaluativas por WhatsApp; centralizar en Moodle/Teams.',
      'Bloqueo físico de puertos USB (GPO / usbguard), simulacros de phishing y reglas EDR ante procesos hijos de visores PDF.',
    ],
  },
  {
    id: 'FC-LAB-006',
    slug: 'lab-06-maltego',
    title: 'Reconocimiento Digital Pasivo y Mapeo de Infraestructura con Maltego',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D02',
    domainName: 'Reconocimiento y OSINT',
    phase: 'Fase 03 — Identificación',
    focus: 'OSINT Pasivo / Cadena de Suministro',
    teamCategory: 'Red Team',
    objective:
      'Mapear infraestructura pública de tesla.com, microsoft.com y santototunja.edu.co sin enviar paquetes intrusivos, descubriendo MX, NS, SPF, Netblocks y ASN.',
    roles: {
      offensive: 'Ejecutar transforms OSINT en Maltego y correlacionar entidades.',
      defensive: 'Evaluar dependencia de terceros cloud (AWS, Microsoft, Akamai) y exposición.',
      reviewer: 'Validar claridad ejecutiva comparando vista jerárquica vs. circular.',
    },
    environment: [
      'Maltego Community Edition sobre Kali Linux',
      'Objetivos pasivos: tesla.com, microsoft.com, santototunja.edu.co',
    ],
    tools: ['Maltego CE', 'Transforms DNS (MX/NS/SPF)', 'Netblock / BGP ASN'],
    steps: [
      {
        title: 'Mapeo MX, NS y SPF',
        commands: ['Transform: To DNS Name - MX', 'Transform: To DNS Name - NS', 'Transform: To DNS Name - SPF'],
        commandLang: 'text',
        observation:
          'tesla.com y santototunja.edu.co delegan correo a Microsoft 365 (tesla-com.mail.protection.outlook.com, prioridad 10); Tesla usa NS en UltraDNS y Akamai.',
      },
      {
        title: 'De IP a Netblocks y Sistemas Autónomos (ASN)',
        commands: ['Transform: To IP Address -> To Netblock', 'Transform: To AS Number'],
        commandLang: 'text',
        observation:
          'IP 8.45.124.203 pertenece a 8.45.124.0/24; rango 54.240.84.248-251 pertenece al ASN 16509 (Amazon AWS).',
      },
      {
        title: 'Optimización en Vista Circular Concéntrica',
        observation:
          'Grafo radial con el dominio al centro y dependencias cloud/DNS alrededor para lectura ejecutiva en 30 segundos.',
      },
    ],
    evidences: [
      'Grafos Maltego (jerárquico y circular) de tesla.com, microsoft.com y santototunja.edu.co.',
      'Correlación ASN 16509 (AWS) y contacto domain@teslamotors.com.',
    ],
    acceptanceCriteria:
      'Construir topología completa de red y nube mediante fuentes abiertas con cero tráfico directo invasivo.',
    blueTeamAnalysis: [
      'La infraestructura distribuida concentra riesgo en proveedores terceros (Microsoft 365, Akamai, AWS).',
      'Configurar DMARC p=reject, evitar nombres reveladores de subdominios internos y auditar SLAs cloud.',
    ],
  },
  {
    id: 'FC-LAB-007',
    slug: 'lab-07-burp',
    title: 'Interceptación de Tráfico Web y Análisis Comparativo de Logins con Burp Suite',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D03 / D04',
    domainName: 'Seguridad web & APIs',
    phase: 'Fase 03 — Identificación & Fase 04 — Análisis',
    focus: 'Web Penetration Testing / Autenticación',
    teamCategory: 'Purple Team',
    objective:
      'Interceptar y modificar peticiones POST de inicio de sesión mediante Burp Suite Proxy y Repeater sobre 4 plataformas para evaluar anti-enumeración y codificación en tránsito.',
    roles: {
      offensive: 'Configurar proxy CA, interceptar requests y alterar credenciales en Repeater.',
      defensive: 'Analizar formatos (JSON, urlencoded, Base64) y códigos de error devueltos.',
      reviewer: 'Tabular comparativa de las 4 plataformas para el caso de estudio UML.',
    },
    environment: [
      'Burp Suite Community Edition + Chromium con certificado CA',
      'OWASP Juice Shop, UVirtual (Q10), PortSwigger Academy y SAC USTA',
    ],
    tools: ['Burp Suite Proxy', 'Burp Repeater', 'Burp Decoder'],
    steps: [
      {
        title: 'Interceptación Proxy y Pruebas en Repeater (Ctrl+R)',
        observation:
          'Captura de solicitudes POST de login en tránsito, alteración de contraseñas y validación de mensajes de respuesta en las 4 plataformas.',
      },
      {
        title: 'Auditoría de Codificación Base64 en SAC USTA',
        observation:
          'Endpoint dinámico /sgacampus/services/.../fetch/{token} envía JSON codificado en Base64; decodificación inmediata en Burp Decoder confirma que Base64 no cifra datos.',
      },
    ],
    comparisonTable: {
      title: 'Comparativa de Modelos de Autenticación',
      headers: ['Plataforma', 'Endpoint', 'Formato', 'Protecciones', 'Respuesta Inválida'],
      rows: [
        ['OWASP Juice Shop', '/rest/user/login', 'JSON plano', 'Ninguna en payload', '401 Invalid email or password'],
        ['UVirtual (Q10)', '/Login', 'form-urlencoded', 'Parámetros returnUrl/aplentId', 'JSON estado: error genérico'],
        ['PortSwigger Academy', 'login.portswigger.net/login', 'form-urlencoded', 'CSRF, HttpOnly, OAuth, reCAPTCHA', 'INVALID_CREDENTIALS'],
        ['SAC (USTA)', '/sgacampus/services/.../fetch/{token}', 'JSON en Base64', 'Token en URL + Base64', 'JSON Usuario o clave incorrectos'],
      ],
    },
    evidences: [
      'Capturas de Burp Intercept y Repeater de las 4 plataformas.',
      'Evidencia de respuesta homogénea anti-enumeración en todas.',
    ],
    acceptanceCriteria:
      'Comprobar uso obligatorio de POST, verificar respuestas anti-enumeración y desmontar el mito de seguridad de Base64.',
    blueTeamAnalysis: [
      'Persisten riesgos de fuerza bruta y credential stuffing si falta límite de tasa.',
      'Aplicar Rate Limiting (5 intentos / 10-15 min), MFA/TOTP y cabecera HSTS obligatoria.',
    ],
  },
  {
    id: 'FC-LAB-008',
    slug: 'lab-08-prompt-injection',
    title: 'Evaluación de Seguridad en IA y Mitigación de Prompt Injection en LLMs',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D08',
    domainName: 'Seguridad de IA',
    phase: 'Fase 03 — Identificación, Fase 04 — Análisis & Fase 05 — Mitigación',
    focus: 'Red Team, Blue Team & Purple Team (AI Security)',
    teamCategory: 'Purple Team',
    standardRef: 'OWASP Top 10 for LLM (LLM01, LLM02, LLM05, LLM06, LLM07)',
    objective:
      'Evaluar la ausencia de separación física entre control y datos en LLMs, probar vectores de Prompt Injection y diseñar una arquitectura determinista en 3 capas para contener exceso de agencia.',
    roles: {
      offensive: 'Probar escape semántico (tags XML falsos, Base64, multilingüe) y fuga de System Prompt.',
      defensive: 'Implementar etiquetas estructuradas, Guardrails en backend y mínimo privilegio.',
      reviewer: 'Diseñar compuertas Human-in-the-Loop y medir Injection Success Rate (ISR).',
    },
    environment: [
      'Suite OWASP LLM Applications',
      'Arquitectura backend de referencia con NeMo Guardrails y Pydantic',
    ],
    tools: ['Prompts Adversariales', 'OWASP LLM Top 10', 'NeMo Guardrails', 'Pydantic'],
    steps: [
      {
        title: 'Evaluación de Escape Semántico y Fuga de System Prompt (LLM01 / LLM07)',
        observation:
          'Inyección de delimitadores falsos </input><admin> y pretextos de auditoría para evidenciar fragilidad cuando se concatenan cadenas crudas.',
      },
      {
        title: 'Pruebas de Evasión y Tool Abuse (LLM05 / LLM06)',
        observation:
          'Ofuscación Base64/multilingüe e intentos de invocar APIs destructivas, demostrando la necesidad de validación fuera del LLM.',
      },
    ],
    comparisonTable: {
      title: 'Los 5 Ejes de Prompt Injection (Ofensivo vs. Defensivo)',
      headers: ['Eje Metodológico', 'Red Team (Ofensivo)', 'Blue Team (Defensivo)'],
      rows: [
        ['1. Separación Control vs. Datos', 'Tags falsos </input><admin> para romper jerarquía.', 'Etiquetas <user_input>...</user_input> tratadas solo como datos y Dual-LLM.'],
        ['2. Mínimo Privilegio (LLM06)', 'Tool Abuse forzando borrados o SELECT *.', 'APIs de solo lectura y uso del token del usuario final autenticado.'],
        ['3. Validación Externa (LLM05)', 'Evasión por Base64, sinónimos o traducción.', 'Guardrails deterministas en backend (NeMo Guardrails, Pydantic, regex).'],
        ['4. System Prompt Público (LLM07)', 'Ingeniería social para extraer instrucciones.', 'Asumir System Prompt como público; cero secretos ni lógica crítica allí.'],
        ['5. Testing & Human-in-the-Loop', 'Baterías CI/CD midiendo tasa ISR.', 'Confirmación física humana (2FA/UI) antes de acciones destructivas.'],
      ],
    },
    evidences: [
      'Matriz de 5 vectores OWASP LLM evaluados.',
      'Diseño arquitectónico de 3 capas defensivas (Aislamiento, Guardrails deterministas, Human-in-the-Loop).',
    ],
    acceptanceCriteria:
      'Identificar los 5 ejes de ataque/defensa en LLMs y validar controles deterministas fuera del modelo.',
    blueTeamAnalysis: [
      'El Prompt Injection equivale a ingeniería social contra el entrenamiento RLHF ("empatía algorítmica").',
      'Arquitectura en 3 capas: Dual-LLM / aislamiento + NeMo/Pydantic determinista + Human-in-the-Loop.',
    ],
  },
  {
    id: 'FC-LAB-009',
    slug: 'lab-09-dvwa',
    title: 'Auditoría y Explotación Controlada de Vulnerabilidades Web en DVWA',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D03',
    domainName: 'Seguridad web (alcance D01 y D04)',
    phase: 'Fase 03 — Identificación, Fase 04 — Análisis & Fase 05 — Mitigación',
    focus: 'Red Team, Blue Team & Purple Team',
    teamCategory: 'Red Team',
    standardRef: 'OWASP Top 10 (A03: Injection, A07: Identification and Authentication Failures)',
    objective:
      'Desplegar DVWA en contenedor Docker local (puerto 8080, Security: Low) para evaluar Brute Force, SQL Injection, Command Injection (RCE) y XSS Reflected/Stored, formulando sus parches PHP.',
    roles: {
      offensive: 'Desplegar Docker DVWA e inyectar payloads controlados en cada módulo.',
      defensive: 'Inspeccionar código vulnerable PHP y diseñar PDO, validación IP, htmlspecialchars y CSP.',
      reviewer: 'Correlacionar cada fallo con OWASP Top 10 y registrar severidad Crítica (P09).',
    },
    environment: [
      'Contenedor Docker oficial de DVWA en Kali Linux',
      'Acceso local aislado: http://localhost:8080 (Security: Low)',
    ],
    tools: ['Docker', 'DVWA', 'Burp Intruder / Hydra', 'Payloads SQLi / Command Inj. / XSS'],
    steps: [
      {
        title: 'Módulo 1: Fuerza Bruta (OWASP A07)',
        commands: ['admin / password'],
        commandLang: 'text',
        observation: 'Acceso concedido sin Rate Limiting, CAPTCHA ni bloqueo por intentos fallidos.',
      },
      {
        title: 'Módulo 2: Inyección SQL (OWASP A03)',
        normalBehavior: 'Entrada "1" devuelve únicamente al usuario admin.',
        commands: ["1' OR '1'='1", "1'"],
        commandLang: 'sql',
        observation: 'Bypass lógico volcando todos los usuarios/hashes y fuga de error explícito de sintaxis MySQL.',
      },
      {
        title: 'Módulo 3: Command Injection / RCE (OWASP A03 — Crítico)',
        normalBehavior: '127.0.0.1 ejecuta ping -c 4 normal.',
        commands: ['127.0.0.1 ; whoami', '127.0.0.1 ; ls', '127.0.0.1 ; pwd', '127.0.0.1 ; uname -a', '127.0.0.1 ; cat /etc/passwd'],
        commandLang: 'bash',
        observation: 'Concatenación directa en shell_exec() reveló usuario www-data, ruta /var/www/html/vulnerabilities/exec, kernel y /etc/passwd.',
      },
      {
        title: 'Módulo 4 y 5: XSS Reflected & Stored (OWASP A03)',
        normalBehavior: 'Saludo normal o comentario en Guestbook.',
        commands: [
          "<script>alert('XSS')</script>",
          "<script>document.body.style.background='red'</script>",
          '<script>alert(document.cookie)</script>',
        ],
        commandLang: 'html',
        observation: 'Ejecución de scripts reflejados y persistentes en Guestbook exponiendo PHPSESSID y security=low.',
      },
    ],
    comparisonTable: {
      title: 'Vulnerabilidades Evaluadas en DVWA (P09)',
      headers: ['Vulnerabilidad', 'Módulo', 'Entrada', 'Impacto', 'OWASP'],
      rows: [
        ['Fuerza Bruta', 'Brute Force', 'admin / password', 'Acceso sin límite de intentos ni CAPTCHA', 'A07:2021'],
        ['SQLi Lógica', 'SQL Injection', "1' OR '1'='1", 'Volcado total de usuarios de la BD', 'A03:2021'],
        ['SQLi Sintáctica', 'SQL Injection', "1'", 'Fuga de error interno MySQL', 'A03:2021'],
        ['RCE / Command Inj.', 'Exec / Ping', '; whoami / ; cat /etc/passwd', 'Comandos como www-data y lectura de cuentas', 'A03:2021'],
        ['XSS Reflected', 'XSS (Reflected)', '<script>alert(document.cookie)</script>', 'Exposición de sesión vía URL', 'A03:2021'],
        ['XSS Stored', 'XSS (Stored)', '<script>alert(document.cookie)</script>', 'Persistencia en BD afectando a todo visitante', 'A03:2021'],
      ],
    },
    evidences: [
      'Contenedor Docker en localhost:8080 y capturas de SQLi, RCE, XSS Reflected y Stored.',
      'Parches PHP documentados con PDO y htmlspecialchars.',
    ],
    acceptanceCriteria:
      'Demostrar explotación en entorno aislado y validar las contramedidas de codificación y parametrización.',
    blueTeamAnalysis: [
      'SQLi: usar sentencias preparadas PDO/MySQLi; nunca concatenar entradas.',
      'RCE: prohibir shell_exec()/system(); validar IPs con filter_var($ip, FILTER_VALIDATE_IP).',
      'XSS/Brute Force: htmlspecialchars(), cookies HttpOnly, cabecera CSP default-src \'self\', Rate Limiting y MFA.',
    ],
  },
  {
    id: 'FC-LAB-011',
    slug: 'lab-11-owasp-zap',
    title: 'Análisis Dinámico (DAST), Interceptación Proxy y Escaneo con OWASP ZAP',
    version: '1.0 (Noviembre 2026)',
    domainCode: 'D03 / D04',
    domainName: 'Seguridad web & APIs',
    phase: 'Fase 03 — Identificación, Fase 04 — Análisis & Fase 05 — Mitigación',
    focus: 'DAST Automatizado / Interceptación Proxy / Purple Team',
    teamCategory: 'Blue Team',
    standardRef: 'OWASP Top 10 (A05: Security Misconfiguration, A01: Broken Access Control, A07)',
    objective:
      'Combinar análisis dinámico automatizado DAST (Spider + Active Scan) e interceptación proxy Firefox (127.0.0.1:8090) sobre DVWA y portales externos como accounts.spotify.com y demo.testfire.net.',
    roles: {
      offensive: 'Parametrizar proxy Firefox 127.0.0.1:8090, lanzar Spider y Active Scan en ZAP.',
      defensive: 'Analizar alertas (CSP, XFO, HttpOnly, banners) y redactar configuración Nginx/Apache.',
      reviewer: 'Validar falsos positivos, generar reporte HTML DAST y cruzar contra OWASP Top 10.',
    },
    environment: [
      'Kali Linux Rolling + OWASP ZAP (GUI) en puerto local 8090',
      'Mozilla Firefox configurado con Proxy Manual 127.0.0.1:8090',
      'Targets: DVWA http://127.0.0.1:8080, demo.testfire.net y accounts.spotify.com',
    ],
    tools: ['OWASP ZAP', 'ZAP Spider', 'ZAP Active Scanner', 'Firefox Proxy', 'zap2docker-weekly'],
    steps: [
      {
        title: 'Configuración Proxy Firefox y Escaneo Automatizado sobre DVWA',
        commands: ['Proxy HTTP/HTTPS: 127.0.0.1:8090', 'Target Automated Scan: http://127.0.0.1:8080'],
        commandLang: 'text',
        observation: 'ZAP Spider construye el Site Tree y Active Scanner ejecuta 1.509 peticiones HTTP generando 12 alertas en historial.',
      },
      {
        title: 'Análisis del Panel de Alertas y Exportación HTML',
        observation:
          'Semáforo de alertas detecta ausencia de X-Frame-Options, ausencia de CSP, PHPSESSID sin HttpOnly/SameSite, falta de nosniff y divulgación de versión Apache/PHP.',
      },
      {
        title: 'Contraste con Portales de Producción (accounts.spotify.com y demo.testfire.net)',
        observation:
          'Spider en testfire (234 URLs). En Spotify se evidenció postura robusta (HTTPS+HSTS, tokens anti-CSRF), limitándose las alertas a niveles Informativo/Bajo (Cache-Control y Permissions-Policy).',
      },
    ],
    comparisonTable: {
      title: 'Hallazgos Detectados por OWASP ZAP',
      headers: ['Alerta Detectada', 'Severidad ZAP', 'Entorno', 'Impacto Técnico', 'OWASP'],
      rows: [
        ['Ausencia de CSP', 'Media', 'DVWA', 'Permite ejecución de scripts no autorizados (XSS)', 'A05:2021'],
        ['X-Frame-Options Ausente', 'Media', 'DVWA', 'Riesgo de Clickjacking mediante iframes ocultos', 'A05:2021'],
        ['Cookies sin HttpOnly / SameSite', 'Media', 'DVWA', 'Secuestro de sesión vía XSS y CSRF', 'A07 / A01:2021'],
        ['Falta X-Content-Type-Options: nosniff', 'Baja', 'DVWA', 'Confusión de tipos MIME en navegadores', 'A05:2021'],
        ['Divulgación en cabecera Server', 'Baja', 'DVWA', 'Exposición de versiones exactas Apache y PHP', 'A05:2021'],
        ['Políticas de caché y terceros', 'Info / Baja', 'Login Spotify', 'Advertencias menores de almacenamiento y permisos', 'A05:2021'],
      ],
    },
    evidences: [
      'Captura de proxy 127.0.0.1:8090, árbol Spider y panel History.',
      'Reporte oficial HTML exportado de OWASP ZAP (1.509 peticiones / 12 alertas).',
    ],
    acceptanceCriteria:
      'Ejecutar Spider + Active Scan sobre DVWA identificando 5+ categorías de alerta, exportar HTML y contrastar contra login externo.',
    blueTeamAnalysis: [
      'Configurar cabeceras Nginx (X-Frame-Options, nosniff, CSP, HSTS, Referrer-Policy) y cookies Secure; HttpOnly; SameSite=Strict.',
      'Ocultar banners con ServerTokens Prod, ServerSignature Off y expose_php = Off.',
      'Integrar owasp/zap2docker-weekly en GitHub Actions / GitLab CI.',
    ],
  },
];
