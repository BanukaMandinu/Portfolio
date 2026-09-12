import { QaIcon, AiIcon, LanguagesIcon, DatabaseIcon, WebIcon, ToolsIcon } from '@/components/icons';

export const skillCategories = [
  {
    id: 'skills-qa',
    title: 'Test Automation & QA',
    Icon: QaIcon,
    badges: ['Playwright', 'Playwright MCP / CLI', 'Selenium', 'Cypress', 'API Testing', 'Accessibility Testing', 'Manual Testing', 'Test Case Design', 'AI/Agentic Testing', 'Performance Testing', 'Security Testing'],
  },
  {
    id: 'skills-ai',
    title: 'AI & Machine Learning',
    Icon: AiIcon,
    badges: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning', 'Diffusion Models', 'Model Training', 'AI Model Testing & Validation'],
  },
  {
    id: 'skills-languages',
    title: 'Programming',
    Icon: LanguagesIcon,
    badges: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C / C++', 'R'],
  },
  {
    id: 'skills-databases',
    title: 'Databases & Cloud',
    Icon: DatabaseIcon,
    badges: ['MySQL', 'MariaDB', 'PostgreSQL', 'Microsoft Azure', 'Apache'],
  },
  {
    id: 'skills-web',
    title: 'Web Development',
    Icon: WebIcon,
    badges: ['HTML5', 'CSS3', 'React', 'Angular', 'Node.js'],
  },
  {
    id: 'skills-tools',
    title: 'Tools & Workflow',
    Icon: ToolsIcon,
    badges: ['Git', 'GitHub', 'Jira', 'Agile', 'MCP', 'Playwright MCP', 'VS Code', 'JetBrains IDEs', 'Figma', 'RStudio', 'Microsoft 365'],
  },
];
