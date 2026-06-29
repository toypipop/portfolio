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
    tags: ['Go', 'React', 'PostgreSQL', 'Docker'],
    url: 'https://pay-app-uat.getpipop.org/',
    image: '/projects/payroll.png'
  },
  {
    id: 'placeholder-1',
    title: 'Coming Soon',
    description: 'Project details coming soon.',
    tags: [],
    url: null,
    image: null,
  },
]

export default projects
