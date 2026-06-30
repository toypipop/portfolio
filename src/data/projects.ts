export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url: string | null
  image: string | null
  tier: 'normal' | 'boss'
  type: string
}

const projects: Project[] = [
  {
    id: 'payroll',
    title: 'Payroll System',
    description:
      'Full-stack payroll web application. Manages employee records, salary calculation, and monthly payslip generation.',
    tags: ['Go', 'React', 'PostgreSQL', 'Docker'],
    url: 'https://pay-app-uat.getpipop.org/',
    image: '/projects/payroll.png',
    tier: 'boss',
    type: 'Ancient',
  },
  {
    id: 'placeholder-1',
    title: '???',
    description: 'Identity unknown. Encounter pending.',
    tags: [],
    url: null,
    image: null,
    tier: 'normal',
    type: 'Unknown',
  },
  {
    id: 'placeholder-2',
    title: '???',
    description: 'Identity unknown. Encounter pending.',
    tags: [],
    url: null,
    image: null,
    tier: 'normal',
    type: 'Unknown',
  },
]

export default projects
