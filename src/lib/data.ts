import { Links } from '@/constants/links';
import type {
  Education,
  Experience,
  Project,
  Skill,
  SocialLink,
} from './types';

// -----------------------------
// Personal Info
// -----------------------------
export const personalInfo = {
  name: 'Zagham Arif',
  title: 'Senior Full Stack Developer',
  email: 'zaghamarif@gmail.com',
  phone: '+92 (314) 758435',
  location: 'Pakistan',
  cvUrls: {
    europass: '/Zagham-Arif_Europass-CV.pdf',
    traditional: '/Zagham-Arif_Traditional-CV.pdf',
  },
};

// -----------------------------
// Social Links
// -----------------------------
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: Links.github, icon: 'SiGithub' },
  { name: 'LinkedIn', url: Links.linkedIn, icon: 'SiLinkedin' },
  { name: 'Discord', url: Links.discord, icon: 'SiDiscord' },
  { name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'FiMail' },
];

// -----------------------------
// Freelance Links
// -----------------------------
export const freelanceLinks: SocialLink[] = [
  { name: 'Fiverr', url: Links.fiverr, icon: 'SiFiverr' },
  { name: 'Upwork', url: Links.upwork, icon: 'SiUpwork' },
];
// -----------------------------
// Projects
// -----------------------------
export const projects: Project[] = [
  {
    id: 'givingfridays',
    title: 'GivingFridays',
    description: 'projectsData.givingfridays.description',
    technologies: [
      'Next.js',
      'Supabase',
      'Deno',
      'TypeScript',
      'Team Leadership',
    ],
    liveUrl: 'https://app.givingfridays.com',
    imageUrl: '',
    featured: true,
  },
  {
    id: 'civasource',
    title: 'CivaSource',
    description: 'projectsData.civasource.description',
    technologies: ['FastAPI', 'Python', 'Redis', 'AI/ML', 'Authentication'],
    liveUrl: '#',
    imageUrl: '',
    featured: true,
  },
  {
    id: 'playertotals',
    title: 'PlayerTotals',
    description: 'projectsData.playertotals.description',
    technologies: ['Node.js', 'TypeScript', 'Redis', 'MongoDB', 'Real-time'],
    liveUrl: 'https://playertotals.com',
    imageUrl: '',
    featured: true,
  },

  {
    id: 'forwood-safety',
    title: 'Forwood Safety',
    description: 'projectsData.forwood-safety.description',
    technologies: ['Node.js', 'TypeScript', 'AWS', 'Microservices', 'DevOps'],
    liveUrl: 'https://forwoodsafety.com',
    imageUrl: '',
    featured: true,
  },
  {
    id: 'alteraapp',
    title: 'AlteraApp (Minecraft)',
    description: 'projectsData.alterapp.description',
    technologies: ['JavaScript', 'WebSocket', 'UI Libraries', 'Minecraft'],
    liveUrl: 'https://playlabs.altera.al/discover',
    imageUrl: '',
    featured: false,
  },
  {
    id: 'tradefundrr',
    title: 'TradeFundrr',
    description: 'projectsData.tradefundrr.description',
    technologies: ['Python', 'Flask', 'Django', 'ReactJS', 'CRM'],
    liveUrl: 'https://tradefundrr.com',
    imageUrl: '',
    featured: false,
  },
  {
    id: 'autotempest',
    title: 'Autotempest',
    description: 'projectsData.autotempest.description',
    technologies: ['React.js', 'Node.js', 'MySQL', 'REST APIs', 'Web Scraping'],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'points-app',
    title: 'Points App',
    description: 'projectsData.points-app.description',
    technologies: ['Node.js', 'React.js', 'MySQL', 'Payment Integration'],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'sicp',
    title: 'SICP E-Presentations',
    description: 'projectsData.sicp.description',
    technologies: ['Node.js', 'React.js', 'MySQL', 'AWS', 'Event Management'],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'vehicles-extension',
    title: 'Vehicles-Extension Solution',
    description: 'projectsData.vehicles-extension.description',
    technologies: [
      'Node.js',
      'React.js',
      'MongoDB',
      'CRON Jobs',
      'Web Scraping',
    ],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'al-khair-traders-pos',
    title: 'Al Khair Traders POS',
    description: 'projectsData.al-khair-traders.description',
    technologies: ['Node.js', 'React.js', 'MySQL', 'POS System', 'Namecheap'],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'modern-pos',
    title: 'Modern POS',
    description: 'projectsData.modern-pos.description',
    technologies: [
      'Core PHP',
      'Bootstrap',
      'jQuery',
      'MySQL',
      'Retail Management',
    ],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'deployment-tool',
    title: 'N1QL a Herramienta de Automatización Firebase (FYP)',
    description: 'projectsData.deployment.description',
    technologies: [
      'Node.js',
      'Firebase',
      'N1QL',
      'Couchbase',
      'Javascript',
      'HTML/CSS',
    ],
    imageUrl: '',
    featured: false,
  },
];

