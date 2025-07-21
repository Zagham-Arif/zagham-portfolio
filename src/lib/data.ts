import { Project, Experience, Skill, SocialLink, Education } from './types';

export const personalInfo = {
  name: 'Zagham Arif',
  title: 'Senior Full Stack Developer',
  email: 'zaghamarif@gmail.com',
  phone: '+92 (314) 758435',
  location: 'Pakistan',
  bio: 'Senior Full Stack Developer with 4+ years of experience specializing in Javascript, Python, ReactJS, and Next.js. Expert in AWS deployments, microservices architecture, and team leadership. Proven track record of optimizing web applications, implementing cloud solutions with Terraform, and leading development teams. Employee of the Month recognition for outstanding contributions.',
  cvUrls: {
    europass: '/Zagham-Arif_Europass-CV.pdf',
    traditional: '/Zagham-Arif_Traditional-CV.pdf',
  },
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Zagham-Arif',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zagham-arif',
    icon: 'Linkedin',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/zagham-arif',
    icon: 'Discord',
  },
];

export const projects: Project[] = [
  {
    id: 'givingfridays',
    title: 'GivingFridays',
    description:
      'Migrated from Strapi to Supabase, rebuilt APIs with Next.js + Deno. Led a team of 3-4 developers in the migration process.',
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
    description:
      'Scraped product data with integrated Redis Queues and AI product matching system. Built using FastAPI with authentication.',
    technologies: ['FastAPI', 'Python', 'Redis', 'AI/ML', 'Authentication'],
    liveUrl: '#',
    imageUrl: '',
    featured: true,
  },
  {
    id: 'playertotals',
    title: 'PlayerTotals',
    description:
      'Real-time player statistics system built with Node.js (TypeScript), Redis Queues, and MongoDB for high-performance data processing.',
    technologies: ['Node.js', 'TypeScript', 'Redis', 'MongoDB', 'Real-time'],
    liveUrl: 'https://playertotals.com',
    imageUrl: '',
    featured: true,
  },
  {
    id: 'forwood-safety',
    title: 'Forwood Safety',
    description:
      'Developed a safety checklist management system with microservices architecture using Node.js and TypeScript. Managed DevOps tasks and AWS deployments.',
    technologies: ['Node.js', 'TypeScript', 'AWS', 'Microservices', 'DevOps'],
    liveUrl: 'https://forwoodsafety.com',
    imageUrl: '',
    featured: true,
  },
  {
    id: 'alteraapp',
    title: 'AlteraApp (Minecraft)',
    description:
      'Built JavaScript libraries and WebSocket connections for Minecraft bot behavior and communication. Devised UI and command libraries for bot control.',
    technologies: ['JavaScript', 'WebSocket', 'UI Libraries', 'Minecraft'],
    liveUrl: 'https://playlabs.altera.al/discover',
    imageUrl: '',
    featured: false,
  },
  {
    id: 'tradefundrr',
    title: 'TradeFundrr',
    description:
      'Worked on a CRM system using Python, Flask, Django, and ReactJS. Conducted API testing and actively participated in agile methodology.',
    technologies: ['Python', 'Flask', 'Django', 'ReactJS', 'CRM'],
    liveUrl: 'https://tradefundrr.com',
    imageUrl: '',
    featured: false,
  },
  {
    id: 'autotempest',
    title: 'Autotempest',
    description:
      'Developed a responsive web app to filter and display scraped cars stored in a MySQL database. Designed with React.js and REST APIs for searching and filtering.',
    technologies: ['React.js', 'Node.js', 'MySQL', 'REST APIs', 'Web Scraping'],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'points-app',
    title: 'Points App',
    description:
      'Created a web-based points redemption app for customers to redeem top-up codes. Comprehensive customer loyalty solution.',
    technologies: ['Node.js', 'React.js', 'MySQL', 'Payment Integration'],
    imageUrl: '',
    featured: true,
  },
  {
    id: 'sicp',
    title: 'SICP E-Presentations',
    description:
      'Built an e-presentations web app for managing research events (authors, dates, promotional videos, event durations, etc.) deployed on AWS.',
    technologies: ['Node.js', 'React.js', 'MySQL', 'AWS', 'Event Management'],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'vehicles-extension',
    title: 'Vehicles-Extension Solution',
    description:
      'Engineered a web app to scrape vehicle data using CRON jobs and store it in MongoDB. Frontend designed with React.js and backend services using Node.js.',
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
    description:
      'Built a web-based management system for a local store to handle sales, purchases, and bookkeeping operations. Deployed on Namecheap for enhanced store management efficiency.',
    technologies: ['Node.js', 'React.js', 'MySQL', 'POS System', 'Namecheap'],
    imageUrl: '',
    featured: false,
  },
  {
    id: 'modern-pos',
    title: 'Modern POS',
    description:
      'Developed a web-based POS system to manage various business operations, including sales, purchases, user management, and accounting. Streamlined solution for retail management.',
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
    title: 'N1QL to Firebase Automation Tool (FYP)',
    description:
      'Created an automation tool for converting N1QL queries into Firebase functions, improving system reliability and user experience. Facilitated seamless integration between N1QL (Couchbase) and Firebase.',
    technologies: ['Node.js', 'Firebase', 'N1QL', 'Couchbase', 'HTML/CSS/JS'],
    imageUrl: '',
    featured: false,
  },
];

