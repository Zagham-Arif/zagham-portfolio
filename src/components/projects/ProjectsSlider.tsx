'use client';

import { motion } from 'framer-motion';
import { ProjectNavigation } from './ProjectNavigation';
import { ProjectCard } from './ProjectsCard';

import { containerVariants } from '@/components/animations/projects';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Project } from '@/lib/types';
import { ProjectPaginationDots } from './ProjectPaginationDots';

interface ProjectsSliderProps {
  featuredProjects: Project[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

export function ProjectsSlider({
  featuredProjects,
  currentSlide,
  setCurrentSlide,
}: ProjectsSliderProps) {
  const isMobile = useIsMobile();
  const cardsPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(featuredProjects.length / cardsPerSlide);

  return (
    <div className="relative">
      {/* Nav */}
      <ProjectNavigation
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      {/* Slides */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex transition-all duration-700 ease-[0.25,0.46,0.45,0.94]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className={`grid gap-8 ${isMobile ? '' : 'md:grid-cols-2'}`}>
                {featuredProjects
                  .slice(
                    slideIndex * cardsPerSlide,
                    slideIndex * cardsPerSlide + cardsPerSlide
                  )
                  .map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      globalIndex={slideIndex * cardsPerSlide + index}
                    />
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      {/* Dots */}
      <ProjectPaginationDots
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
}
