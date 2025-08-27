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
};

export function ProjectCard({ project, globalIndex = 0 }: ProjectCardProps) {
  const t = useTranslations();
  const gradients = [
    'from-blue-500 via-indigo-500 to-purple-600',
    'from-emerald-400 via-teal-500 to-cyan-600',
    'from-orange-400 via-pink-500 to-rose-600',
    'from-sky-400 via-blue-500 to-indigo-600',
    'from-fuchsia-500 via-pink-500 to-rose-500',
  ];
  const gradientIndex =
    (project.title.charCodeAt(0) + globalIndex) % gradients.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl">
        {project.imageUrl ? (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={`flex h-48 w-full items-center justify-center rounded-t-2xl bg-gradient-to-br ${gradients[gradientIndex]}`}
          >
            <span className="text-4xl font-bold text-white/90 drop-shadow-lg">
              {project.title[0]}
            </span>
          </div>
        )}
        <CardContent className="p-6">
          {/* Title & Links */}
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FiGithub size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FiExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-muted-foreground">
            {t(project.description)}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((item, techIndex) => (
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
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
