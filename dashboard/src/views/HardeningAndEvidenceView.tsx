import { CheckCircle2, ExternalLink, FolderArchive, GitBranch, Search, ShieldCheck, Tag } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { CodeSnippet } from '../components/CodeSnippet';
import {
  DRIVE_SOURCES,
  EVIDENCE_GROUPS,
  GIT_WORKFLOW_DATA,
  MITIGATION_DOMAINS,
  SETUP_ENV_SCRIPT,
} from '../data/annexesData';
import { FRAMEWORK_META } from '../data/frameworkData';

interface HardeningProps {
  onAnnounce: (msg: string) => void;
}

export function HardeningAndEvidenceView({ onAnnounce }: HardeningProps) {
  const [activeTab, setActiveTab] = useState('mitigation');
  const [evidenceSearch, setEvidenceSearch] = useState('');

  const filteredEvidences = useMemo(() => {
    const q = evidenceSearch.trim().toLowerCase();
    if (!q) return EVIDENCE_GROUPS;
    return EVIDENCE_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (it) =>
          it.code.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          group.labId.toLowerCase().includes(q) ||
          group.labTitle.toLowerCase().includes(q),
      ),
    })).filter((g) => g.items.length > 0);
  }, [evidenceSearch]);

  const tabs = [
    {
      id: 'mitigation',
      label: 'Plan de Mitigación Blue Team (Anexo D)',
      badge: '5 Dominios',
      content: (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MITIGATION_DOMAINS.map((domain) => (
              <section key={domain.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.04rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--team-blue)' }}>
                    <ShieldCheck size={18} aria-hidden="true" />
                    <span>{domain.domainLabel}</span>
                  </h2>
                  <span className="badge domain-tag badge-mono">{domain.labsRef}</span>
                </div>

                <div className="grid-2">
                  {domain.controls.map((ctrl) => (
                    <article
                      key={ctrl.title}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.55rem',
                        minInlineSize: 0,
                      }}
                    >
                      <h3 style={{ fontSize: '0.94rem', fontWeight: 800 }}>{ctrl.title}</h3>
                      <ul style={{ fontSize: '0.84rem', color: 'var(--text-2)', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {ctrl.details.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      {ctrl.codeSnippet && (
                        <CodeSnippet
                          language={ctrl.codeSnippet.language}
                          caption={ctrl.codeSnippet.caption}
                          code={ctrl.codeSnippet.code}
                          onAnnounce={onAnnounce}
                        />
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <h2 style={{ fontSize: '1.02rem', fontWeight: 800 }}>
                Script de Acondicionamiento Operativo (scripts/setup_env.sh)
              </h2>
              <CodeSnippet
                language="bash"
                caption="scripts/setup_env.sh"
                code={SETUP_ENV_SCRIPT}
                onAnnounce={onAnnounce}
              />
            </section>
          </div>
        </>
      ),
    },
    {
      id: 'evidences',
      label: 'Evidencias & Drive (Anexo C)',
      badge: 'C-01–C-11',
      content: (
        <>
          <section className="card" aria-labelledby="drive-heading">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBlockEnd: '0.85rem' }}>
              <div>
                <h2 id="drive-heading" style={{ fontSize: '1.04rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                  <FolderArchive size={18} aria-hidden="true" />
                  <span>Repositorio Oficial en Google Drive (docs/repositorio_drive.md)</span>
                </h2>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-3)' }}>
                  Capturas Full HD, archivos .zap, .mtgx, .pcap, informes .docx y consolidados PDF de los 5 integrantes.
                </p>
              </div>
              <a href={FRAMEWORK_META.driveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                <span>Abrir Carpeta Drive</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="cards-grid">
              {DRIVE_SOURCES.map((src) => (
                <article key={src.author} style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <strong style={{ display: 'block', fontSize: '0.88rem' }}>{src.author}</strong>
                  <code style={{ fontSize: '0.76rem', color: 'var(--accent)', display: 'block', marginBlock: '0.25rem' }}>{src.artifact}</code>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{src.scope}</span>
                </article>
              ))}
            </div>
          </section>

          <div className="input-search-wrap" style={{ maxInlineSize: '26rem' }}>
            <Search size={16} aria-hidden="true" />
            <label htmlFor="evid-search" className="visually-hidden">
              Buscar evidencias por código o descripción
            </label>
            <input
              id="evid-search"
              type="search"
              className="input-field"
              placeholder="Buscar evidencia (ej. C-04, Steghide, SHA-256, ZAP)..."
              value={evidenceSearch}
              onChange={(e) => setEvidenceSearch(e.target.value)}
            />
          </div>

          <div className="cards-grid">
            {filteredEvidences.map((group) => (
              <section key={group.labId} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="badge sev-medium badge-mono">{group.labId}</span>
                  <span className="badge domain-tag badge-mono">{group.items.length} ítems</span>
                </div>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800 }}>{group.labTitle}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {group.items.map((ev) => (
                    <li
                      key={ev.code}
                      style={{
                        padding: '0.45rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--surface-2)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{ev.code}:</strong>{' '}
                      <span style={{ color: 'var(--text-2)' }}>{ev.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'git',
      label: 'Guía Git & Políticas (Anexo E)',
      badge: 'v1.3.0',
      content: (
        <>
          <div className="grid-2">
            <section className="card">
              <h2 style={{ fontSize: '1.02rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBlockEnd: '0.75rem' }}>
                <Tag size={17} aria-hidden="true" />
                <span>Línea Temporal de Versiones Semánticas</span>
              </h2>
              <ol className="timeline-list">
                {GIT_WORKFLOW_DATA.tags.map((item) => (
                  <li key={item.tag} className="timeline-item">
                    <span className="badge sev-medium badge-mono" style={{ marginBlockEnd: '0.2rem' }}>{item.tag}</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{item.description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <h2 style={{ fontSize: '1.02rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBlockEnd: '0.55rem' }}>
                  <GitBranch size={17} aria-hidden="true" />
                  <span>Estructura de Ramas (Sección 11.1)</span>
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {GIT_WORKFLOW_DATA.branches.map((b) => (
                    <li key={b.name} style={{ padding: '0.55rem 0.7rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--surface-2)' }}>
                      <code style={{ color: 'var(--accent)', fontWeight: 700 }}>{b.name}</code>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-2)', marginBlockStart: '0.15rem' }}>{b.purpose}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '0.96rem', fontWeight: 800, marginBlockEnd: '0.45rem' }}>
                  Políticas de Publicación Segura (Sección 11.2)
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {GIT_WORKFLOW_DATA.policies.map((pol) => (
                    <li key={pol} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-2)' }}>
                      <CheckCircle2 size={15} aria-hidden="true" style={{ color: 'var(--sev-low)', flexShrink: 0, marginBlockStart: '0.2rem' }} />
                      <span>{pol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <CodeSnippet
            language="bash"
            caption="anexos/anexo_e_guia_github.md — Comandos de Versionamiento"
            code={GIT_WORKFLOW_DATA.commandsSnippet}
            onAnnounce={onAnnounce}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      <header className="page-header">
        <div>
          <h1 id="main-content" tabIndex={-1} className="page-title">
            Hardening Blue Team, Evidencias & GitHub
          </h1>
          <p className="page-subtitle">
            Guía de remediación técnica por dominio (Anexo D), catálogo probatorio SHA-256 / Drive (Anexo C) y políticas Git (Anexo E).
          </p>
        </div>
      </header>

      <AccessibleTabs
        label="Mitigación, evidencias y Git"
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}
