'use client';

import { useState, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  FiGithub,
  FiExternalLink,
  FiEye,
  FiCode,
  FiZap,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projects } from '@/lib/data';
import { Links } from '@/constants/links';

export function Projects() {
  const t = useTranslations('projects');
  const tProjectData = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(project => project.featured);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // 🔹 Replace getProjectImage with this
  const getProjectImage = (project: { title: string }, index: number) => {
    const gradients = [
      'from-blue-500 via-indigo-500 to-purple-600',
      'from-emerald-400 via-teal-500 to-cyan-600',
      'from-orange-400 via-pink-500 to-rose-600',
      'from-sky-400 via-blue-500 to-indigo-600',
      'from-fuchsia-500 via-pink-500 to-rose-500',
    ];
    const bg = gradients[index % gradients.length];

    return (
      <div
        className={`flex h-48 w-full items-center justify-center rounded-t-2xl bg-gradient-to-br ${bg}`}
      >
        <span className="text-4xl font-bold text-white/90 drop-shadow-lg">
          {project.title[0]}
        </span>
      </div>
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      prev => (prev + 1) % Math.ceil(featuredProjects.length / 2)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      prev =>
        (prev - 1 + Math.ceil(featuredProjects.length / 2)) %
        Math.ceil(featuredProjects.length / 2)
    );
  };

  const handleViewAllProjects = () => {
    window.open(Links.github, '_blank');
  };

  return (
    <section id="projects" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 text-center"
        >
          <motion.h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('title')}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Project Slider */}
        <div className="relative">
          {/* Slider Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl font-semibold"
            >
              {t('title')}
            </motion.h3>
            <motion.div
              className="flex space-x-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="group bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FiChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="group bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FiChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* Projects Grid with Enhanced Slider */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              ref={sliderRef}
              className="flex transition-all duration-700 ease-[0.25,0.46,0.45,0.94]"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {Array.from({
                length: Math.ceil(featuredProjects.length / 2),
              }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid gap-8 md:grid-cols-2">
                    {featuredProjects
                      .slice(slideIndex * 2, slideIndex * 2 + 2)
                      .map((project, index) => {
                        const globalIndex = slideIndex * 2 + index;
                        return (
                          <motion.div key={project.id} variants={itemVariants}>
                            <Card className="group h-full overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/50 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10">
                              <div className="relative overflow-hidden rounded-t-2xl">
                                {getProjectImage(project, globalIndex)}

                                {/* Overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                {/* Floating corner icon */}
                                <motion.div
                                  className="absolute right-4 top-4 rounded-full bg-white/10 p-2 backdrop-blur-md"
                                  whileHover={{ scale: 1.2, rotate: 20 }}
                                  transition={{ duration: 0.4, type: 'spring' }}
                                >
                                  <FiCode className="h-5 w-5 text-white" />
                                </motion.div>
                              </div>

                              <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <motion.div
                                      whileHover={{ x: 8 }}
                                      transition={{
                                        duration: 0.3,
                                        type: 'spring',
                                        stiffness: 300,
                                      }}
                                    >
                                      <CardTitle className="mb-3 text-xl transition-colors duration-300 group-hover:text-primary">
                                        {project.title}
                                      </CardTitle>
                                      <CardDescription className="text-sm leading-relaxed">
                                        {tProjectData(project.description)}
                                      </CardDescription>
                                    </motion.div>
                                  </div>
                                  <motion.div
                                    whileHover={{ rotate: 180, scale: 1.2 }}
                                    transition={{
                                      duration: 0.4,
                                      type: 'spring',
                                    }}
                                  >
                                    <FiZap className="ml-3 h-6 w-6 flex-shrink-0 text-primary" />
                                  </motion.div>
                                </div>
                              </CardHeader>

                              <CardContent className="pt-0">
                                <div className="mb-6 flex flex-wrap gap-2">
                                  {project.technologies.map(
                                    (tech, techIndex) => (
                                      <motion.span
                                        key={tech}
                                        initial={{
                                          opacity: 0,
                                          scale: 0,
                                          y: 20,
                                        }}
                                        whileInView={{
                                          opacity: 1,
                                          scale: 1,
                                          y: 0,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                          delay: techIndex * 0.1,
                                          duration: 0.5,
                                          type: 'spring',
                                          stiffness: 200,
                                        }}
                                        whileHover={{
                                          scale: 1.1,
                                          y: -2,
                                          boxShadow:
                                            '0 4px 12px rgba(0,0,0,0.15)',
                                        }}
                                        className="cursor-default rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/20"
                                      >
                                        {tech}
                                      </motion.span>
                                    )
                                  )}
                                </div>

                                <div className="flex gap-3">
                                  {project.githubUrl && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      asChild
                                      className="group/btn flex-1 bg-transparent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                    >
                                      <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                          type: 'spring',
                                          stiffness: 300,
                                        }}
                                      >
                                        <FiGithub className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12" />
                                        {t('code')}
                                      </motion.a>
                                    </Button>
                                  )}
                                  {project.liveUrl && (
                                    <Button
                                      size="sm"
                                      asChild
                                      className="group/btn flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                                    >
                                      <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{
                                          type: 'spring',
                                          stiffness: 300,
                                        }}
                                      >
                                        <FiExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                        {t('demo')}
                                      </motion.a>
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center space-x-3">
            {Array.from({ length: Math.ceil(featuredProjects.length / 2) }).map(
              (_, index) => (
                <motion.button
                  key={index}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === currentSlide
                      ? 'w-8 bg-primary shadow-lg shadow-primary/30'
                      : 'w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: index === currentSlide ? 1.1 : 1,
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="group bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            onClick={handleViewAllProjects}
          >
            <FiEye className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-125" />
            {t('viewCode')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
