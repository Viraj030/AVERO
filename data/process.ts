import type { ProcessStep } from '@/types/avero';

export const processSteps: ProcessStep[] = [
  {
    id: 'diagnose',
    index: '01',
    title: 'Diagnose',
    copy: 'We inspect the account, funnel, tracking, creative, and economics.'
  },
  {
    id: 'prioritize',
    index: '02',
    title: 'Prioritize',
    copy: 'We identify the changes most likely to move the numbers.'
  },
  {
    id: 'execute',
    index: '03',
    title: 'Execute',
    copy: 'We implement the highest-impact fixes.'
  },
  {
    id: 'measure',
    index: '04',
    title: 'Measure',
    copy: 'We track what actually changed.'
  },
  {
    id: 'scale',
    index: '05',
    title: 'Scale',
    copy: 'We increase spend behind what proves itself.'
  }
];