// -----------------------------
// Experiences
// -----------------------------
export const experiences: Experience[] = [
  {
    id: 'senior-software-engineer-xavor',
    title: 'experiencesData.xavor.title',
    company: 'experiencesData.xavor.company',
    duration: { start: '2025-05', end: '2025-07' },
    responsibilitiesKey: 'experiencesData.xavor.responsibilities',
    technologies: [
      'Node.js',
      'Express',
      'TypeScript',
      'TypeORM',
      'Docker',
      'AWS ECS Fargate',
      'Terraform',
      'Okta',
      'Swagger',
      'Zod',
      'Datadog',
      'Redis',
      'Worker Threads',
      'JIRA',
    ],
  },
  {
    id: 'software-engineer-hashlogics',
    title: 'experiencesData.hashlogics.title',
    company: 'experiencesData.hashlogics.company',
    duration: { start: '2022-08', end: '2025-02' },
    responsibilitiesKey: 'experiencesData.hashlogics.responsibilities',
    technologies: [
      'Python',
      'React',
      'Node.js',
      'TypeScript',
      'AWS Lambda',
      'Terraform',
      'Redis',
      'MongoDB',
      'FastAPI',
      'Next.js',
      'Supabase',
    ],
  },
  {
    id: 'software-engineer-skupreme',
    title: 'experiencesData.skupreme.title',
    company: 'experiencesData.skupreme.company',
    duration: {
      start: '2022-06',
      end: '2022-08',
    },
    responsibilitiesKey: 'experiencesData.skupreme.responsibilities',
    technologies: ['Next.js', 'React', 'TypeScript', 'Frontend Development'],
  },
  {
    id: 'software-engineer-homeats',
    title: 'experiencesData.homeats.title',
    company: 'experiencesData.homeats.company',
    duration: {
      start: '2022-03',
      end: '2022-06',
    },
    responsibilitiesKey: 'experiencesData.homeats.responsibilities',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'REST API', 'Swagger'],
  },
  {
    id: 'software-engineer-memberhood',
    title: 'experiencesData.memberhood.title',
    company: 'experiencesData.memberhood.company',
    duration: {
      start: '2021-07',
      end: '2022-07',
    },
    responsibilitiesKey: 'experiencesData.memberhood.responsibilities',
    technologies: [
      'KeystoneJS',
      'GraphQL',
      'MongoDB',
      'TypeScript',
      'Next.js',
      'Stripe',
    ],
  },
  {
    id: 'associate-software-engineer-gulzarsoft',
    title: 'experiencesData.gulzarsoft.title',
    company: 'experiencesData.gulzarsoft.company',
    duration: {
      start: '2020-04',
      end: '2021-07',
    },
    responsibilitiesKey: 'experiencesData.gulzarsoft.responsibilities',
    technologies: ['Node.js', 'React.js', 'MySQL', 'MongoDB', 'REST APIs'],
  },
];

