import type { Education, Experience, Project } from './types';

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
  // TODO(zagham): add a square photo to public/ and set its path; the hero shows a "ZA" monogram until then.
  avatarUrl: '',
  // TODO(zagham): Cal.com / Calendly link; "Book a call" falls back to the contact section while empty.
  bookingUrl: '',
  cvUrls: {
    europass: '',
    traditional: '',
  },
};

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
  },
  {
    id: 'recurring-donations-platform',
    title: 'Recurring Donations Platform',
    description: 'projectsData.recurring-donations-platform.description',
    technologies: ['Next.js', 'Supabase', 'Deno', 'TypeScript', 'PostgreSQL'],
    liveUrl: '',
    // Shown as an inline diagram in the work explorer; the old image printed confidentiality wording.
    imageUrl: '',
  },
  {
    id: 'playertotals',
    title: 'PlayerTotals',
    description: 'projectsData.playertotals.description',
    technologies: ['Node.js', 'TypeScript', 'Redis', 'MongoDB', 'Real-time'],
    liveUrl: '',
    imageUrl: '/projects/playertotals.webp',
    imageAlt: 'projectsData.playertotals.imageAlt',
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
  },
  {
    id: 'civasource',
    title: 'CivaSource',
    description: 'projectsData.civasource.description',
    technologies: ['FastAPI', 'Python', 'Redis', 'AI/ML', 'Authentication'],
    liveUrl: '',
    imageUrl: '/projects/civasource.webp',
    imageAlt: 'projectsData.civasource.imageAlt',
  },
  {
    id: 'safety-compliance-platform',
    title: 'Safety Compliance Platform',
    description: 'projectsData.safety-compliance-platform.description',
    technologies: [
      'Node.js',
      'TypeScript',
      'AWS Lambda',
      'SQS',
      'Kinesis',
      'S3',
      'PostgreSQL',
      'Terraform',
      'Microservices',
    ],
    liveUrl: '',
    // Shown as an inline diagram in the work explorer; the old image printed confidentiality wording.
    imageUrl: '',
  },
  {
    id: 'real-time-gaming-platform',
    title: 'Real Time Gaming Platform',
    description: 'projectsData.real-time-gaming-platform.description',
    technologies: ['JavaScript', 'Node.js', 'WebSocket', 'UI Libraries'],
    liveUrl: '',
    imageUrl: '/projects/real-time-gaming-platform.webp',
    imageAlt: 'projectsData.real-time-gaming-platform.imageAlt',
  },
  {
    id: 'tradefundrr',
    title: 'TradeFundrr',
    description: 'projectsData.tradefundrr.description',
    technologies: ['Python', 'Flask', 'Django', 'ReactJS', 'CRM'],
    liveUrl: 'https://tradefundrr.com',
    imageUrl: '/projects/tradefundrr.webp',
    imageAlt: 'projectsData.tradefundrr.imageAlt',
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
    imageUrl: '/projects/al-khair-traders-pos.webp',
    imageAlt: 'projectsData.al-khair-traders-pos.imageAlt',
  },
  {
    id: 'autotempest',
    title: 'Autotempest',
    description: 'projectsData.autotempest.description',
    technologies: ['React.js', 'Node.js', 'MySQL', 'REST APIs', 'Web Scraping'],
    liveUrl: 'https://www.autotempest.com',
    imageUrl: '/projects/autotempest.webp',
    imageAlt: 'projectsData.autotempest.imageAlt',
  },
  {
    id: 'points-app',
    title: 'Points App',
    description: 'projectsData.points-app.description',
    technologies: ['Node.js', 'React.js', 'MySQL', 'Payment Integration'],
    imageUrl: '/projects/points-app.webp',
    imageAlt: 'projectsData.points-app.imageAlt',
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
    imageUrl: '/projects/deployment-tool.webp',
    imageAlt: 'projectsData.deployment-tool.imageAlt',
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
