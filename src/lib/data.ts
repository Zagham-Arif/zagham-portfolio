import { Links } from 'constants/links';
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
  title: 'Senior Full-Stack Software Engineer',
  email: 'zaghamarif@gmail.com',
  phone: '+92 314 7585435',
  location: 'Lahore, Pakistan',
  // TODO(zagham): re-add anonymized CV PDFs to public/ and restore these paths.
  // The hero CV buttons stay hidden while both values are empty.
  cvUrls: {
    europass: '',
    traditional: '',
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
  { name: 'Upwork', url: Links.upwork, icon: 'SiUpwork' },
];
// -----------------------------
// Projects
// -----------------------------
export const projects: Project[] = [
  {
    id: 'price-auditing-backend',
    title: 'Retail Price-Auditing Backend',
    description: 'projectsData.price-auditing-backend.description',
    technologies: [
      'Node.js',
      'Express',
      'TypeScript',
      'TypeORM',
      'AWS ECS Fargate',
      'Terraform',
      'Redis',
    ],
    liveUrl: '',
    imageUrl: '/projects/price-auditing-backend.webp',
    imageAlt: 'projectsData.price-auditing-backend.imageAlt',
    featured: true,
  },
  {
    id: 'recurring-donations-platform',
    title: 'Recurring Donations Platform',
    description: 'projectsData.recurring-donations-platform.description',
    technologies: ['Next.js', 'Supabase', 'Deno', 'TypeScript', 'PostgreSQL'],
    liveUrl: '',
    imageUrl: '/projects/recurring-donations-platform.webp',
    imageAlt: 'projectsData.recurring-donations-platform.imageAlt',
    featured: true,
  },
  {
    id: 'playertotals',
    title: 'PlayerTotals',
    description: 'projectsData.playertotals.description',
    technologies: ['Node.js', 'TypeScript', 'Redis', 'MongoDB', 'Real-time'],
    liveUrl: '',
    imageUrl: '/projects/playertotals.webp',
    imageAlt: 'projectsData.playertotals.imageAlt',
    featured: true,
  },
  {
    id: 'memberstore',
    title: 'Memberstore',
    description: 'projectsData.memberstore.description',
    technologies: [
      'KeystoneJS',
      'GraphQL',
      'MongoDB',
      'Next.js',
      'TypeScript',
      'Stripe',
    ],
    liveUrl: '',
    imageUrl: '/projects/memberstore.webp',
    imageAlt: 'projectsData.memberstore.imageAlt',
    featured: true,
  },
  {
    id: 'civasource',
    title: 'CivaSource',
    description: 'projectsData.civasource.description',
    technologies: ['FastAPI', 'Python', 'Redis', 'AI/ML', 'Authentication'],
    liveUrl: '',
    imageUrl: '/projects/civasource.webp',
    imageAlt: 'projectsData.civasource.imageAlt',
    featured: true,
  },
  {
    id: 'safety-compliance-platform',
    title: 'Safety Compliance Platform',
    description: 'projectsData.safety-compliance-platform.description',
    technologies: [
      'Node.js',
      'TypeScript',
      'AWS Lambda',
      'Terraform',
      'Microservices',
    ],
    liveUrl: '',
    imageUrl: '/projects/safety-compliance-platform.webp',
    imageAlt: 'projectsData.safety-compliance-platform.imageAlt',
    featured: true,
  },
  {
    id: 'real-time-gaming-platform',
    title: 'Real Time Gaming Platform',
    description: 'projectsData.real-time-gaming-platform.description',
    technologies: ['JavaScript', 'Node.js', 'WebSocket', 'UI Libraries'],
    liveUrl: '',
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
    id: 'al-khair-traders-pos',
    title: 'Al Khair Traders POS',
    description: 'projectsData.al-khair-traders-pos.description',
    technologies: [
      'Node.js',
      'React',
      'TypeScript',
      'TypeORM',
      'TanStack Query',
      'MySQL',
      'JWT Auth',
    ],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'autotempest',
    title: 'Autotempest',
    description: 'projectsData.autotempest.description',
    technologies: ['React.js', 'Node.js', 'MySQL', 'REST APIs', 'Web Scraping'],
    imageUrl: '/projects/autotempest.webp',
    imageAlt: 'projectsData.autotempest.imageAlt',
    featured: false,
  },
  {
    id: 'points-app',
    title: 'Points App',
    description: 'projectsData.points-app.description',
    technologies: ['Node.js', 'React.js', 'MySQL', 'Payment Integration'],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'deployment-tool',
    title: 'N1QL-to-Firebase Automation Tool (Final Year Project)',
    description: 'projectsData.deployment-tool.description',
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
    id: 'freelance-full-stack-developer',
    title: 'experiencesData.freelance.title',
    company: 'experiencesData.freelance.company',
    duration: { start: '2025-08', end: null },
    location: 'Remote',
    summaryKey: 'experiencesData.freelance.summary',
    responsibilitiesKey: 'experiencesData.freelance.responsibilities',
    technologies: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'Deno',
      'PostgreSQL',
      'Node.js',
    ],
  },
  {
    id: 'senior-software-engineer-xavor',
    title: 'experiencesData.xavor.title',
    company: 'experiencesData.xavor.company',
    duration: { start: '2025-05', end: '2025-07' },
    location: 'Lahore, Pakistan',
    summaryKey: 'experiencesData.xavor.summary',
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
    location: 'Lahore, Pakistan',
    summaryKey: 'experiencesData.hashlogics.summary',
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
    location: 'Remote (US)',
    summaryKey: 'experiencesData.skupreme.summary',
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
    location: 'Remote (Turkey)',
    summaryKey: 'experiencesData.homeats.summary',
    responsibilitiesKey: 'experiencesData.homeats.responsibilities',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'REST API', 'Swagger'],
  },
  {
    id: 'software-engineer-memberhood',
    title: 'experiencesData.memberhood.title',
    company: 'experiencesData.memberhood.company',
    duration: {
      start: '2022-03',
      end: '2023-03',
    },
    location: 'Remote (Germany)',
    summaryKey: 'experiencesData.memberhood.summary',
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
      start: '2021-02',
      end: '2022-02',
    },
    location: 'Gujrat, Pakistan',
    summaryKey: 'experiencesData.gulzarsoft.summary',
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
  { name: 'shadcn/ui', icon: 'SiShadcnui', category: 'frontend' },
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

// The technologies worth leading with. Rendered as the highlighted row above the
// full skill categories, so "AWS" stands in for the individual AWS services below.
export const coreSkills: Pick<Skill, 'name' | 'icon'>[] = [
  { name: 'Node.js', icon: 'SiNodedotjs' },
  { name: 'TypeScript', icon: 'SiTypescript' },
  { name: 'React', icon: 'SiReact' },
  { name: 'Next.js', icon: 'SiNextdotjs' },
  { name: 'Python', icon: 'SiPython' },
  { name: 'PostgreSQL', icon: 'SiPostgresql' },
  { name: 'Redis', icon: 'SiRedis' },
  { name: 'AWS', icon: 'SiAmazonaws' },
  { name: 'Terraform', icon: 'SiTerraform' },
  { name: 'Docker', icon: 'SiDocker' },
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
