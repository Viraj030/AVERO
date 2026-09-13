export type BusinessType = 'ecommerce' | 'leadgen';

export interface FunnelStage {
  id: string;
  label: string;
  caption: string;
  value: string;
  lossLabel: string;
  lossPercent: number;
}

export interface FixCategory {
  id: string;
  label: string;
  summary: string;
  items: string[];
  looksFor: string[];
}

export interface ProcessStep {
  id: string;
  index: string;
  title: string;
  copy: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  logoSrc: string;
  sector: string;
  channelTag: string;
  typeTag: string;
  headline: string;
  description: string;
  challenge: string;
  changed: string;
  result: string;
  metrics: { label: string; value: string }[];
  dateRange: string;
  dashboardImage: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface AuditLead {
  objective: string;
  channels: string[];
  spend: string;
  name: string;
  email: string;
  website: string;
  phone: string;
}
