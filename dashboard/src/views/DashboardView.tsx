import { ArrowRight, ExternalLink, FlaskConical, ShieldCheck, Users } from 'lucide-react';
import { DomainCoverageBars, SeverityDonutChart } from '../components/diagrams/ChartsSvg';
import { LifecycleFlowSvg } from '../components/diagrams/LifecycleFlowSvg';
import { ResponsiveTable } from '../components/ResponsiveTable';
import { SeverityBadge, TeamBadge } from '../components/SeverityBadge';
import { FRAMEWORK_META, TEAM_MEMBERS } from '../data/frameworkData';
import { LABS_CATALOG } from '../data/labsData';
import { KPI_METRICS, TEST_EVALUATIONS } from '../data/resultsData';
import type { ViewId } from '../types/aevoid';

interface DashboardViewProps {
  onNavigate: (view: ViewId, preselectLabId?: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
      {/* Hero Banner */}
      <section className="hero-banner" aria-labelledby="main-content">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ maxInlineSize: '64ch' }}>
            <div className="pill-group" style={{ marginBlockEnd: '0.55rem' }}>
              <span className="badge team-purple">Purple Team Framework</span>
              <span className="badge domain-tag badge-mono">v{FRAMEWORK_META.version}</span>
              <span className="badge sev-low">{FRAMEWORK_META.date}</span>
            </div>
            <h1 id="main-content" tabIndex={-1} className="page-title">
              {FRAMEWORK_META.fullTitle}
            </h1>
            <p className="page-subtitle">{FRAMEWORK_META.vision}</p>
          </div>

          <div className="pill-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigate('labs')}
            >
              <FlaskConical size={16} aria-hidden="true" />
              <span>Explorar {LABS_CATALOG.length} Laboratorios</span>
            </button>
            <a
              href={FRAMEWORK_META.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <span>Evidencias Google Drive</span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-meta-grid">
          <div className="meta-chip">
            <span className="meta-chip-label">Institución</span>
            <span className="meta-chip-val">{FRAMEWORK_META.institution}</span>
          </div>
          <div className="meta-chip">
            <span className="meta-chip-label">Programa & Espacio Académico</span>
            <span className="meta-chip-val">{FRAMEWORK_META.faculty} · {FRAMEWORK_META.course}</span>
          </div>
          <div className="meta-chip">
            <span className="meta-chip-label">Docente Responsable</span>
            <span className="meta-chip-val">{FRAMEWORK_META.professor}</span>
          </div>
          <div className="meta-chip">
            <span className="meta-chip-label">Catálogo en Dashboard</span>
            <span className="meta-chip-val">10 fichas MD (FC-LAB-010 omitido)</span>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section aria-labelledby="kpi-section-title">
        <h2 id="kpi-section-title" style={{ fontSize: '1.08rem', fontWeight: 800, marginBlockEnd: '0.75rem' }}>
          Indicadores Clave del Ciclo de Evaluación (resultados/indicadores_metricas.md)
        </h2>
        <div className="kpi-grid">
          {KPI_METRICS.map((kpi) => (
            <article key={kpi.id} className="kpi-card">
              <span className="kpi-label">{kpi.name}</span>
              <span className="kpi-value">{kpi.valueLabel}</span>
              <span className="kpi-note">{kpi.highlight}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-3)' }}>
                {kpi.formula}
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Visual Analytics Row */}
      <div className="grid-2">
        <SeverityDonutChart />
        <DomainCoverageBars />
      </div>

      {/* Interactive 6-Phase Flow */}
      <LifecycleFlowSvg
        compact
        onJumpToLab={(labId) => onNavigate('labs', labId)}
      />

      {/* Team & Principles */}
      <div className="grid-2">
        <section className="card" aria-labelledby="team-heading">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.85rem' }}>
            <h2 id="team-heading" style={{ fontSize: '1.05rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <Users size={18} aria-hidden="true" />
              <span>Equipo ÆVØID (Modelo Purple Team)</span>
            </h2>
            <button type="button" className="btn btn-sm" onClick={() => onNavigate('governance')}>
              <span>Ver Matriz RACI</span>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {TEAM_MEMBERS.map((member) => (
              <li
                key={member.name}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                  <strong style={{ fontSize: '0.9rem' }}>
                    {member.name} {member.alias ? `(${member.alias})` : ''}
                  </strong>
                  <TeamBadge team={member.teamTag} />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{member.role}</span>
                <span style={{ fontSize: '0.79rem', color: 'var(--text-3)' }}>{member.driveDeliverable}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card" aria-labelledby="principles-heading">
          <h2 id="principles-heading" style={{ fontSize: '1.05rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBlockEnd: '0.85rem' }}>
            <ShieldCheck size={18} aria-hidden="true" />
            <span>Principios Rectores & Objetivo General</span>
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-2)', marginBlockEnd: '0.9rem' }}>
            {FRAMEWORK_META.generalObjective}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {FRAMEWORK_META.principles.map((pr) => (
              <li
                key={pr.title}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-2)',
                  borderInlineStart: '3px solid var(--accent)',
                }}
              >
                <strong style={{ display: 'block', fontSize: '0.88rem' }}>{pr.title}</strong>
                <span style={{ fontSize: '0.81rem', color: 'var(--text-3)' }}>{pr.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Quick Summary Table of P01-P11 */}
      <section aria-labelledby="summary-tests-heading">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem', marginBlockEnd: '0.65rem' }}>
          <h2 id="summary-tests-heading" style={{ fontSize: '1.08rem', fontWeight: 800 }}>
            Resumen de Evaluación Técnica Consolidada (P01–P11)
          </h2>
          <button type="button" className="btn btn-sm" onClick={() => onNavigate('risks')}>
            <span>Abrir Riesgos y Casos CP-01–CP-20</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>

        <ResponsiveTable
          caption="Pruebas técnicas consolidadas en resultados/matriz_evaluacion_pruebas.md"
          rows={TEST_EVALUATIONS}
          getRowKey={(r) => r.id}
          columns={[
            {
              key: 'id',
              header: 'ID',
              isRowHeader: true,
              render: (r) => <span className="badge-mono">{r.id}</span>,
            },
            {
              key: 'name',
              header: 'Prueba Técnica',
              render: (r) => (
                <div>
                  <strong>{r.name}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                    {r.instrument}
                  </div>
                </div>
              ),
            },
            {
              key: 'leads',
              header: 'Responsables',
              render: (r) => r.leads,
            },
            {
              key: 'severity',
              header: 'Severidad',
              render: (r) => <SeverityBadge severity={r.severity} />,
            },
            {
              key: 'status',
              header: 'Estado',
              render: (r) => <span className="badge domain-tag">{r.status}</span>,
            },
          ]}
        />
      </section>
    </div>
  );
}
