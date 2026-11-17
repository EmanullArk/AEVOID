import { ArrowUpRight, CheckCircle2, Info, Search, Shield, Terminal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CodeSnippet } from '../components/CodeSnippet';
import { DetailDialog } from '../components/DetailDialog';
import { TeamBadge } from '../components/SeverityBadge';
import { LABS_CATALOG } from '../data/labsData';
import type { LabDetail } from '../types/aevoid';

interface LabsViewProps {
  preselectedLabId?: string | null;
  onClearPreselect?: () => void;
  onAnnounce: (msg: string) => void;
}

export function LabsView({ preselectedLabId, onClearPreselect, onAnnounce }: LabsViewProps) {
  const [query, setQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('Todos');
  const [phaseFilter, setPhaseFilter] = useState('Todas');
  const [selectedLab, setSelectedLab] = useState<LabDetail | null>(null);

  useEffect(() => {
    if (!preselectedLabId) return;
    const match = LABS_CATALOG.find((l) => l.id === preselectedLabId);
    if (match) setSelectedLab(match);
    onClearPreselect?.();
  }, [preselectedLabId, onClearPreselect]);

  const domains = useMemo(
    () => ['Todos', ...Array.from(new Set(LABS_CATALOG.map((l) => l.domainCode)))],
    [],
  );

  const phases = ['Todas', 'Fase 01', 'Fase 02', 'Fase 03', 'Fase 04', 'Fase 05'];

  const filteredLabs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return LABS_CATALOG.filter((lab) => {
      if (domainFilter !== 'Todos' && lab.domainCode !== domainFilter) return false;
      if (phaseFilter !== 'Todas' && !lab.phase.includes(phaseFilter)) return false;
      if (!q) return true;
      return (
        lab.id.toLowerCase().includes(q) ||
        lab.title.toLowerCase().includes(q) ||
        lab.objective.toLowerCase().includes(q) ||
        lab.tools.some((t) => t.toLowerCase().includes(q)) ||
        lab.domainName.toLowerCase().includes(q)
      );
    });
  }, [query, domainFilter, phaseFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      <header className="page-header">
        <div>
          <h1 id="main-content" tabIndex={-1} className="page-title">
            Catálogo de Laboratorios Técnicos (10 Fichas)
          </h1>
          <p className="page-subtitle">
            Fichas estandarizadas de laboratorios/lab-01 a lab-09 y lab-11 con comandos reproducibles y controles Blue Team.
          </p>
        </div>
        <span className="badge domain-tag badge-mono">
          {filteredLabs.length} / {LABS_CATALOG.length} visibles
        </span>
      </header>

      <div className="notice-banner" role="note">
        <Info size={18} aria-hidden="true" style={{ flexShrink: 0, marginBlockStart: '0.1rem' }} />
        <span>
          <strong>Nota de alcance:</strong> <code>laboratorios/lab-10-dvwa-avanzado/README.md</code> (FC-LAB-010) fue omitido de este catálogo según selección del usuario tras bloqueo de lectura por Windows Defender.
        </span>
      </div>

      {/* Filters */}
      <section className="card" aria-label="Filtros de laboratorios" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <div className="input-search-wrap">
            <Search size={16} aria-hidden="true" />
            <label htmlFor="lab-search" className="visually-hidden">
              Buscar laboratorio por nombre, herramienta o comando
            </label>
            <input
              id="lab-search"
              type="search"
              className="input-field"
              placeholder="Buscar por ID, herramienta (Burp, ZAP, Maltego, DVWA)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="phase-select" className="visually-hidden">
              Filtrar por fase
            </label>
            <select
              id="phase-select"
              className="select-field"
              value={phaseFilter}
              onChange={(e) => setPhaseFilter(e.target.value)}
            >
              {phases.map((ph) => (
                <option key={ph} value={ph}>
                  {ph === 'Todas' ? 'Todas las fases' : ph}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pill-group" role="group" aria-label="Filtrar por dominio metodológico">
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-3)' }}>Dominio:</span>
          {domains.map((dom) => (
            <button
              key={dom}
              type="button"
              className="filter-pill"
              aria-pressed={domainFilter === dom}
              onClick={() => setDomainFilter(dom)}
            >
              {dom}
            </button>
          ))}
        </div>
      </section>

      {/* Lab Cards */}
      <div className="cards-grid">
        {filteredLabs.map((lab) => (
          <article
            key={lab.id}
            className="card card-interactive"
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
              <span className="badge sev-medium badge-mono">{lab.id}</span>
              <TeamBadge team={lab.teamCategory} />
            </div>

            <div>
              <h2 style={{ fontSize: '1.02rem', fontWeight: 800, lineHeight: 1.3 }}>{lab.title}</h2>
              <p style={{ fontSize: '0.79rem', color: 'var(--accent)', fontWeight: 600, marginBlockStart: '0.25rem' }}>
                {lab.domainCode} · {lab.domainName}
              </p>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{lab.objective}</p>

            <div className="pill-group" style={{ marginBlockStart: 'auto' }}>
              {lab.tools.slice(0, 4).map((tool) => (
                <span key={tool} className="badge domain-tag badge-mono" style={{ fontSize: '0.72rem' }}>
                  {tool}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', paddingBlockStart: '0.5rem', borderBlockStart: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-3)' }}>{lab.phase.split('&')[0].trim()}</span>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setSelectedLab(lab)}
              >
                <span>Ver Ficha</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Native <dialog> Inspector */}
      <DetailDialog
        open={selectedLab !== null}
        onClose={() => setSelectedLab(null)}
        title={selectedLab ? `${selectedLab.id} — ${selectedLab.title}` : 'Detalle'}
        subtitle={
          selectedLab
            ? `${selectedLab.domainCode} (${selectedLab.domainName}) · ${selectedLab.phase} · ${selectedLab.focus}`
            : undefined
        }
      >
        {selectedLab && (
          <>
            <div className="pill-group">
              <TeamBadge team={selectedLab.teamCategory} />
              <span className="badge domain-tag badge-mono">laboratorios/{selectedLab.slug}/README.md</span>
              {selectedLab.standardRef && <span className="badge sev-high">{selectedLab.standardRef}</span>}
            </div>

            <section>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBlockEnd: '0.35rem' }}>Objetivo Técnico</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)' }}>{selectedLab.objective}</p>
            </section>

            <section
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
                gap: '0.75rem',
              }}
            >
              <div className="card" style={{ padding: '0.85rem', backgroundColor: 'var(--surface-2)' }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--team-red)' }}>Analista Ofensivo</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-2)', marginBlockStart: '0.25rem' }}>{selectedLab.roles.offensive}</p>
              </div>
              <div className="card" style={{ padding: '0.85rem', backgroundColor: 'var(--surface-2)' }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--team-blue)' }}>Analista Defensivo</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-2)', marginBlockStart: '0.25rem' }}>{selectedLab.roles.defensive}</p>
              </div>
              <div className="card" style={{ padding: '0.85rem', backgroundColor: 'var(--surface-2)' }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--team-purple)' }}>Evaluador Purple Team</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-2)', marginBlockStart: '0.25rem' }}>{selectedLab.roles.reviewer}</p>
              </div>
            </section>

            <section>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBlockEnd: '0.4rem' }}>Entorno y Targets</h3>
              <ul style={{ fontSize: '0.87rem', color: 'var(--text-2)', margin: 0 }}>
                {selectedLab.environment.map((env) => (
                  <li key={env}>{env}</li>
                ))}
              </ul>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={16} aria-hidden="true" />
                <span>Procedimiento Paso a Paso</span>
              </h3>
              {selectedLab.steps.map((step, i) => (
                <div
                  key={step.title}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <strong style={{ fontSize: '0.9rem' }}>
                    Paso {i + 1}: {step.title}
                  </strong>
                  {step.normalBehavior && (
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-3)' }}>
                      <strong>Comportamiento normal:</strong> {step.normalBehavior}
                    </p>
                  )}
                  {step.commands && step.commands.length > 0 && (
                    <CodeSnippet
                      language={step.commandLang ?? 'bash'}
                      caption={`Comandos / Payloads — ${step.title}`}
                      code={step.commands.join('\n')}
                      onAnnounce={onAnnounce}
                    />
                  )}
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>
                    <strong>Observación:</strong> {step.observation}
                  </p>
                </div>
              ))}
            </section>

            {selectedLab.comparisonTable && (
              <section>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBlockEnd: '0.45rem' }}>
                  {selectedLab.comparisonTable.title}
                </h3>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        {selectedLab.comparisonTable.headers.map((h) => (
                          <th key={h} scope="col">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedLab.comparisonTable.rows.map((row, idx) => (
                        <tr key={idx}>
                          {row.map((cell, cIdx) =>
                            cIdx === 0 ? (
                              <th key={cIdx} scope="row">{cell}</th>
                            ) : (
                              <td key={cIdx}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {selectedLab.qaNotes && (
              <section>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBlockEnd: '0.4rem' }}>
                  Cuestionario de Análisis
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedLab.qaNotes.map((qa) => (
                    <div key={qa.question} style={{ padding: '0.7rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-2)' }}>
                      <strong style={{ display: 'block', fontSize: '0.86rem' }}>{qa.question}</strong>
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-2)' }}>{qa.answer}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section
              style={{
                padding: '0.9rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'color-mix(in oklab, var(--team-blue) 10%, var(--surface-2))',
                border: '1px solid color-mix(in oklab, var(--team-blue) 40%, transparent)',
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--team-blue)', marginBlockEnd: '0.4rem' }}>
                <Shield size={16} aria-hidden="true" />
                <span>Análisis Defensivo (Blue Team)</span>
              </h3>
              <ul style={{ fontSize: '0.86rem', color: 'var(--text-2)', margin: 0 }}>
                {selectedLab.blueTeamAnalysis.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-2)' }}>
              <CheckCircle2 size={17} aria-hidden="true" style={{ color: 'var(--sev-low)', flexShrink: 0, marginBlockStart: '0.15rem' }} />
              <div>
                <strong>Criterio de Aceptación:</strong> {selectedLab.acceptanceCriteria}
              </div>
            </section>
          </>
        )}
      </DetailDialog>
    </div>
  );
}
