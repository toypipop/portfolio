export interface SkillGroup {
  category: string
  items: string[]
}

const skills: SkillGroup[] = [
  {
    category: 'Backend',
    items: ['Python', 'Django', 'REST API', 'Go', 'Gin'],
  },
  {
    category: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Axios', 'SPA Routing'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'Schema Migration', 'Query Optimization'],
  },
  {
    category: 'DevOps & Infrastructure',
    items: [
      'Docker', 'Docker Compose', 'Nginx', 'Caddy',
      'GitHub Actions CI/CD', 'Linux (Ubuntu)',
      'VPS Deployment', 'Reverse Proxy',
      'AWS EC2', 'AWS IAM', 'AWS VPC', 'AWS ECR',
    ],
  },
  {
    category: 'Tools',
    items: ['Git', 'Postman', 'Git Workflow', 'AI-assisted Development'],
  },
]

export default skills
