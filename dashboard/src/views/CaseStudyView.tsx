import { CheckCircle2, KeyRound, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { UmlDiagrams } from '../components/diagrams/UmlDiagrams';
import { ResponsiveTable } from '../components/ResponsiveTable';
import { AUTH_PLATFORMS_COMPARISON, CASE_STUDY_LESSONS } from '../data/caseStudyAndGlossaryData';

export function CaseStudyView() {
  const [b64Input, setB64Input] = useState('dXN1YXJpb191c3Rh');

  const decodedText = (() => {
    try {
      const cleaned = b64Input.trim();
      if (!cleaned) return '(vacío)';
      const bytes = Uint8Array.from(atob(cleaned), (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      return 'Cadena Base64 inválida';
    }
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      <header className="page-header">
        <div>
          <h1 id="main-content" tabIndex={-1} className="page-title">
            Caso de Estudio: Autenticación Web & Modelado UML
          </h1>
          <p className="page-subtitle">
            Análisis comparativo de 4 plataformas (FC-LAB-007 + FC-LAB-011), anti-enumeración de usuarios y modelado UML completo de casos-estudio/.
          </p>
        </div>
      </header>

      <ResponsiveTable
        caption="Comparativa de Solicitudes, Formatos y Respuestas Anti-Enumeración (casos-estudio/caso_autenticacion_web.md)"
        rows={AUTH_PLATFORMS_COMPARISON}
        getRowKey={(r) => r.platform}
        columns={[
          {
            key: 'platform',
            header: 'Plataforma',
            isRowHeader: true,
            render: (r) => (
              <div>
                <strong>{r.platform}</strong>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-3)' }}>{r.category}</div>
              </div>
            ),
          },
          {
            key: 'endpoint',
            header: 'Endpoint & Método',
            render: (r) => (
              <div>
                <span className="badge sev-medium badge-mono">{r.method}</span>{' '}
                <code style={{ fontSize: '0.78rem' }}>{r.endpoint}</code>
              </div>
            ),
          },
          {
            key: 'format',
            header: 'Formato Payload',
            render: (r) => (
              <div>
                <strong>{r.payloadFormat}</strong>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-3)', marginBlockStart: '0.2rem' }}>
                  {r.samplePayload}
                </div>
              </div>
            ),
          },
          {
            key: 'protections',
            header: 'Controles Observados',
            render: (r) => (
              <ul style={{ margin: 0, paddingInlineStart: '1rem', fontSize: '0.82rem' }}>
                {r.protections.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ),
          },
          {
            key: 'response',
            header: 'Respuesta ante Error',
            render: (r) => (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.82rem' }}>{r.errorResponse}</span>
                {r.antiEnumeration && (
                  <span className="badge sev-low" style={{ alignSelf: 'flex-start' }}>
                    <CheckCircle2 size={12} aria-hidden="true" />
                    <span>Anti-Enumeración</span>
                  </span>
                )}
              </div>
            ),
          },
        ]}
      />

      {/* Interactive Base64 Educational Widget */}
      <section className="card" aria-labelledby="b64-demo-heading">
        <h2 id="b64-demo-heading" style={{ fontSize: '1.02rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBlockEnd: '0.5rem' }}>
          <KeyRound size={17} aria-hidden="true" />
          <span>Demostración Interactiva: Por qué Base64 no es Cifrado (SAC USTA)</span>
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', marginBlockEnd: '0.75rem' }}>
          Cualquier proxy interceptor decodifica Base64 al instante sin llave secreta. Prueba decodificar una cadena de ejemplo:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 16rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <label htmlFor="b64-input" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-2)' }}>
              Entrada en Base64
            </label>
            <input
              id="b64-input"
              type="text"
              className="input-field badge-mono"
              value={b64Input}
              onChange={(e) => setB64Input(e.target.value)}
            />
          </div>
          <div className="pill-group">
            <button type="button" className="btn btn-sm" onClick={() => setB64Input('dXN1YXJpb191c3Rh')}>
              Probar usuario
            </button>
            <button type="button" className="btn btn-sm" onClick={() => setB64Input('Y2xhdmVfZGVfcHJ1ZWJh')}>
              Probar clave
            </button>
          </div>
          <div
            style={{
              flex: '1 1 16rem',
              padding: '0.55rem 0.8rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--border-strong)',
            }}
          >
            <span style={{ display: 'block', fontSize: '0.74rem', color: 'var(--text-3)' }}>Salida decodificada (UTF-8)</span>
            <code style={{ fontSize: '0.92rem', color: 'var(--accent)', fontWeight: 700 }}>{decodedText}</code>
          </div>
        </div>
      </section>

      {/* UML & Maltego Diagrams */}
      <UmlDiagrams />

      {/* Lessons Learned */}
      <section aria-labelledby="lessons-heading">
        <h2 id="lessons-heading" style={{ fontSize: '1.05rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBlockEnd: '0.75rem' }}>
          <Lightbulb size={18} aria-hidden="true" />
          <span>Lecciones Aprendidas por el Equipo</span>
        </h2>
        <div className="cards-grid">
          {CASE_STUDY_LESSONS.map((lesson, idx) => (
            <article key={lesson.title} className="card">
              <span className="badge sev-medium badge-mono" style={{ marginBlockEnd: '0.45rem' }}>
                Lección 0{idx + 1}
              </span>
              <h3 style={{ fontSize: '0.96rem', fontWeight: 800, marginBlockEnd: '0.35rem' }}>{lesson.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{lesson.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
