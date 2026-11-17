import { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS, SidebarNav } from './components/SidebarNav';
import { FRAMEWORK_META } from './data/frameworkData';
import type { ViewId } from './types/aevoid';
import { CaseStudyView } from './views/CaseStudyView';
import { DashboardView } from './views/DashboardView';
import { GlossaryAndFilesView } from './views/GlossaryAndFilesView';
import { GovernanceView } from './views/GovernanceView';
import { HardeningAndEvidenceView } from './views/HardeningAndEvidenceView';
import { LabsView } from './views/LabsView';
import { RisksAndTestsView } from './views/RisksAndTestsView';

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('aevoid-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');
  const [preselectedLabId, setPreselectedLabId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('aevoid-theme', theme);
  }, [theme]);

  useEffect(() => {
    const activeItem = NAV_ITEMS.find((n) => n.id === activeView);
    document.title = `${activeItem?.label ?? 'Dashboard'} | Framework ÆVØID`;
  }, [activeView]);

  const handleNavigate = useCallback((view: ViewId, labId?: string) => {
    setActiveView(view);
    if (labId) setPreselectedLabId(labId);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleJumpToLab = useCallback(
    (labId: string) => {
      handleNavigate('labs', labId);
    },
    [handleNavigate],
  );

  const handleClearPreselect = useCallback(() => {
    setPreselectedLabId(null);
  }, []);

  const handleAnnounce = useCallback((msg: string) => {
    setAnnouncement('');
    window.setTimeout(() => setAnnouncement(msg), 20);
  }, []);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link visually-hidden">
        Saltar al contenido principal
      </a>

      <SidebarNav
        activeView={activeView}
        onSelectView={(v) => handleNavigate(v)}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        mobileOpen={mobileOpen}
        onToggleMobile={setMobileOpen}
      />

      <main className="main-area">
        {activeView === 'dashboard' && <DashboardView onNavigate={handleNavigate} />}
        {activeView === 'governance' && (
          <GovernanceView onJumpToLab={handleJumpToLab} onAnnounce={handleAnnounce} />
        )}
        {activeView === 'labs' && (
          <LabsView
            preselectedLabId={preselectedLabId}
            onClearPreselect={handleClearPreselect}
            onAnnounce={handleAnnounce}
          />
        )}
        {activeView === 'risks' && <RisksAndTestsView />}
        {activeView === 'hardening' && <HardeningAndEvidenceView onAnnounce={handleAnnounce} />}
        {activeView === 'casestudy' && <CaseStudyView />}
        {activeView === 'glossary' && <GlossaryAndFilesView onNavigate={handleNavigate} />}

        <footer className="main-footer">
          <span>
            {FRAMEWORK_META.name} v{FRAMEWORK_META.version} · {FRAMEWORK_META.institution}
          </span>
          <span>
            Docente: {FRAMEWORK_META.professor} · Equipo ÆVØID ({FRAMEWORK_META.date})
          </span>
        </footer>
      </main>

      {/* Centralized polite live region */}
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
    </div>
  );
}

export default App;
