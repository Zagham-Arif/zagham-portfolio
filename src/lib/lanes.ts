import { normalizeTech } from './skills.ts';

// Sorts a project's technology list into the three lanes of its mini
// architecture diagram. Technologies not listed here (concepts such as
// "REST APIs" or "AI/ML") are left out of the drawing.

export type Lane = 'client' | 'service' | 'data';

interface TechInfo {
  lane: Lane;
  label: string;
  /** simple-icons slug; null = AWS service badge; undefined = text only. */
  slug?: string | null;
}

const TECH: Record<string, TechInfo> = {
  react: { lane: 'client', label: 'React', slug: 'react' },
  nextjs: { lane: 'client', label: 'Next.js', slug: 'nextdotjs' },
  'tanstack-query': {
    lane: 'client',
    label: 'TanStack Query',
    slug: 'reactquery',
  },
  tailwind: { lane: 'client', label: 'Tailwind CSS', slug: 'tailwindcss' },
  nodejs: { lane: 'service', label: 'Node.js', slug: 'nodedotjs' },
  express: { lane: 'service', label: 'Express', slug: 'express' },
  fastapi: { lane: 'service', label: 'FastAPI', slug: 'fastapi' },
  python: { lane: 'service', label: 'Python', slug: 'python' },
  flask: { lane: 'service', label: 'Flask', slug: 'flask' },
  django: { lane: 'service', label: 'Django', slug: 'django' },
  graphql: { lane: 'service', label: 'GraphQL', slug: 'graphql' },
  keystonejs: { lane: 'service', label: 'KeystoneJS' },
  javascript: { lane: 'service', label: 'JavaScript', slug: 'javascript' },
  websocket: { lane: 'service', label: 'WebSocket' },
  lambda: { lane: 'service', label: 'AWS Lambda', slug: null },
  ecs: { lane: 'service', label: 'AWS ECS', slug: null },
  postgres: { lane: 'data', label: 'PostgreSQL', slug: 'postgresql' },
  mongodb: { lane: 'data', label: 'MongoDB', slug: 'mongodb' },
  mysql: { lane: 'data', label: 'MySQL', slug: 'mysql' },
  redis: { lane: 'data', label: 'Redis', slug: 'redis' },
  supabase: { lane: 'data', label: 'Supabase', slug: 'supabase' },
  firebase: { lane: 'data', label: 'Firebase', slug: 'firebase' },
  couchbase: { lane: 'data', label: 'Couchbase', slug: 'couchbase' },
  stripe: { lane: 'data', label: 'Stripe', slug: 'stripe' },
  sqs: { lane: 'data', label: 'AWS SQS', slug: null },
  s3: { lane: 'data', label: 'AWS S3', slug: null },
};

const LANES: Lane[] = ['client', 'service', 'data'];
const PER_LANE = 2;

export function stackLanes(
  technologies: string[]
): { lane: Lane; nodes: { label: string; slug?: string | null }[] }[] {
  const known = [...new Set(technologies.map(normalizeTech))]
    .map(id => TECH[id])
    .filter((info): info is TechInfo => Boolean(info));
  return LANES.map(lane => ({
    lane,
    nodes: known
      .filter(info => info.lane === lane)
      .slice(0, PER_LANE)
      .map(({ label, slug }) => ({ label, slug })),
  })).filter(l => l.nodes.length > 0);
}
