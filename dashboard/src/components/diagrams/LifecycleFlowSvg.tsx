import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { useState } from 'react';
import { FRAMEWORK_PHASES } from '../../data/frameworkData';

interface LifecycleFlowProps {
  compact?: boolean;
  onJumpToLab?: (labId: string) => void;
}

export function LifecycleFlowSvg({ compact = false, onJumpToLab }: LifecycleFlowProps) {
  const [selectedId, setSelectedId] = useState<string>('F1');
  const activePhase = FRAMEWORK_PHASES.find((p) => p.id === selectedId) ?? FRAMEWORK_PHASES[0];

  return (
    <section className="card" aria-labelledby="lifecycle-heading">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBlockEnd: '1rem' }}>
        <div>
          <h2 id="lifecycle-heading" style={{ fontSize: '1.08rem', fontWeight: 800 }}>
            Ciclo Iterativo de 6 Fases — ÆVØID
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-3)' }}>
            Selecciona una fase para inspeccionar entradas, actividades, salidas y criterio de cierre.
          </p>
        </div>
        <span className="badge team-purple">
          <Layers size={13} aria-hidden="true" />
          <span>Retroalimentación continua F6 → F2 / F1</span>
        </span>
      </div>

      {/* Interactive Flowchart Nodes */}
      <div
        role="group"
        aria-label="Fases interactivas del ciclo ÆVØID"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 10.2rem), 1fr))',
          gap: '0.6rem',
          marginBlockEnd: '1rem',
        }}
      >
        {FRAMEWORK_PHASES.map((phase) => {
          const isSelected = phase.id === selectedId;
          return (
            <button
              key={phase.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedId(phase.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.28rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--border-strong)'}`,
                backgroundColor: isSelected
                  ? 'color-mix(in oklab, var(--accent) 15%, var(--surface-2))'
                  : 'var(--surface-2)',
                cursor: 'pointer',
                textAlign: 'start',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                }}
              >
                FASE {phase.number}
              </span>
              <span style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-1)' }}>
                {phase.name}
              </span>
              <span style={{ fontSize: '0.77rem', color: 'var(--text-3)', lineHeight: 1.35 }}>
                {phase.shortTag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Iterative Flow Visual SVG */}
      {!compact && (
        <div className="diagram-frame" style={{ marginBlockEnd: '1rem' }}>
          <svg
            viewBox="0 0 980 185"
            width="100%"
            role="img"
            aria-label="Diagrama de flujo iterativo de las 6 fases de ÆVØID"
          >
            <title>Flujo secuencial F01 a F06 con retorno de verificación a Prevención y Preparación</title>
            <defs>
              <marker id="flowArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
              <marker id="loopArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#c084fc" />
              </marker>
            </defs>

            {FRAMEWORK_PHASES.map((phase, i) => {
              const x = 18 + i * 160;
              const isSelected = phase.id === selectedId;
              return (
                <g
                  key={phase.id}
                  onClick={() => setSelectedId(phase.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <rect
                    x={x}
                    y="28"
                    width="136"
                    height="68"
                    rx="10"
                    fill={isSelected ? '#16304b' : '#1e293b'}
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />
                  <text x={x + 68} y="52" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="700">
                    FASE {phase.number}
                  </text>
                  <text x={x + 68} y="73" textAnchor="middle" fill="#f8fafc" fontSize="13.5" fontWeight="700">
                    {phase.name}
                  </text>
                  {i < 5 && (
                    <line
                      x1={x + 136}
                      y1="62"
                      x2={x + 158}
                      y2="62"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      markerEnd="url(#flowArrow)"
                    />
                  )}
                </g>
              );
            })}

            {/* Feedback loops */}
            <path
              d="M 886 96 L 886 136 L 246 136 L 246 102"
              fill="none"
              stroke="#c084fc"
              strokeWidth="2"
              strokeDasharray="6 4"
              markerEnd="url(#loopArrow)"
            />
            <text x="566" y="130" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="600">
              Retroalimentación continua a controles defensivos (F6 → F2)
            </text>

            <path
              d="M 902 96 L 902 164 L 86 164 L 86 102"
              fill="none"
              stroke="#34d399"
              strokeWidth="1.8"
              strokeDasharray="4 4"
              markerEnd="url(#loopArrow)"
            />
            <text x="494" y="178" textAnchor="middle" fill="#34d399" fontSize="10.5" fontWeight="600">
              Ampliación de alcance / Nuevos entornos (F6 → F1)
            </text>
          </svg>
        </div>
      )}

      {/* Selected Phase Inspector */}
      <div
        style={{
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--surface-2)',
          border: '1px solid var(--border-strong)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.02rem', fontWeight: 800 }}>
            Fase {activePhase.number}: {activePhase.name}
          </h3>
          <span className="badge sev-low">
            <CheckCircle2 size={13} aria-hidden="true" />
            <span>Cierre: {activePhase.closureCriteria}</span>
          </span>
        </div>

        <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>{activePhase.summary}</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
            gap: '0.85rem',
          }}
        >
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-3)', marginBlockEnd: '0.35rem' }}>
              Entradas
            </h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-2)', margin: 0 }}>
              {activePhase.inputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-3)', marginBlockEnd: '0.35rem' }}>
              Actividades Clave
            </h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-2)', margin: 0 }}>
              {activePhase.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-3)', marginBlockEnd: '0.35rem' }}>
              Salidas
            </h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-2)', margin: 0 }}>
              {activePhase.outputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {activePhase.relatedLabs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-3)' }}>
              Instrumentos vinculados:
            </span>
            {activePhase.relatedLabs.map((labId) =>
              onJumpToLab ? (
                <button
                  key={labId}
                  type="button"
                  className="btn btn-sm"
                  onClick={() => onJumpToLab(labId)}
                >
                  <span className="badge-mono">{labId}</span>
                  <ArrowRight size={13} aria-hidden="true" />
                </button>
              ) : (
                <span key={labId} className="badge domain-tag badge-mono">
                  {labId}
                </span>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
