export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  url: string | null
  image: string | null
}

const projects: Project[] = [
  {
    id: 'payroll',
    title: 'Payroll System',
    description:
      'Full-stack payroll web application. Manages employee records, salary calculation, and monthly payslip generation.',
    tags: ['Django', 'React', 'PostgreSQL', 'Docker'],
    url: null,   // TODO: add live URL
    image: null, // TODO: add screenshot path e.g. '/projects/payroll.png'
  },
  {
    id: 'placeholder-1',
    title: 'Coming Soon',
    description: 'Project details coming soon.',
    tags: [],
    url: null,
    image: null,
  },
  {
    id: 'placeholder-2',
    title: 'Coming Soon',
    description: 'Project details coming soon.',
    tags: [],
    url: null,
    image: null,
  },
]

export default projects
