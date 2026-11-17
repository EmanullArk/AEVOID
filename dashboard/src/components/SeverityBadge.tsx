import { AlertOctagon, AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';
import type { RaciCode, SeverityLevel, TeamFocus } from '../types/aevoid';

export function SeverityBadge({ severity }: { severity: SeverityLevel }) {
  const config: Record<SeverityLevel, { cls: string; Icon: typeof AlertOctagon }> = {
    Crítica: { cls: 'sev-critical', Icon: AlertOctagon },
    Alta: { cls: 'sev-high', Icon: AlertTriangle },
    Media: { cls: 'sev-medium', Icon: ShieldAlert },
    Baja: { cls: 'sev-low', Icon: CheckCircle2 },
    Informativa: { cls: 'sev-info', Icon: Info },
  };
  const { cls, Icon } = config[severity];
  return (
    <span className={`badge ${cls}`}>
      <Icon size={13} aria-hidden="true" />
      <span>{severity}</span>
    </span>
  );
}

export function TeamBadge({ team }: { team: TeamFocus }) {
  const clsMap: Record<TeamFocus, string> = {
    'Red Team': 'team-red',
    'Blue Team': 'team-blue',
    'Purple Team': 'team-purple',
    Forense: 'sev-high',
    Humano: 'sev-medium',
    Transversal: 'domain-tag',
  };
  return <span className={`badge ${clsMap[team]}`}>{team}</span>;
}

export function RaciBadge({ code }: { code: RaciCode }) {
  const meaning: Record<RaciCode, string> = {
    R: 'Responsable (Ejecuta)',
    A: 'Aprobador (Rinde cuentas)',
    C: 'Consultado',
    I: 'Informado',
  };
  return (
    <span className={`raci-badge raci-${code}`} title={meaning[code]} aria-label={`${code} - ${meaning[code]}`}>
      {code}
    </span>
  );
}