export const experiences: Experience[] = [
  {
    id: 'software-engineer-hashlogics',
    title: 'Senior Software Engineer',
    company: 'Hashlogics',
    duration: {
      start: '2022-08',
      end: null,
    },
    responsibilities: [
      'Enhanced skills in Python, ReactJS, and the MERN stack while optimizing web app performance',
      'Implemented AWS Lambda functions and architected microservices frontends for scalable solutions',
      'Administered AWS deployments using Terraform for infrastructure as code',
      'Earned recognition as Employee of the Month for outstanding contributions and team leadership',
      'Led development teams on multiple high-impact projects including CivaSource, GivingFridays, and AlteraApp',
      'Developed FAST APIs for product management, authentication, and AI-driven solutions',
      'Managed Redis Queues for concurrent processing and real-time data handling',
      'Directed teams to implement safety checklists and managed DevOps tasks for Forwood Safety',
      'Built CRM systems using Python, Flask, Django, and ReactJS for TradeFundrr',
      'Engineered real-time player statistics updates using Node.js, TypeScript, and MongoDB for Playertotals',
    ],
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
    title: 'Software Engineer',
    company: 'Skupreme',
    duration: {
      start: '2022-06',
      end: '2022-08',
    },
    responsibilities: [
      'Enhanced web dashboard features using modern frontend technologies',
      'Developed responsive user interfaces with Next.js and TypeScript',
      'Collaborated with remote team to deliver high-quality frontend solutions',
      'Optimized application performance and implemented modern React patterns',
      'Maintained code quality and followed best practices for scalable development',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Frontend Development'],
  },
  {
    id: 'software-engineer-homeats',
    title: 'Software Engineer',
    company: 'Homeats',
    duration: {
      start: '2022-03',
      end: '2022-06',
    },
    responsibilities: [
      'Enhanced and refined web dashboard features for leading online healthy food marketplace',
      'Developed frontend solutions using Next.js with TypeScript for improved user experience',
      'Built and maintained robust REST APIs using Node.js backend architecture',
      'Managed comprehensive API documentation using Swagger for better team collaboration',
      'Optimized application performance and implemented responsive design patterns',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'REST API', 'Swagger'],
  },
  {
    id: 'software-engineer-memberhood',
    title: 'Software Engineer',
    company: 'Memberhood Inc.',
    duration: {
      start: '2021-07',
      end: '2022-07',
    },
    responsibilities: [
      'Engaged in both GraphQL and RESTful API development for comprehensive backend solutions',
      'Implemented Next.js frontend using TypeScript for type-safe development',
      'Developed backend systems with KeystoneJS, GraphQL, and MongoDB for scalable architecture',
      'Integrated Stripe payment processing and onboarding systems with webhook management',
      'Coordinated multiple deployment stages and maintained CI/CD pipelines',
      'Collaborated with international team members across different time zones',
    ],
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
    title: 'Associate Software Engineer',
    company: 'GulzarSoft',
    duration: {
      start: '2020-04',
      end: '2021-07',
    },
    responsibilities: [
      'Acquired foundational professional experience as Full-Stack JavaScript Developer',
      'Crafted responsive web applications using React.js and Node.js technologies',
      'Demonstrated proficiency in both independent development and collaborative team environments',
      'Developed REST APIs for data filtering, searching, and database management',
      'Built comprehensive web solutions from frontend interfaces to backend services',
      'Participated in agile development methodologies and sprint planning',
    ],
    technologies: ['Node.js', 'React.js', 'MySQL', 'MongoDB', 'REST APIs'],
  },
];

export const skills: Skill[] = [
  // Core Technologies
  { name: 'JavaScript', icon: 'SiJavascript', category: 'frontend' },
  { name: 'Python', icon: 'SiPython', category: 'backend' },
  { name: 'PHP', icon: 'SiPhp', category: 'backend' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend' },

  // Backend Frameworks
  { name: 'Node.js', icon: 'SiNodedotjs', category: 'backend' },
  { name: 'Express.js', icon: 'SiExpress', category: 'backend' },
  { name: 'Supabase', icon: 'SiSupabase', category: 'backend' },
  { name: 'KeystoneJS', icon: 'SiNodedotjs', category: 'backend' }, // Using Node.js icon as fallback
  { name: 'Strapi', icon: 'SiStrapi', category: 'backend' },
  { name: 'Django', icon: 'SiDjango', category: 'backend' },
  { name: 'FastAPI', icon: 'SiFastapi', category: 'backend' },

  // Frontend Technologies
  { name: 'React', icon: 'SiReact', category: 'frontend' },
  { name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend' },

  // UI Libraries
  { name: 'Material UI', icon: 'SiMui', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend' },
  { name: 'Ant Design', icon: 'SiAntdesign', category: 'frontend' },
  { name: 'shadcn/ui', icon: 'SiReact', category: 'frontend' }, // Using React icon as fallback
  { name: 'Bootstrap', icon: 'SiBootstrap', category: 'frontend' },

  // Databases & Storage
  { name: 'MongoDB', icon: 'SiMongodb', category: 'database' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'database' },
  { name: 'MySQL', icon: 'SiMysql', category: 'database' },
  { name: 'Redis', icon: 'SiRedis', category: 'database' },
  { name: 'Couchbase', icon: 'SiCouchbase', category: 'database' },
  { name: 'Firebase', icon: 'SiFirebase', category: 'database' },
  { name: 'AWS S3', icon: 'SiAmazons3', category: 'database' },
  { name: 'Cloudinary', icon: 'SiCloudinary', category: 'database' },

  // Cloud & DevOps
  { name: 'AWS EC2', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'AWS ECS', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'AWS Fargate', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'AWS Lightsail', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'AWS CloudFront', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'AWS RDS', icon: 'SiAmazonaws', category: 'tools' },
  { name: 'AWS DynamoDB', icon: 'SiAmazondynamodb', category: 'tools' },
  { name: 'Docker', icon: 'SiDocker', category: 'tools' },
  { name: 'Terraform', icon: 'SiTerraform', category: 'tools' },
  { name: 'DigitalOcean', icon: 'SiDigitalocean', category: 'tools' },
  { name: 'Heroku', icon: 'SiHeroku', category: 'tools' },
  { name: 'Netlify', icon: 'SiNetlify', category: 'tools' },
  { name: 'Vercel', icon: 'SiVercel', category: 'tools' },
  { name: 'Datadog', icon: 'SiDatadog', category: 'tools' },
  { name: 'Git', icon: 'SiGit', category: 'tools' },
  { name: 'GitHub', icon: 'SiGithub', category: 'tools' },
  { name: 'GitLab', icon: 'SiGitlab', category: 'tools' },
  { name: 'Bitbucket', icon: 'SiBitbucket', category: 'tools' },

  // Tools & Utilities
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

export const education: Education[] = [
  {
    id: 'software-engineering-bachelor',
    degree: 'Bachelor of Software Engineering',
    institution: 'University of Gujrat, Hafiz Hayat Campus',
    duration: {
      start: '2016',
      end: '2020',
    },
    location: 'Gujrat, Pakistan',
  },
];
