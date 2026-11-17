import type { ReactNode } from 'react';
import { useId, useRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  content: ReactNode;
}

interface AccessibleTabsProps {
  label: string;
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function AccessibleTabs({ label, tabs, activeId, onChange }: AccessibleTabsProps) {
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLButtonElement>) {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const targetTab = tabs[nextIndex];
    onChange(targetTab.id);
    const btn = tabRefs.current[nextIndex];
    btn?.focus();
    btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  return (
    <div className="tabs-wrapper">
      <div role="tablist" aria-label={label} className="tablist">
        {tabs.map((tab, index) => {
          const isSelected = tab.id === activeId;
          const tabHtmlId = `${baseId}-tab-${tab.id}`;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabHtmlId}
              type="button"
              role="tab"
              className="tab-btn"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            >
              <span>{tab.label}</span>
              {tab.badge && <span className="badge domain-tag badge-mono">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isSelected = tab.id === activeId;
        const tabHtmlId = `${baseId}-tab-${tab.id}`;
        return (
          <div
            key={tab.id}
            role="tabpanel"
            aria-labelledby={tabHtmlId}
            hidden={!isSelected}
            tabIndex={isSelected ? 0 : undefined}
          >
            {isSelected && <div className="tabpanel-body">{tab.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