// -----------------------------
// Skills
// -----------------------------
export const skills: Skill[] = [
  // Frontend Technologies
  { name: 'JavaScript', icon: 'SiJavascript', category: 'frontend' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend' },
  { name: 'React', icon: 'SiReact', category: 'frontend' },
  { name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend' },
  { name: 'Material UI', icon: 'SiMui', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend' },
  { name: 'Ant Design', icon: 'SiAntdesign', category: 'frontend' },
  { name: 'shadcn/ui', icon: 'SiReact', category: 'frontend' },
  { name: 'Bootstrap', icon: 'SiBootstrap', category: 'frontend' },

  // Backend Technologies
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'backend' },
  { name: 'Express.js', icon: 'SiExpress', category: 'backend' },
  { name: 'Python', icon: 'SiPython', category: 'backend' },
  { name: 'PHP', icon: 'SiPhp', category: 'backend' },
  { name: 'FastAPI', icon: 'SiFastapi', category: 'backend' },
  { name: 'Django', icon: 'SiDjango', category: 'backend' },
  { name: 'Supabase', icon: 'SiSupabase', category: 'backend' },
  { name: 'KeystoneJS', icon: 'SiNodedotjs', category: 'backend' },
  { name: 'Strapi', icon: 'SiStrapi', category: 'backend' },
  { name: 'TypeORM', icon: 'SiTypescript', category: 'backend' },
  { name: 'Zod', icon: 'SiTypescript', category: 'backend' },

  // Databases & Storage
  { name: 'MongoDB', icon: 'SiMongodb', category: 'database' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'database' },
  { name: 'MySQL', icon: 'SiMysql', category: 'database' },
  { name: 'Redis', icon: 'SiRedis', category: 'database' },
  { name: 'Couchbase', icon: 'SiCouchbase', category: 'database' },
  { name: 'Firebase', icon: 'SiFirebase', category: 'database' },
  { name: 'AWS S3', icon: 'SiAmazons3', category: 'database' },
  { name: 'AWS DynamoDB', icon: 'SiAmazondynamodb', category: 'database' },
  { name: 'Cloudinary', icon: 'SiCloudinary', category: 'database' },

  // Cloud & DevOps Tools
  { name: 'AWS EC2', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'Docker', icon: 'SiDocker', category: 'tools' },
  { name: 'AWS RDS', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'Terraform', icon: 'SiTerraform', category: 'tools' },
  { name: 'AWS ECS', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'DigitalOcean', icon: 'SiDigitalocean', category: 'tools' },
  { name: 'Heroku', icon: 'SiHeroku', category: 'tools' },
  { name: 'AWS CloudFront', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'Netlify', icon: 'SiNetlify', category: 'tools' },
  { name: 'AWS Lightsail', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'Vercel', icon: 'SiVercel', category: 'tools' },
  { name: 'AWS Fargate', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'Datadog', icon: 'SiDatadog', category: 'tools' },
  { name: 'Git', icon: 'SiGit', category: 'tools' },
  { name: 'GitHub', icon: 'SiGithub', category: 'tools' },
  { name: 'GitLab', icon: 'SiGitlab', category: 'tools' },
  { name: 'Bitbucket', icon: 'SiBitbucket', category: 'tools' },
  { name: 'Okta', icon: 'SiOkta', category: 'tools' },
  { name: 'Swagger', icon: 'SiSwagger', category: 'tools' },

  // Other Tools & Utilities
  { name: 'Jira', icon: 'SiJira', category: 'other' },
  { name: 'ClickUp', icon: 'SiClickup', category: 'other' },
  { name: 'Trello', icon: 'SiTrello', category: 'other' },
  { name: 'Notion', icon: 'SiNotion', category: 'other' },
  { name: 'Slack', icon: 'SiSlack', category: 'other' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', category: 'other' },
  { name: 'PyCharm', icon: 'SiPycharm', category: 'other' },
  { name: 'Postman', icon: 'SiPostman', category: 'other' },
  { name: 'Figma', icon: 'SiFigma', category: 'other' },
];

// -----------------------------
// Education
// -----------------------------
export const education: Education[] = [
  {
    id: 'software-engineering-bachelor',
    degree: 'Bachelor of Software Engineering',
    institution: 'University of Gujrat, Hafiz Hayat Campus',
    duration: { start: '2016', end: '2020' },
    location: 'Gujrat, Pakistan',
  },
];
