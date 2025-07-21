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

export function Projects() {
  const t = useTranslations('projects');
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const featuredProjects = projects.filter(project => project.featured);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  // Function to generate gradient background based on project index
  const getProjectGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-blue-500 to-purple-600',
      'bg-gradient-to-br from-green-500 to-teal-600',
      'bg-gradient-to-br from-orange-500 to-red-600',
      'bg-gradient-to-br from-indigo-500 to-blue-600',
      'bg-gradient-to-br from-pink-500 to-rose-600',
    ];
    return gradients[index % gradients.length];
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
    // Scroll to a hypothetical "all projects" section or show modal
    window.open('https://github.com/Zagham-Arif', '_blank');
  };

  return (
    <section id="projects" className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Project Slider */}
        <div className="relative">
          {/* Slider Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-semibold"
            >
              Featured Projects
            </motion.h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="group"
              >
                <FiChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="group"
              >
                <FiChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Projects Grid with Slider */}
          <div className="overflow-hidden">
            <motion.div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
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
                            <Card className="group h-full overflow-hidden border-0 bg-gradient-to-br from-background to-muted/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                              {/* Project Icon Header */}
                              <div
                                className={`h-32 ${getProjectGradient(globalIndex)} relative overflow-hidden`}
                              >
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.div
                                    className="rounded-full bg-white/20 p-4 backdrop-blur-sm"
                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                  >
                                    <FiCode className="h-10 w-10 text-white" />
                                  </motion.div>
                                </div>
                                {/* Decorative elements */}
                                <motion.div
                                  className="absolute right-4 top-4 h-20 w-20 rounded-full bg-white/10"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                  }}
                                />
                                <motion.div
                                  className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white/10"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                              </div>

                              <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <motion.div
                                      whileHover={{ x: 5 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <CardTitle className="mb-3 text-xl transition-colors group-hover:text-primary">
                                        {project.title}
                                      </CardTitle>
                                      <CardDescription className="text-sm leading-relaxed">
                                        {project.description}
                                      </CardDescription>
                                    </motion.div>
                                  </div>
                                  <motion.div
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <FiZap className="ml-3 h-6 w-6 flex-shrink-0 text-primary" />
                                  </motion.div>
                                </div>
                              </CardHeader>

                              <CardContent className="pt-0">
                                {/* Technologies */}
                                <div className="mb-6 flex flex-wrap gap-2">
                                  {project.technologies.map(
                                    (tech, techIndex) => (
                                      <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: techIndex * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="cursor-default rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                                      >
                                        {tech}
                                      </motion.span>
                                    )
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                  {project.githubUrl && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      asChild
                                      className="group/btn flex-1"
                                    >
                                      <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <FiGithub className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                                        Code
                                      </motion.a>
                                    </Button>
                                  )}
                                  {project.liveUrl && (
                                    <Button
                                      size="sm"
                                      asChild
                                      className="group/btn flex-1"
                                    >
                                      <motion.a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <FiExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                                        Demo
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

          {/* Slider Indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(featuredProjects.length / 2) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'scale-125 bg-primary'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              )
            )}
          </div>
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="group"
            onClick={handleViewAllProjects}
          >
            <FiEye className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            {t('viewProject')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
