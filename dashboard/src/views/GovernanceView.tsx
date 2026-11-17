import { useState } from 'react';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { CodeSnippet } from '../components/CodeSnippet';
import { LifecycleFlowSvg } from '../components/diagrams/LifecycleFlowSvg';
import { ResponsiveTable } from '../components/ResponsiveTable';
import { RaciBadge, TeamBadge } from '../components/SeverityBadge';
import {
  LAB_TEMPLATE_MARKDOWN,
  RACI_MATRIX,
  ROLES_CATALOG,
  TEAM_MEMBERS,
  TECHNICAL_PROTOCOLS,
  TRACEABILITY_MATRIX,
} from '../data/frameworkData';

interface GovernanceViewProps {
  onJumpToLab: (labId: string) => void;
  onAnnounce: (msg: string) => void;
}

export function GovernanceView({ onJumpToLab, onAnnounce }: GovernanceViewProps) {
  const [activeTab, setActiveTab] = useState('phases');

  const tabs = [
    {
      id: 'phases',
      label: 'Arquitectura de 6 Fases',
      badge: 'F01–F06',
      content: (
        <>
          <LifecycleFlowSvg onJumpToLab={onJumpToLab} />
          <div className="cards-grid">
            {TECHNICAL_PROTOCOLS.map((prot) => (
              <article key={prot.title} className="card">
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, marginBlockEnd: '0.55rem', color: 'var(--accent)' }}>
                  {prot.title}
                </h3>
                <ul style={{ fontSize: '0.85rem', color: 'var(--text-2)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {prot.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'raci',
      label: 'Equipo, Roles & Matriz RACI',
      badge: '7 Roles',
      content: (
        <>
          <div className="cards-grid">
            {ROLES_CATALOG.map((role) => (
              <article key={role.code} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.45rem' }}>
                  <span className="badge domain-tag badge-mono">{role.code}</span>
                  <TeamBadge team={role.teamTag} />
                </div>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800, marginBlockEnd: '0.35rem' }}>{role.name}</h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-2)', marginBlockEnd: '0.5rem' }}>{role.description}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>
                  <strong>Entregable:</strong> {role.deliverable}
                </p>
              </article>
            ))}
          </div>

          <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <strong style={{ fontSize: '0.86rem' }}>Leyenda RACI:</strong>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.83rem' }}>
              <RaciBadge code="R" /> Responsable (Ejecuta)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.83rem' }}>
              <RaciBadge code="A" /> Aprobador
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.83rem' }}>
              <RaciBadge code="C" /> Consultado
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.83rem' }}>
              <RaciBadge code="I" /> Informado
            </span>
          </div>

          <ResponsiveTable
            caption="Matriz RACI por Fase Metodológica y Rol (framework/actores_responsabilidades.md)"
            rows={RACI_MATRIX}
            getRowKey={(r) => r.phase}
            columns={[
              { key: 'phase', header: 'Fase ÆVØID', isRowHeader: true, render: (r) => r.phase },
              { key: 'RS', header: 'Resp. Sistema (RS)', render: (r) => <RaciBadge code={r.RS} /> },
              { key: 'CE', header: 'Coord. Eval. (CE)', render: (r) => <RaciBadge code={r.CE} /> },
              { key: 'AO', header: 'Analista Ofensivo (AO)', render: (r) => <RaciBadge code={r.AO} /> },
              { key: 'AD', header: 'Analista Defensivo (AD)', render: (r) => <RaciBadge code={r.AD} /> },
              { key: 'CP', header: 'Coord. Purple (CP)', render: (r) => <RaciBadge code={r.CP} /> },
              { key: 'CUST', header: 'Custodio (CUST)', render: (r) => <RaciBadge code={r.CUST} /> },
              { key: 'EV', header: 'Eval. Calidad (EV)', render: (r) => <RaciBadge code={r.EV} /> },
            ]}
          />

          <ResponsiveTable
            caption="Asignación Real del Equipo de Estudiantes (8° Semestre)"
            rows={TEAM_MEMBERS}
            getRowKey={(m) => m.name}
            columns={[
              { key: 'name', header: 'Integrante', isRowHeader: true, render: (m) => m.name },
              { key: 'role', header: 'Rol Operativo', render: (m) => m.role },
              { key: 'team', header: 'Enfoque', render: (m) => <TeamBadge team={m.teamTag} /> },
              { key: 'focus', header: 'Foco Técnico en los Laboratorios', render: (m) => m.focus },
            ]}
          />
        </>
      ),
    },
    {
      id: 'traceability',
      label: 'Matriz de Trazabilidad',
      badge: '10 Labs',
      content: (
        <ResponsiveTable
          caption="Matriz de Trazabilidad Integral: Instrumento → Dominio → Fase → Caso → Hallazgo → Control (docs/metodologia.md)"
          rows={TRACEABILITY_MATRIX}
          getRowKey={(r) => r.instrument}
          columns={[
            {
              key: 'instrument',
              header: 'Instrumento',
              isRowHeader: true,
              render: (r) => (
                <button
                  type="button"
                  className="btn btn-sm badge-mono"
                  onClick={() => onJumpToLab(r.instrument)}
                >
                  {r.instrument}
                </button>
              ),
            },
            { key: 'domain', header: 'Dominio', render: (r) => <span className="badge domain-tag badge-mono">{r.domain}</span> },
            { key: 'phase', header: 'Fase', render: (r) => r.phase },
            { key: 'cp', header: 'Caso(s) Prueba', render: (r) => <span className="badge-mono">{r.testCases}</span> },
            { key: 'finding', header: 'Hallazgo Asociado', render: (r) => r.finding },
            { key: 'control', header: 'Control Defensivo Aplicado', render: (r) => r.control },
            { key: 'result', header: 'Verificación', render: (r) => <span className="badge sev-low">{r.verificationResult}</span> },
          ]}
        />
      ),
    },
    {
      id: 'template',
      label: 'Plantilla Oficial FC-LAB-XXX',
      badge: 'Markdown',
      content: (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
              Plantilla Estandarizada para Nuevos Laboratorios (plantillas/ficha_laboratorio_template.md)
            </h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-2)', marginBlockStart: '0.25rem' }}>
              Estructura oficial de 7 secciones para documentar prácticas futuras desde FC-LAB-012 en adelante.
            </p>
          </div>
          <CodeSnippet
            caption="plantillas/ficha_laboratorio_template.md"
            language="markdown"
            code={LAB_TEMPLATE_MARKDOWN}
            onAnnounce={onAnnounce}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      <header className="page-header">
        <div>
          <h1 id="main-content" tabIndex={-1} className="page-title">
            Ciclo Metodológico & Gobernanza
          </h1>
          <p className="page-subtitle">
            Arquitectura de 6 fases, roles Purple Team, Matriz RACI, protocolos RoE/custodia y trazabilidad de docs/ y framework/.
          </p>
        </div>
      </header>

      <AccessibleTabs
        label="Secciones de ciclo y gobernanza"
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}
