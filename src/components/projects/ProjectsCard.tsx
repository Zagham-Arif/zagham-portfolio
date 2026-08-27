'use client';

import { motion } from 'framer-motion';
import { Project } from 'lib/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { Card, CardContent } from 'ui/card';

type ProjectCardProps = {
  project: Project;
  globalIndex?: number;
  size?: 'featured' | 'compact';
};

export function ProjectCard({
  project,
  globalIndex = 0,
  size = 'compact',
}: ProjectCardProps) {
  const t = useTranslations();
  const isFeatured = size === 'featured';
  const gradients = [
    'from-blue-500 via-indigo-500 to-purple-600',
    'from-emerald-400 via-teal-500 to-cyan-600',
    'from-orange-400 via-pink-500 to-rose-600',
    'from-sky-400 via-blue-500 to-indigo-600',
    'from-fuchsia-500 via-pink-500 to-rose-500',
  ];
  const gradientIndex =
    (project.title.charCodeAt(0) + globalIndex) % gradients.length;
  const visibleTechs = isFeatured
    ? project.technologies
    : project.technologies.slice(0, 3);
  const hiddenTechCount = project.technologies.length - visibleTechs.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl">
        {project.imageUrl ? (
          <div
            className={`relative w-full overflow-hidden ${isFeatured ? 'h-48' : 'h-20'}`}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={`flex w-full items-center justify-center rounded-t-2xl bg-gradient-to-br ${gradients[gradientIndex]} ${isFeatured ? 'h-48' : 'h-20'}`}
          >
            <span
              className={`font-bold text-white/90 drop-shadow-lg ${isFeatured ? 'text-4xl' : 'text-2xl'}`}
            >
              {project.title[0]}
            </span>
          </div>
        )}
        <CardContent
          className={`flex flex-1 flex-col ${isFeatured ? 'p-6' : 'p-4'}`}
        >
          {/* Title & Links */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3
              className={`font-semibold ${isFeatured ? 'text-lg' : 'text-sm'}`}
            >
              {project.title}
            </h3>
            <div className="flex shrink-0 gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FiGithub size={isFeatured ? 20 : 16} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FiExternalLink size={isFeatured ? 20 : 16} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          {isFeatured && (
            <p className="mb-4 text-sm text-muted-foreground">
              {t(project.description)}
            </p>
          )}

          {/* Tech Stack */}
          <div className="mt-auto flex flex-wrap gap-2">
            {visibleTechs.map((item, techIndex) => (
              <span
                key={item}
                className="cursor-default rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/20"
                style={{
                  transitionDelay: `${techIndex * 40}ms`,
                }}
              >
                {item}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span className="cursor-default rounded-full border border-muted-foreground/20 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                +{hiddenTechCount}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
