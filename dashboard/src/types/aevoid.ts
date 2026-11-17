export type ViewId =
  | 'dashboard'
  | 'governance'
  | 'labs'
  | 'risks'
  | 'hardening'
  | 'casestudy'
  | 'glossary';

export type SeverityLevel = 'Crítica' | 'Alta' | 'Media' | 'Baja' | 'Informativa';
export type TeamFocus = 'Red Team' | 'Blue Team' | 'Purple Team' | 'Forense' | 'Humano' | 'Transversal';
export type RaciCode = 'R' | 'A' | 'C' | 'I';

export interface TeamMember {
  name: string;
  alias?: string;
  role: string;
  teamTag: TeamFocus;
  focus: string;
  driveDeliverable: string;
}

export interface FrameworkPhase {
  id: string;
  number: string;
  name: string;
  shortTag: string;
  summary: string;
  inputs: string[];
  activities: string[];
  outputs: string[];
  closureCriteria: string;
  relatedLabs: string[];
}

export interface RoleDefinition {
  code: string;
  name: string;
  description: string;
  deliverable: string;
  teamTag: TeamFocus;
}

export interface RaciRow {
  phase: string;
  RS: RaciCode;
  CE: RaciCode;
  AO: RaciCode;
  AD: RaciCode;
  CP: RaciCode;
  CUST: RaciCode;
  EV: RaciCode;
}

export interface TraceabilityRow {
  instrument: string;
  domain: string;
  phase: string;
  testCases: string;
  finding: string;
  control: string;
  verificationResult: string;
}

export interface LabStep {
  title: string;
  normalBehavior?: string;
  commands?: string[];
  commandLang?: string;
  observation: string;
}

export interface LabTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface LabDetail {
  id: string;
  slug: string;
  title: string;
  version: string;
  domainCode: string;
  domainName: string;
  phase: string;
  focus: string;
  teamCategory: TeamFocus;
  standardRef?: string;
  objective: string;
  roles: {
    offensive: string;
    defensive: string;
    reviewer: string;
  };
  environment: string[];
  tools: string[];
  steps: LabStep[];
  comparisonTable?: LabTable;
  qaNotes?: { question: string; answer: string }[];
  evidences: string[];
  acceptanceCriteria: string;
  blueTeamAnalysis: string[];
}

export interface KpiMetric {
  id: string;
  name: string;
  definition: string;
  formula: string;
  valueLabel: string;
  numericPercent?: number;
  highlight: string;
}

export interface TestEvaluationRow {
  id: string;
  name: string;
  instrument: string;
  labSlug: string;
  leads: string;
  expected: string;
  obtained: string;
  severity: SeverityLevel;
  status: string;
}

export interface TestCaseRow {
  code: string;
  domain: string;
  phase: string;
  tool: string;
  objective: string;
  params: string;
  successCriteria: string;
}

export interface RiskFinding {
  id: string;
  asset: string;
  vulnerability: string;
  probability: 'Baja' | 'Media' | 'Alta' | 'Muy Alta';
  impact: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  severity: SeverityLevel;
  treatment: string;
}

export interface EvidenceGroup {
  labId: string;
  labTitle: string;
  slug: string;
  items: { code: string; description: string }[];
}

export interface MitigationDomain {
  id: string;
  domainLabel: string;
  labsRef: string;
  controls: {
    title: string;
    details: string[];
    codeSnippet?: {
      language: string;
      caption: string;
      code: string;
    };
  }[];
}

export interface AuthPlatformComparison {
  platform: string;
  category: string;
  endpoint: string;
  method: 'POST';
  payloadFormat: string;
  samplePayload: string;
  protections: string[];
  errorResponse: string;
  antiEnumeration: boolean;
}

export interface GlossaryTerm {
  number: number;
  term: string;
  category: 'Equipos' | 'Reconocimiento' | 'Riesgo y Fallos' | 'Operaciones Blue Team' | 'Forense' | 'Protocolos e IA' | 'Metodología';
  definition: string;
}

export interface RepoMdDocument {
  folder: string;
  fileName: string;
  relativePath: string;
  bytes: number;
  status: 'Analizado' | 'Omitido por bloqueo AV';
  targetView: ViewId;
  summary: string;
}
