import { ArrowRight, FileText, FolderTree, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AccessibleTabs } from '../components/AccessibleTabs';
import { ResponsiveTable } from '../components/ResponsiveTable';
import { GLOSSARY_TERMS, REPO_MD_DOCUMENTS } from '../data/caseStudyAndGlossaryData';
import type { ViewId } from '../types/aevoid';

interface GlossaryAndFilesProps {
  onNavigate: (view: ViewId) => void;
}

export function GlossaryAndFilesView({ onNavigate }: GlossaryAndFilesProps) {
  const [activeTab, setActiveTab] = useState('glossary');
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [folderFilter, setFolderFilter] = useState('Todas');

  const categories = useMemo(
    () => ['Todas', ...Array.from(new Set(GLOSSARY_TERMS.map((t) => t.category)))],
    [],
  );

  const folders = useMemo(
    () => ['Todas', ...Array.from(new Set(REPO_MD_DOCUMENTS.map((d) => d.folder)))],
    [],
  );

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      if (categoryFilter !== 'Todas' && item.category !== categoryFilter) return false;
      if (!q) return true;
      return item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q);
    });
  }, [query, categoryFilter]);

  const filteredDocs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REPO_MD_DOCUMENTS.filter((doc) => {
      if (folderFilter !== 'Todas' && doc.folder !== folderFilter) return false;
      if (!q) return true;
      return (
        doc.relativePath.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q)
      );
    });
  }, [query, folderFilter]);

  const tabs = [
    {
      id: 'glossary',
      label: 'Glosario Técnico Oficial',
      badge: '30 términos',
      content: (
        <>
          <div className="pill-group" role="group" aria-label="Filtrar términos por categoría">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="filter-pill"
                aria-pressed={categoryFilter === cat}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="cards-grid">
            {filteredTerms.map((term) => (
              <article key={term.number} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="badge sev-medium badge-mono">#{String(term.number).padStart(2, '0')}</span>
                  <span className="badge domain-tag">{term.category}</span>
                </div>
                <h2 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{term.term}</h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-2)' }}>{term.definition}</p>
              </article>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'files',
      label: 'Explorador de Archivos MD',
      badge: `${REPO_MD_DOCUMENTS.length} MD`,
      content: (
        <>
          <div className="pill-group" role="group" aria-label="Filtrar por carpeta del repositorio">
            <FolderTree size={16} aria-hidden="true" style={{ color: 'var(--text-3)' }} />
            {folders.map((folder) => (
              <button
                key={folder}
                type="button"
                className="filter-pill"
                aria-pressed={folderFilter === folder}
                onClick={() => setFolderFilter(folder)}
              >
                {folder}
              </button>
            ))}
          </div>

          <ResponsiveTable
            caption="Inventario completo de archivos Markdown del repositorio ÆVØID y vista destino"
            rows={filteredDocs}
            getRowKey={(d) => d.relativePath}
            columns={[
              {
                key: 'path',
                header: 'Archivo MD',
                isRowHeader: true,
                render: (d) => (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    <FileText size={14} aria-hidden="true" />
                    <span>{d.relativePath}</span>
                  </span>
                ),
              },
              { key: 'folder', header: 'Carpeta', render: (d) => <span className="badge domain-tag">{d.folder}</span> },
              { key: 'size', header: 'Tamaño', render: (d) => <span className="badge-mono">{(d.bytes / 1024).toFixed(1)} KB</span> },
              {
                key: 'status',
                header: 'Estado',
                render: (d) => (
                  <span className={`badge ${d.status === 'Analizado' ? 'sev-low' : 'sev-high'}`}>
                    {d.status}
                  </span>
                ),
              },
              { key: 'summary', header: 'Contenido Integrado', render: (d) => d.summary },
              {
                key: 'go',
                header: 'Vista',
                render: (d) => (
                  <button type="button" className="btn btn-sm" onClick={() => onNavigate(d.targetView)}>
                    <span>Abrir</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                ),
              },
            ]}
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
            Glosario Técnico & Mapa de Archivos MD
          </h1>
          <p className="page-subtitle">
            Consulta los 30 términos oficiales de docs/glosario.md y audita el mapeo de cada archivo Markdown por carpeta.
          </p>
        </div>
        <div className="input-search-wrap" style={{ maxInlineSize: '22rem' }}>
          <Search size={16} aria-hidden="true" />
          <label htmlFor="glossary-search" className="visually-hidden">
            Buscar término o archivo Markdown
          </label>
          <input
            id="glossary-search"
            type="search"
            className="input-field"
            placeholder="Buscar término, sigla o ruta .md..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <AccessibleTabs
        label="Glosario y explorador de archivos"
        tabs={tabs}
        activeId={activeTab}
        onChange={setActiveTab}
      />
    </div>
  );
}
