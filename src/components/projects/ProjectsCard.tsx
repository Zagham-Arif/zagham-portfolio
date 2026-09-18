'use client';

import { motion } from 'framer-motion';
import { Project } from 'lib/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { Card, CardContent } from 'ui/card';

type ProjectCardProps = {
  project: Project;
  globalIndex?: number;
};

const gradients = [
  'from-blue-500 via-indigo-500 to-purple-600',
  'from-emerald-400 via-teal-500 to-cyan-600',
  'from-orange-400 via-pink-500 to-rose-600',
  'from-sky-400 via-blue-500 to-indigo-600',
  'from-fuchsia-500 via-pink-500 to-rose-500',
];

export function ProjectCard({ project, globalIndex = 0 }: ProjectCardProps) {
  const t = useTranslations();
  const gradientIndex =
    (project.title.charCodeAt(0) + globalIndex) % gradients.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(globalIndex, 5) * 0.05 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border-border/60 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
        {/* Banner */}
        <div className="relative h-44 w-full overflow-hidden border-b border-border/60">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.imageAlt ? t(project.imageAlt) : project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="bg-white object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradients[gradientIndex]}`}
            >
              <span className="text-5xl font-bold text-white/90 drop-shadow-lg">
                {project.title[0]}
              </span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <div className="flex shrink-0 items-center gap-2 pt-0.5">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} ${t('projects.code')}`}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <FiGithub size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} ${t('projects.liveDemo')}`}
                  className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                >
                  <FiArrowUpRight size={18} />
                </a>
              )}
            </div>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            {t(project.description)}
          </p>

          <div className="mt-auto flex flex-wrap gap-2">
            {project.technologies.map(item => (
              <span
                key={item}
                className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
