import { normalizeTech } from './skills.ts';

// Skills grouped by how deeply Zagham uses them. Edit `tier` here to re-sort
// the stack section. `id` is a normalizeTech() id; `slug` a simple-icons slug
// (null: AWS service, shown as a badge).

export type Tier = 'core' | 'strong' | 'familiar';

export interface StackSkill {
  id: string;
  label: string;
  slug: string | null;
  tier: Tier;
}

export const TIERS: Tier[] = ['core', 'strong', 'familiar'];

export const skills: StackSkill[] = [
  { id: 'nodejs', label: 'Node.js', slug: 'nodedotjs', tier: 'core' },
  { id: 'typescript', label: 'TypeScript', slug: 'typescript', tier: 'core' },
  { id: 'express', label: 'Express', slug: 'express', tier: 'core' },
  { id: 'postgres', label: 'PostgreSQL', slug: 'postgresql', tier: 'core' },
  { id: 'mongodb', label: 'MongoDB', slug: 'mongodb', tier: 'core' },
  { id: 'redis', label: 'Redis', slug: 'redis', tier: 'core' },
  { id: 'nextjs', label: 'Next.js', slug: 'nextdotjs', tier: 'core' },
  { id: 'react', label: 'React', slug: 'react', tier: 'core' },
  { id: 'lambda', label: 'AWS Lambda', slug: null, tier: 'strong' },
  { id: 'sqs', label: 'AWS SQS', slug: null, tier: 'strong' },
  { id: 's3', label: 'AWS S3', slug: null, tier: 'strong' },
  { id: 'ecs', label: 'AWS ECS', slug: null, tier: 'strong' },
  { id: 'terraform', label: 'Terraform', slug: 'terraform', tier: 'strong' },
  { id: 'docker', label: 'Docker', slug: 'docker', tier: 'strong' },
  { id: 'python', label: 'Python', slug: 'python', tier: 'strong' },
  { id: 'fastapi', label: 'FastAPI', slug: 'fastapi', tier: 'strong' },
  { id: 'graphql', label: 'GraphQL', slug: 'graphql', tier: 'strong' },
  { id: 'mysql', label: 'MySQL', slug: 'mysql', tier: 'strong' },
  { id: 'supabase', label: 'Supabase', slug: 'supabase', tier: 'strong' },
  { id: 'kinesis', label: 'Kinesis', slug: null, tier: 'familiar' },
  { id: 'datadog', label: 'Datadog', slug: 'datadog', tier: 'familiar' },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    slug: 'tailwindcss',
    tier: 'familiar',
  },
];

export function skillsByTier(): { tier: Tier; skills: StackSkill[] }[] {
  return TIERS.map(tier => ({
    tier,
    skills: skills.filter(s => s.tier === tier),
  }));
}

/** simple-icons slug for a normalised technology id, or undefined when there is no icon. */
export function slugFor(id: string): string | null | undefined {
  const skill = skills.find(s => s.id === id);
  return skill ? skill.slug : undefined;
}

/** Names of the roles and projects whose technology list includes the skill. */
export function whereUsed(
  id: string,
  sources: { name: string; technologies: string[] }[]
): string[] {
  return sources
    .filter(s => s.technologies.some(tech => normalizeTech(tech) === id))
    .map(s => s.name);
}
