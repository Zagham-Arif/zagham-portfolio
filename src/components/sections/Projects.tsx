'use client';

import {
  containerVariants,
  itemVariants,
} from '@/components/animations/projects';
import { ProjectsSlider } from '@/components/projects/ProjectsSlider';
import { Button } from '@/components/ui/button';
import { Links } from '@/constants/links';
import { projects } from '@/lib/data';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function Projects() {
  const t = useTranslations('projects');
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProjects = projects.filter(project => project.featured);

  const handleViewAllProjects = () => {
    window.open(Links.github, '_blank');
  };

  return (
    <section id="projects" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
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
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            variants={itemVariants}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>
        <div className="relative">
          <ProjectsSlider
            featuredProjects={featuredProjects}
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </div>
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
