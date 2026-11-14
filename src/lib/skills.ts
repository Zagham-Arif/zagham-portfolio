// Technology names in data.ts are written for people ("React.js", "AWS ECS Fargate").
// These helpers fold them to one id so usage can be counted across projects and roles.

const ALIASES: Record<string, string> = {
  reactjs: 'react',
  'react.js': 'react',
  'node.js': 'nodejs',
  'next.js': 'nextjs',
  postgresql: 'postgres',
  rds: 'postgres',
  'aws lambda': 'lambda',
  'aws sqs': 'sqs',
  'aws s3': 's3',
  'aws ecs': 'ecs',
  'aws ecs fargate': 'ecs',
  'express.js': 'express',
  expressjs: 'express',
  'tailwind css': 'tailwind',
  tailwindcss: 'tailwind',
};

export function normalizeTech(name: string): string {
  const key = name.trim().toLowerCase();
  return ALIASES[key] ?? key.replace(/\s+/g, '-');
}

export function usesSkill(technologies: string[], id: string): boolean {
  return technologies.some(tech => normalizeTech(tech) === id);
}
