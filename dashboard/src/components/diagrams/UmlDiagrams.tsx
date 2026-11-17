import { ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import { AccessibleTabs } from '../AccessibleTabs';

type MaltegoTarget = 'tesla.com' | 'microsoft.com' | 'santototunja.edu.co';

const MALTEGO_NODES: Record<
  MaltegoTarget,
  {
    mx: string;
    ns: string[];
    ip: string;
    netblock: string;
    asn: string;
    contact: string;
  }
> = {
  'tesla.com': {
    mx: 'tesla-com.mail.protection.outlook.com (Prio 10)',
    ns: ['Akamai Edge DNS', 'UltraDNS'],
    ip: '8.45.124.203 / 54.240.84.248',
    netblock: '8.45.124.0/24',
    asn: 'ASN 16509 (Amazon AWS)',
    contact: 'domain@teslamotors.com',
  },
  'microsoft.com': {
    mx: 'microsoft-com.mail.protection.outlook.com',
    ns: ['ns1-39.azure-dns.com', 'ns2-39.azure-dns.net'],
    ip: '20.70.246.20',
    netblock: '20.64.0.0/10 (Azure)',
    asn: 'ASN 8075 (Microsoft Corp)',
    contact: 'msnhst@microsoft.com',
  },
  'santototunja.edu.co': {
    mx: 'santototunja-edu-co.mail.protection.outlook.com',
    ns: ['Servidores DNS institucionales / CDN'],
    ip: 'Infraestructura híbrida M365 + Web',
    netblock: 'Rango académico público',
    asn: 'Dependencia Exchange Online (M365)',
    contact: 'TIC Universidad Santo Tomás Tunja',
  },
};

export function UmlDiagrams() {
  const [activeTab, setActiveTab] = useState('sequence');
  const [zoom, setZoom] = useState(100);
  const [maltegoTarget, setMaltegoTarget] = useState<MaltegoTarget>('tesla.com');

  const mData = MALTEGO_NODES[maltegoTarget];

  const tabs = [
    {
      id: 'sequence',
      label: 'Secuencia UML (SVG)',
      badge: '16 pasos',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-2)' }}>
              Gráfico vectorial oficial (<code>casos-estudio/diagrama_uml_autenticacion.svg</code>): Burp Suite, OWASP ZAP y Hardening Blue Team.
            </p>
            <div className="pill-group">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setZoom((z) => Math.max(80, z - 20))}
                aria-label="Reducir zoom del diagrama UML"
              >
                <ZoomOut size={14} aria-hidden="true" />
              </button>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{zoom}%</span>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setZoom((z) => Math.min(160, z + 20))}
                aria-label="Aumentar zoom del diagrama UML"
              >
                <ZoomIn size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="diagram-frame">
            <img
              src="/diagrama_uml_autenticacion.svg"
              alt="Diagrama de Secuencia UML: Interceptación con Burp Suite, Escaneo DAST con OWASP ZAP y Hardening Blue Team"
              style={{ inlineSize: `${zoom}%`, maxInlineSize: 'none', marginInline: 'auto' }}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'usecase',
      label: 'Casos de Uso UML',
      badge: 'UC1–UC9',
      content: (
        <div className="diagram-frame">
          <svg
            viewBox="0 0 920 460"
            width="100%"
            role="img"
            aria-label="Diagrama de Casos de Uso UML de Seguridad en Autenticación"
          >
            <title>Casos de Uso: Usuario Legítimo, Analista Red Team, Sistema Backend y controles anti-enumeración</title>
            <defs>
              <marker id="ucArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="mitigateArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
              </marker>
            </defs>

            {/* System Boundary */}
            <rect x="210" y="20" width="490" height="420" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="455" y="44" textAnchor="middle" fill="#94a3b8" fontSize="13" fontWeight="700">
              Frontera del Sistema Web de Autenticación
            </text>

            {/* Actors */}
            <g transform="translate(30, 85)">
              <rect x="0" y="0" width="145" height="54" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="72" y="32" textAnchor="middle" fill="#f8fafc" fontSize="12.5" fontWeight="700">Usuario Legítimo</text>
            </g>
            <g transform="translate(30, 265)">
              <rect x="0" y="0" width="145" height="62" rx="8" fill="#1e293b" stroke="#fb7185" strokeWidth="2" />
              <text x="72" y="26" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700">Analista / Atacante</text>
              <text x="72" y="45" textAnchor="middle" fill="#fb7185" fontSize="11">(Red Team)</text>
            </g>
            <g transform="translate(740, 195)">
              <rect x="0" y="0" width="155" height="62" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="77" y="26" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700">Sistema Backend</text>
              <text x="77" y="45" textAnchor="middle" fill="#34d399" fontSize="11">de Autenticación</text>
            </g>

            {/* Use Cases */}
            {[
              { id: 'UC1', x: 330, y: 95, label: 'UC1: Iniciar Sesión', stroke: '#a855f7', fill: '#0f172a' },
              { id: 'UC2', x: 560, y: 95, label: 'UC2: POST Credenciales', stroke: '#a855f7', fill: '#0f172a' },
              { id: 'UC6', x: 560, y: 178, label: 'UC6: Validar Hash', stroke: '#a855f7', fill: '#0f172a' },
              { id: 'UC3', x: 320, y: 265, label: 'UC3: Interceptar Tráfico', stroke: '#fb7185', fill: '#0f172a' },
              { id: 'UC4', x: 320, y: 350, label: 'UC4: Enumeración Usuarios', stroke: '#fb7185', fill: '#0f172a' },
              { id: 'UC5', x: 560, y: 255, label: 'UC5: Ofuscar Base64', stroke: '#fbbf24', fill: '#0f172a' },
              { id: 'UC7', x: 560, y: 335, label: 'UC7: Error Homogéneo', stroke: '#34d399', fill: '#064e3b' },
              { id: 'UC8', x: 560, y: 405, label: 'UC8: Rate Limiting + MFA', stroke: '#34d399', fill: '#064e3b' },
            ].map((uc) => (
              <g key={uc.id}>
                <rect x={uc.x - 98} y={uc.y - 22} width="196" height="44" rx="22" fill={uc.fill} stroke={uc.stroke} strokeWidth="1.8" />
                <text x={uc.x} y={uc.y + 4} textAnchor="middle" fill="#f8fafc" fontSize="11.5" fontWeight="600">
                  {uc.label}
                </text>
              </g>
            ))}

            {/* Connectors */}
            <line x1="175" y1="108" x2="230" y2="98" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#ucArrow)" />
            <line x1="428" y1="95" x2="460" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ucArrow)" />
            <text x="444" y="84" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">include</text>

            <line x1="560" y1="117" x2="560" y2="154" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ucArrow)" />
            <line x1="658" y1="100" x2="738" y2="210" stroke="#38bdf8" strokeWidth="1.6" />
            <line x1="658" y1="178" x2="738" y2="220" stroke="#38bdf8" strokeWidth="1.6" />

            <line x1="175" y1="286" x2="220" y2="268" stroke="#fb7185" strokeWidth="1.8" markerEnd="url(#ucArrow)" />
            <line x1="320" y1="287" x2="320" y2="326" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ucArrow)" />
            <text x="352" y="311" fill="#fda4af" fontSize="9.5">extend</text>

            <line x1="462" y1="335" x2="420" y2="348" stroke="#34d399" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#mitigateArrow)" />
            <line x1="462" y1="400" x2="410" y2="365" stroke="#34d399" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#mitigateArrow)" />
            <text x="445" y="388" fill="#6ee7b7" fontSize="9.5" fontWeight="700">mitigates</text>

            <line x1="658" y1="335" x2="740" y2="242" stroke="#34d399" strokeWidth="1.6" />
            <line x1="658" y1="405" x2="740" y2="252" stroke="#34d399" strokeWidth="1.6" />
          </svg>
        </div>
      ),
    },
    {
      id: 'activity',
      label: 'Actividades UML (Login)',
      badge: 'Flujo',
      content: (
        <div className="diagram-frame">
          <svg
            viewBox="0 0 920 430"
            width="100%"
            role="img"
            aria-label="Diagrama de Actividades UML del Flujo de Decisión en Login"
          >
            <title>Flujo de decisión en Login: Proxy Burp, Formatos de Endpoint, Hash, Rate Limiting y Anti-Enumeración</title>
            <defs>
              <marker id="actArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Row 1 */}
            <rect x="25" y="30" width="165" height="48" rx="24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
            <text x="107" y="58" textAnchor="middle" fill="#f8fafc" fontSize="11.5" fontWeight="700">1. Ingreso de Credenciales</text>

            <line x1="190" y1="54" x2="232" y2="54" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#actArrow)" />

            <polygon points="315,20 398,54 315,88 232,54" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.8" />
            <text x="315" y="51" textAnchor="middle" fill="#fde68a" fontSize="10.5" fontWeight="700">¿Proxy Burp</text>
            <text x="315" y="65" textAnchor="middle" fill="#fde68a" fontSize="10.5" fontWeight="700">activo?</text>

            <line x1="398" y1="54" x2="455" y2="54" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#actArrow)" />
            <text x="424" y="46" textAnchor="middle" fill="#94a3b8" fontSize="10">Sí</text>

            <rect x="458" y="30" width="215" height="48" rx="8" fill="#1e293b" stroke="#fb7185" strokeWidth="1.8" />
            <text x="565" y="51" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">Intercepta y modifica en Repeater</text>
            <text x="565" y="67" textAnchor="middle" fill="#fda4af" fontSize="10">POST enviado vía TLS 1.3</text>

            <line x1="315" y1="88" x2="315" y2="128" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#actArrow)" />
            <line x1="565" y1="78" x2="565" y2="112" stroke="#38bdf8" strokeWidth="1.8" />
            <line x1="565" y1="112" x2="315" y2="112" stroke="#38bdf8" strokeWidth="1.8" />

            {/* Endpoint format */}
            <rect x="120" y="130" width="680" height="62" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="460" y="149" textAnchor="middle" fill="#94a3b8" fontSize="10.5" fontWeight="700">
              Decodificación / Parseo según Plataforma
            </text>
            <rect x="140" y="157" width="195" height="26" rx="6" fill="#1e293b" stroke="#38bdf8" />
            <text x="237" y="174" textAnchor="middle" fill="#e2e8f0" fontSize="10.5">SAC USTA: Decode Base64</text>
            <rect x="362" y="157" width="195" height="26" rx="6" fill="#1e293b" stroke="#38bdf8" />
            <text x="459" y="174" textAnchor="middle" fill="#e2e8f0" fontSize="10.5">Juice Shop: Parsear JSON</text>
            <rect x="585" y="157" width="195" height="26" rx="6" fill="#1e293b" stroke="#38bdf8" />
            <text x="682" y="174" textAnchor="middle" fill="#e2e8f0" fontSize="10.5">Q10 / PortSwigger: Form + CSRF</text>

            <line x1="460" y1="192" x2="460" y2="225" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#actArrow)" />

            <rect x="330" y="227" width="260" height="42" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.8" />
            <text x="460" y="252" textAnchor="middle" fill="#f8fafc" fontSize="11.5" fontWeight="700">
              Validar Hash Seguro en Base de Datos
            </text>

            <line x1="460" y1="269" x2="460" y2="298" stroke="#38bdf8" strokeWidth="1.8" markerEnd="url(#actArrow)" />

            <polygon points="460,300 545,332 460,364 375,332" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
            <text x="460" y="336" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="700">¿Válidas?</text>

            {/* Yes branch */}
            <line x1="375" y1="332" x2="265" y2="332" stroke="#34d399" strokeWidth="2" markerEnd="url(#actArrow)" />
            <text x="322" y="324" textAnchor="middle" fill="#6ee7b7" fontSize="10">Sí</text>
            <rect x="35" y="304" width="228" height="56" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.8" />
            <text x="149" y="327" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">Generar Cookie Segura</text>
            <text x="149" y="345" textAnchor="middle" fill="#6ee7b7" fontSize="10">HttpOnly · Secure · SameSite</text>

            {/* No branch */}
            <line x1="545" y1="332" x2="635" y2="332" stroke="#fb7185" strokeWidth="2" markerEnd="url(#actArrow)" />
            <text x="588" y="324" textAnchor="middle" fill="#fda4af" fontSize="10">No</text>
            <rect x="638" y="294" width="252" height="76" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.8" />
            <text x="764" y="317" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">Rate Limiting (&gt;5 intentos) +</text>
            <text x="764" y="335" textAnchor="middle" fill="#34d399" fontSize="10.5" fontWeight="700">HTTP 401 Mensaje Homogéneo</text>
            <text x="764" y="354" textAnchor="middle" fill="#cbd5e1" fontSize="9.8">"Usuario o clave incorrectos"</text>
          </svg>
        </div>
      ),
    },
    {
      id: 'maltego',
      label: 'Grafo OSINT Maltego',
      badge: 'FC-LAB-006',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-2)' }}>
              Disposición circular concéntrica pasiva (Transforms <code>To MX</code>, <code>To NS</code>, <code>To Netblock</code>, <code>To ASN</code>).
            </p>
            <div className="pill-group" role="group" aria-label="Seleccionar objetivo Maltego">
              {(['tesla.com', 'microsoft.com', 'santototunja.edu.co'] as MaltegoTarget[]).map((target) => (
                <button
                  key={target}
                  type="button"
                  className="filter-pill"
                  aria-pressed={maltegoTarget === target}
                  onClick={() => setMaltegoTarget(target)}
                >
                  {target}
                </button>
              ))}
            </div>
          </div>

          <div className="diagram-frame">
            <svg
              viewBox="0 0 820 380"
              width="100%"
              role="img"
              aria-label={`Grafo OSINT circular de ${maltegoTarget}`}
            >
              <title>Topología OSINT pasiva para {maltegoTarget}</title>
              {/* Concentric Orbit */}
              <circle cx="410" cy="190" r="142" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 4" />

              {/* Spokes */}
              {[
                { x: 165, y: 72 },
                { x: 655, y: 72 },
                { x: 135, y: 190 },
                { x: 685, y: 190 },
                { x: 195, y: 318 },
                { x: 625, y: 318 },
              ].map((pt, idx) => (
                <line key={idx} x1="410" y1="190" x2={pt.x} y2={pt.y} stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.55" />
              ))}

              {/* Center Domain */}
              <circle cx="410" cy="190" r="56" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="410" y="185" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">DOMINIO</text>
              <text x="410" y="204" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="800">
                {maltegoTarget}
              </text>

              {/* Satellite Nodes */}
              {[
                { x: 165, y: 72, tag: 'MX (Correo)', val: mData.mx, stroke: '#c084fc' },
                { x: 655, y: 72, tag: 'NS Autoritativos', val: mData.ns.join(' · '), stroke: '#34d399' },
                { x: 135, y: 190, tag: 'IP Pública', val: mData.ip, stroke: '#fbbf24' },
                { x: 685, y: 190, tag: 'Netblock', val: mData.netblock, stroke: '#38bdf8' },
                { x: 195, y: 318, tag: 'Sistema Autónomo', val: mData.asn, stroke: '#fb7185' },
                { x: 625, y: 318, tag: 'Contacto / Entidad', val: mData.contact, stroke: '#94a3b8' },
              ].map((node) => (
                <g key={node.tag} transform={`translate(${node.x - 115}, ${node.y - 26})`}>
                  <rect width="230" height="52" rx="8" fill="#1e293b" stroke={node.stroke} strokeWidth="1.8" />
                  <text x="115" y="19" textAnchor="middle" fill={node.stroke} fontSize="10" fontWeight="700">
                    {node.tag}
                  </text>
                  <text x="115" y="38" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="600">
                    {node.val.length > 34 ? `${node.val.slice(0, 32)}…` : node.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="card" aria-labelledby="uml-switcher-heading">
      <h2 id="uml-switcher-heading" style={{ fontSize: '1.1rem', fontWeight: 800, marginBlockEnd: '0.85rem' }}>
        Modelado Visual UML & Topología OSINT
      </h2>
      <AccessibleTabs
        label="Diagramas UML y OSINT"
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />
    </section>
  );
}
