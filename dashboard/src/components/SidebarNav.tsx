import {
  BookOpen,
  FileCode2,
  FlaskConical,
  GitBranch,
  LayoutDashboard,
  Menu,
  Moon,
  ShieldAlert,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react';
import type { ViewId } from '../types/aevoid';

export interface NavItem {
  id: ViewId;
  label: string;
  badge?: string;
  Icon: typeof LayoutDashboard;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard Ejecutivo', badge: 'KPI', Icon: LayoutDashboard },
  { id: 'governance', label: 'Ciclo & Gobernanza', badge: '6F', Icon: GitBranch },
  { id: 'labs', label: 'Laboratorios', badge: '10', Icon: FlaskConical },
  { id: 'risks', label: 'Riesgos & Pruebas', badge: '16H', Icon: ShieldAlert },
  { id: 'hardening', label: 'Hardening & Evidencias', badge: 'D02-08', Icon: ShieldCheck },
  { id: 'casestudy', label: 'Caso Estudio & UML', badge: '4', Icon: FileCode2 },
  { id: 'glossary', label: 'Glosario & Archivos MD', badge: '30', Icon: BookOpen },
];

interface SidebarNavProps {
  activeView: ViewId;
  onSelectView: (view: ViewId) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  mobileOpen: boolean;
  onToggleMobile: (open: boolean) => void;
}

export function SidebarNav({
  activeView,
  onSelectView,
  theme,
  onToggleTheme,
  mobileOpen,
  onToggleMobile,
}: SidebarNavProps) {
  function handlePick(view: ViewId) {
    onSelectView(view);
    onToggleMobile(false);
  }

  return (
    <>
      <header className="mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="brand-mark" aria-hidden="true">
            <ShieldCheck size={18} />
          </span>
          <div>
            <strong style={{ display: 'block', fontSize: '0.98rem', lineHeight: 1.1 }}>ÆVØID v1.3.0</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>Framework Ciberseguridad</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => onToggleMobile(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Abrir menú de navegación"
          >
            {mobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            <span>Menú</span>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Cerrar menú lateral"
          onClick={() => onToggleMobile(false)}
        />
      )}

      <aside className={`sidebar-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Barra lateral de vistas">
        <div className="brand-box">
          <div className="brand-mark" aria-hidden="true">
            <ShieldCheck size={20} />
          </div>
          <div style={{ minInlineSize: 0 }}>
            <div className="brand-title">ÆVØID</div>
            <div className="brand-sub">Purple Team · v1.3.0</div>
          </div>
        </div>

        <nav aria-label="Navegación principal">
          <ul className="nav-list">
            {NAV_ITEMS.map(({ id, label, badge, Icon }) => {
              const isCurrent = activeView === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    className="nav-btn"
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={() => handlePick(id)}
                  >
                    <Icon size={17} aria-hidden="true" />
                    <span>{label}</span>
                    {badge && <span className="nav-badge">{badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            <span>{theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}</span>
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', lineHeight: 1.4 }}>
            Universidad Santo Tomás — Seccional Tunja · 8° Semestre Sistemas
          </p>
        </div>
      </aside>
    </>
  );
}
