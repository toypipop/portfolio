export interface Skill {
  name: string
  level: 1 | 2 | 3
}

export interface SkillGroup {
  category: string
  items: Skill[]
}

const skills: SkillGroup[] = [
  {
    category: 'Backend',
    items: [
      { name: 'Python', level: 3 },
      { name: 'Django', level: 3 },
      { name: 'REST API', level: 3 },
      { name: 'Go', level: 2 },
      { name: 'Gin', level: 2 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', level: 3 },
      { name: 'TypeScript', level: 2 },
      { name: 'React', level: 2 },
      { name: 'HTML', level: 3 },
      { name: 'CSS', level: 2 },
      { name: 'Axios', level: 2 },
      { name: 'SPA Routing', level: 2 },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'PostgreSQL', level: 3 },
      { name: 'MySQL', level: 2 },
      { name: 'SQL Server', level: 2 },
      { name: 'Schema Migration', level: 2 },
      { name: 'Query Optimization', level: 2 },
    ],
  },
  {
    category: 'DevOps & Infrastructure',
    items: [
      { name: 'Docker', level: 2 },
      { name: 'Docker Compose', level: 2 },
      { name: 'Nginx', level: 2 },
      { name: 'Caddy', level: 1 },
      { name: 'GitHub Actions CI/CD', level: 2 },
      { name: 'Linux (Ubuntu)', level: 2 },
      { name: 'VPS Deployment', level: 2 },
      { name: 'Reverse Proxy', level: 2 },
      { name: 'AWS EC2', level: 2 },
      { name: 'AWS IAM', level: 1 },
      { name: 'AWS VPC', level: 1 },
      { name: 'AWS ECR', level: 1 },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', level: 3 },
      { name: 'Postman', level: 2 },
      { name: 'Git Workflow', level: 3 },
      { name: 'AI-assisted Development', level: 2 },
    ],
  },
]

export default skills
