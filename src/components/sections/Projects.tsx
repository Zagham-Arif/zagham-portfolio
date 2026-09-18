'use client';

import { containerVariants, itemVariants } from 'animations/projects';
import { ProjectCard } from 'components/projects/ProjectsCard';
import { motion } from 'framer-motion';
import { projects } from 'lib/data';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { Button } from 'ui/button';

export function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const featured = projects.filter(project => project.featured);

  return (
    <section id="projects" className="bg-muted/30 px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            variants={itemVariants}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-full text-lg text-muted-foreground sm:max-w-2xl"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              globalIndex={index}
            />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          >
            <Link href={`/${locale}/projects`}>
              {t('viewAllCount', { count: projects.length })}
              <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
