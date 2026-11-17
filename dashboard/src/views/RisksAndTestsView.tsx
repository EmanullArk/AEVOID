import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { ResponsiveTable } from '../components/ResponsiveTable';
import { SeverityBadge } from '../components/SeverityBadge';
import {
  RISK_FINDINGS,
  RISK_MATRIX_GRID,
  SEVERITY_RUBRIC_SLAS,
  TEST_CASES_MATRIX,
  TEST_EVALUATIONS,
} from '../data/resultsData';
import type { SeverityLevel } from '../types/aevoid';

const HEATMAP_STYLE: Record<SeverityLevel, string> = {
  Crítica: 'sev-critical',
  Alta: 'sev-high',
  Media: 'sev-medium',
  Baja: 'sev-low',
  Informativa: 'sev-info',
};

export function RisksAndTestsView() {
  const [activeTab, setActiveTab] = useState('risks');
  const [sevFilter, setSevFilter] = useState<SeverityLevel | 'Todas'>('Todas');
  const [probImpactFilter, setProbImpactFilter] = useState<{ prob: string; impact: string } | null>(null);
  const [query, setQuery] = useState('');

  const filteredRisks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RISK_FINDINGS.filter((item) => {
      if (sevFilter !== 'Todas' && item.severity !== sevFilter) return false;
      if (probImpactFilter && (item.probability !== probImpactFilter.prob || item.impact !== probImpactFilter.impact)) {
        return false;
      }
      if (!q) return true;
      return (
        item.id.toLowerCase().includes(q) ||
        item.asset.toLowerCase().includes(q) ||
        item.vulnerability.toLowerCase().includes(q) ||
        item.treatment.toLowerCase().includes(q)
      );
    });
  }, [sevFilter, probImpactFilter, query]);

  const filteredCases = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TEST_CASES_MATRIX;
    return TEST_CASES_MATRIX.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.tool.toLowerCase().includes(q) ||
        c.objective.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q),
    );
  }, [query]);

  const tabs = [
    {
      id: 'risks',
      label: 'Matriz de Riesgos (H-01–H-16)',
      badge: '16',
      content: (
        <>
          <div className="grid-2">
            {/* Interactive 4x4 Matrix */}
            <section className="card" aria-labelledby="matrix-4x4-heading">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: '0.75rem' }}>
                <div>
                  <h2 id="matrix-4x4-heading" style={{ fontSize: '1rem', fontWeight: 800 }}>
                    Matriz Probabilidad × Impacto (framework/matrices.md)
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>
                    Pulsa una celda para filtrar los hallazgos H-01 a H-16 por esa combinación exacta.
                  </p>
                </div>
                {probImpactFilter && (
                  <button type="button" className="btn btn-sm" onClick={() => setProbImpactFilter(null)}>
                    Limpiar celda
                  </button>
                )}
              </div>

              <div className="heatmap-grid" role="group" aria-label="Celdas de probabilidad e impacto">
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-3)', alignSelf: 'center' }}>
                  Prob. \ Imp.
                </div>
                {['Bajo (1)', 'Medio (2)', 'Alto (3)', 'Crítico (4)'].map((h) => (
                  <div key={h} style={{ textAlign: 'center', fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-2)' }}>
                    {h}
                  </div>
                ))}

                {RISK_MATRIX_GRID.map((row) => (
                  <div key={row.probability} style={{ display: 'contents' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-2)', display: 'flex', alignItems: 'center' }}>
                      {row.probability} ({row.probScore})
                    </div>
                    {row.cells.map((cell) => {
                      const matchesCount = RISK_FINDINGS.filter(
                        (f) => f.probability === row.probability && f.impact === cell.impact,
                      ).length;
                      const isPressed =
                        probImpactFilter?.prob === row.probability && probImpactFilter?.impact === cell.impact;
                      return (
                        <button
                          key={`${row.probability}-${cell.impact}`}
                          type="button"
                          className={`heatmap-cell ${HEATMAP_STYLE[cell.severity]}`}
                          aria-pressed={isPressed}
                          onClick={() =>
                            setProbImpactFilter((prev) =>
                              prev?.prob === row.probability && prev?.impact === cell.impact
                                ? null
                                : { prob: row.probability, impact: cell.impact },
                            )
                          }
                        >
                          <span>{cell.severity}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                            {matchesCount} {matchesCount === 1 ? 'hallazgo' : 'hallazgos'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>

            {/* SLA Rubrics */}
            <section className="card" aria-labelledby="sla-heading">
              <h2 id="sla-heading" style={{ fontSize: '1rem', fontWeight: 800, marginBlockEnd: '0.75rem' }}>
                Rúbrica CVSS y Tiempos de Atención (SLAs)
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {SEVERITY_RUBRIC_SLAS.map((item) => (
                  <div
                    key={item.severity}
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBlockEnd: '0.25rem' }}>
                      <SeverityBadge severity={item.severity} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-2)' }}>
                        CVSS {item.cvss} · {item.sla}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="pill-group" role="group" aria-label="Filtrar por severidad global">
            {(['Todas', 'Crítica', 'Alta', 'Media', 'Baja'] as const).map((sev) => (
              <button
                key={sev}
                type="button"
                className="filter-pill"
                aria-pressed={sevFilter === sev}
                onClick={() => setSevFilter(sev)}
              >
                {sev}
              </button>
            ))}
          </div>

          <ResponsiveTable
            caption="Anexo B: Matriz de Hallazgos y Riesgos (anexos/anexo_b_matriz_riesgos.md)"
            rows={filteredRisks}
            getRowKey={(r) => r.id}
            columns={[
              { key: 'id', header: 'ID', isRowHeader: true, render: (r) => <span className="badge-mono">{r.id}</span> },
              { key: 'asset', header: 'Activo Afectado', render: (r) => r.asset },
              { key: 'vuln', header: 'Vulnerabilidad', render: (r) => r.vulnerability },
              { key: 'prob', header: 'Prob. / Imp.', render: (r) => `${r.probability} / ${r.impact}` },
              { key: 'sev', header: 'Severidad', render: (r) => <SeverityBadge severity={r.severity} /> },
              { key: 'treat', header: 'Tratamiento Propuesto', render: (r) => r.treatment },
            ]}
          />
        </>
      ),
    },
    {
      id: 'evaluations',
      label: 'Evaluación Técnica (P01–P11)',
      badge: '11',
      content: (
        <ResponsiveTable
          caption="Matriz de Evaluación de Pruebas Técnicas (resultados/matriz_evaluacion_pruebas.md)"
          rows={TEST_EVALUATIONS}
          getRowKey={(r) => r.id}
          columns={[
            { key: 'id', header: 'ID', isRowHeader: true, render: (r) => <span className="badge-mono">{r.id}</span> },
            { key: 'name', header: 'Prueba & Instrumento', render: (r) => `${r.name} (${r.instrument})` },
            { key: 'leads', header: 'Líderes', render: (r) => r.leads },
            { key: 'expected', header: 'Resultado Esperado', render: (r) => r.expected },
            { key: 'obtained', header: 'Resultado Obtenido', render: (r) => r.obtained },
            { key: 'severity', header: 'Severidad', render: (r) => <SeverityBadge severity={r.severity} /> },
            { key: 'status', header: 'Estado', render: (r) => <span className="badge domain-tag">{r.status}</span> },
          ]}
        />
      ),
    },
    {
      id: 'testcases',
      label: 'Casos de Prueba (CP-01–CP-20)',
      badge: '20',
      content: (
        <ResponsiveTable
          caption="Anexo A: Matriz de Casos de Prueba (anexos/anexo_a_matriz_pruebas.md)"
          rows={filteredCases}
          getRowKey={(r) => r.code}
          columns={[
            { key: 'code', header: 'Caso', isRowHeader: true, render: (r) => <span className="badge-mono">{r.code}</span> },
            { key: 'dom', header: 'Dominio / Fase', render: (r) => `${r.domain} · F${r.phase}` },
            { key: 'tool', header: 'Herramienta', render: (r) => <strong>{r.tool}</strong> },
            { key: 'obj', header: 'Objetivo Específico', render: (r) => r.objective },
            { key: 'params', header: 'Parámetros / Comandos', render: (r) => <code style={{ fontSize: '0.78rem' }}>{r.params}</code> },
            { key: 'ok', header: 'Criterio de Éxito', render: (r) => r.successCriteria },
          ]}
        />
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      <header className="page-header">
        <div>
          <h1 id="main-content" tabIndex={-1} className="page-title">
            Riesgos, Hallazgos y Casos de Prueba
          </h1>
          <p className="page-subtitle">
            Consolidación de resultados/matriz_evaluacion_pruebas.md, framework/matrices.md, Anexo A (CP-01–CP-20) y Anexo B (H-01–H-16).
          </p>
        </div>
        <div className="input-search-wrap" style={{ maxInlineSize: '22rem' }}>
          <Search size={16} aria-hidden="true" />
          <label htmlFor="risk-search" className="visually-hidden">
            Buscar hallazgos o casos de prueba
          </label>
          <input
            id="risk-search"
            type="search"
            className="input-field"
            placeholder="Filtrar por activo, vulnerabilidad, herramienta..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <AccessibleTabs
        label="Matrices de riesgos y pruebas"
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}
