'use client';

import { motion } from 'framer-motion';
import { FiCalendar } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { experiences } from '@/lib/data';

export function Experience() {
  const t = useTranslations('experience');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section id="experience" className="bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline line */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 top-20 hidden h-20 w-0.5 bg-border md:block" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-6 top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:block" />

              <div className="mb-12 md:ml-16">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {experience.title}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {experience.company}
                        </CardDescription>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FiCalendar className="mr-2 h-4 w-4" />
                        {formatDate(experience.duration.start)} -{' '}
                        {experience.duration.end
                          ? formatDate(experience.duration.end)
                          : t('present')}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="mb-6 space-y-2">
                      {experience.responsibilities.map(
                        (responsibility, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="mr-3 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                            <span className="text-muted-foreground">
                              {responsibility}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map(tech => (
                        <span
                          key={tech}
                          className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
