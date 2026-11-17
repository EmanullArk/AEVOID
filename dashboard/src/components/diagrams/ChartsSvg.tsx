import { useState } from 'react';
import { RISK_FINDINGS, TEST_EVALUATIONS } from '../../data/resultsData';
import type { SeverityLevel } from '../../types/aevoid';
import { SeverityBadge } from '../SeverityBadge';

interface SegmentItem {
  severity: SeverityLevel;
  count: number;
  color: string;
}

const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  Crítica: '#fb7185',
  Alta: '#fbbf24',
  Media: '#38bdf8',
  Baja: '#34d399',
  Informativa: '#94a3b8',
};

const ORDER: SeverityLevel[] = ['Crítica', 'Alta', 'Media', 'Baja', 'Informativa'];

export function SeverityDonutChart() {
  const [dataset, setDataset] = useState<'findings' | 'tests'>('findings');

  const sourceList =
    dataset === 'findings'
      ? RISK_FINDINGS.map((f) => f.severity)
      : TEST_EVALUATIONS.map((t) => t.severity);

  const total = sourceList.length;
  const segments: SegmentItem[] = ORDER.map((severity) => ({
    severity,
    count: sourceList.filter((s) => s === severity).length,
    color: SEVERITY_COLORS[severity],
  })).filter((item) => item.count > 0);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  const arcs = segments.reduce<
    Array<SegmentItem & { length: number; offset: number }>
  >((acc, seg) => {
    const prevUsed = acc.reduce((sum, item) => sum + item.length, 0);
    const length = (seg.count / total) * circumference;
    acc.push({ ...seg, length, offset: prevUsed });
    return acc;
  }, []);

  return (
    <section className="card" aria-labelledby="severity-chart-heading">
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.65rem', marginBlockEnd: '1rem' }}>
        <div>
          <h2 id="severity-chart-heading" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
            Distribución por Severidad
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>
            {dataset === 'findings' ? 'Anexo B: 16 Hallazgos (H-01 a H-16)' : 'Resultados: 11 Pruebas (P01 a P11)'}
          </p>
        </div>
        <div className="pill-group" role="group" aria-label="Cambiar conjunto de severidad">
          <button
            type="button"
            className="filter-pill"
            aria-pressed={dataset === 'findings'}
            onClick={() => setDataset('findings')}
          >
            Hallazgos (16)
          </button>
          <button
            type="button"
            className="filter-pill"
            aria-pressed={dataset === 'tests'}
            onClick={() => setDataset('tests')}
          >
            Pruebas (11)
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.35rem', justifyContent: 'center' }}>
        <svg
          width="170"
          height="170"
          viewBox="0 0 160 160"
          role="img"
          aria-label={`Gráfico circular de severidad sobre ${total} registros`}
          style={{ flexShrink: 0 }}
        >
          <title>
            Distribución de severidad:{' '}
            {segments.map((s) => `${s.severity} ${s.count}`).join(', ')}
          </title>
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--surface-3)"
            strokeWidth="22"
          />
          {arcs.map((arc) => (
            <circle
              key={arc.severity}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={arc.color}
              strokeWidth="22"
              strokeDasharray={`${arc.length} ${circumference - arc.length}`}
              strokeDashoffset={-arc.offset}
              transform="rotate(-90 80 80)"
            />
          ))}
          <text
            x="80"
            y="76"
            textAnchor="middle"
            fill="var(--text-1)"
            fontSize="24"
            fontWeight="800"
            fontFamily="var(--font-mono)"
          >
            {total}
          </text>
          <text x="80" y="96" textAnchor="middle" fill="var(--text-3)" fontSize="11" fontWeight="600">
            {dataset === 'findings' ? 'Hallazgos' : 'Pruebas'}
          </text>
        </svg>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            flex: '1 1 12rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {segments.map((seg) => {
            const pct = Math.round((seg.count / total) * 100);
            return (
              <li
                key={seg.severity}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  padding: '0.32rem 0.55rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface-2)',
                }}
              >
                <SeverityBadge severity={seg.severity} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', fontWeight: 700 }}>
                  {seg.count} ({pct}%)
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const DOMAIN_SUMMARY = [
  { code: 'D01', label: 'Entornos y Sistemas', labs: 1, cases: 1, color: '#94a3b8' },
  { code: 'D02', label: 'Reconocimiento y OSINT', labs: 2, cases: 2, color: '#38bdf8' },
  { code: 'D03', label: 'Seguridad Web (DVWA / HTTrack)', labs: 2, cases: 8, color: '#fb7185' },
  { code: 'D03/D04', label: 'Web, APIs & DAST (Burp / ZAP)', labs: 2, cases: 3, color: '#c084fc' },
  { code: 'D05', label: 'Factor Humano e Ing. Social', labs: 1, cases: 1, color: '#fbbf24' },
  { code: 'D06', label: 'Forense Digital y Estego (DFIR)', labs: 1, cases: 3, color: '#34d399' },
  { code: 'D08', label: 'Seguridad de IA y LLMs', labs: 1, cases: 2, color: '#38bdf8' },
];

export function DomainCoverageBars() {
  const maxCases = 8;

  return (
    <section className="card" aria-labelledby="domain-bars-heading">
      <div style={{ marginBlockEnd: '1rem' }}>
        <h2 id="domain-bars-heading" style={{ fontSize: '1.05rem', fontWeight: 800 }}>
          Cobertura por Dominio Metodológico (D01–D08)
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-3)' }}>
          Casos de prueba (CP-01 a CP-20) y fichas activas distribuidas por dominio técnico.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {DOMAIN_SUMMARY.map((d) => {
          const widthPct = Math.round((d.cases / maxCases) * 100);
          return (
            <div key={d.code} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem', fontSize: '0.84rem' }}>
                <span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{d.code}</strong>{' '}
                  <span style={{ color: 'var(--text-2)' }}>{d.label}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                  {d.labs} {d.labs === 1 ? 'lab' : 'labs'} · {d.cases} CP
                </span>
              </div>
              <div
                style={{
                  inlineSize: '100%',
                  blockSize: '0.58rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--surface-3)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    inlineSize: `${widthPct}%`,
                    blockSize: '100%',
                    borderRadius: '999px',
                    backgroundColor: d.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
