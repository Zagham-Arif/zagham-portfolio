'use client';

import { containerVariants, itemVariants } from 'animations/projects';
import { ProjectCard } from 'components/projects/ProjectsCard';
import { Links } from 'constants/links';
import { motion } from 'framer-motion';
import { projects } from 'lib/data';
import { useTranslations } from 'next-intl';
import { Button } from 'ui/button';

export function Projects() {
  const t = useTranslations('projects');
  const orderedProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  const handleViewAllProjects = () => {
    window.open(Links.github, '_blank');
  };

  return (
    <section id="projects" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
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
        <motion.div
          className="grid auto-rows-[14rem] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {orderedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={
                project.featured
                  ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2'
                  : ''
              }
            >
              <ProjectCard
                project={project}
                globalIndex={index}
                size={project.featured ? 'featured' : 'compact'}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="group bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            onClick={handleViewAllProjects}
          >
            {t('viewCode')}
          </Button>
        </div>
      </div>
    </section>
  );
}
