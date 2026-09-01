export interface Skill {
  name: string
  icon: string
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
      { name: 'Python', icon: '🐍', level: 3 },
      { name: 'Django', icon: '🌿', level: 3 },
      { name: 'REST API', icon: '🔗', level: 3 },
      { name: 'Go', icon: '🔵', level: 2 },
      { name: 'Gin', icon: '🍸', level: 2 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', icon: '🟨', level: 3 },
      { name: 'TypeScript', icon: '📘', level: 2 },
      { name: 'React', icon: '⚛', level: 2 },
      { name: 'HTML', icon: '📄', level: 3 },
      { name: 'CSS', icon: '🎨', level: 2 },
      { name: 'Axios', icon: '📡', level: 2 },
      { name: 'SPA Routing', icon: '🗺', level: 2 },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'PostgreSQL', icon: '🐘', level: 3 },
      { name: 'MySQL', icon: '🐬', level: 2 },
      { name: 'SQL Server', icon: '💾', level: 2 },
      { name: 'Schema Migr.', icon: '🔄', level: 2 },
      { name: 'Query Opt.', icon: '⚙', level: 2 },
    ],
  },
  {
    category: 'DevOps & Infra',
    items: [
      { name: 'Docker', icon: '🐳', level: 2 },
      { name: 'Compose', icon: '🔧', level: 2 },
      { name: 'Nginx', icon: '🌐', level: 2 },
      { name: 'Caddy', icon: '🔒', level: 1 },
      { name: 'GH Actions', icon: '🤖', level: 2 },
      { name: 'Linux', icon: '🐧', level: 2 },
      { name: 'VPS & Proxy', icon: '☁', level: 2 },
    ],
  },
  {
    category: 'Tools & Workflow',
    items: [
      { name: 'Git', icon: '🌿', level: 2 },
      { name: 'Postman', icon: '📮', level: 2 },
      { name: 'Git Workflow', icon: '🔀', level: 2 },
      { name: 'Self-managed', icon: '🎯', level: 2 },
      { name: 'AI-assisted', icon: '✨', level: 3 },
    ],
  },
]

export default skills
