'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { experiences } from '@/lib/data';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiTrendingUp,
} from 'react-icons/fi';

export function Experience() {
  const t = useTranslations();
  const tRaw = (key: string): string[] => t.raw(key);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 200,
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

  const getCompanyInitials = (company: string) => {
    return company
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section
      id="experience"
      className="bg-gradient-to-br from-muted/30 via-background to-muted/50 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <motion.h2
            className="mb-4 text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('experience.title')}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('experience.subtitle')}
          </motion.p>
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
              {index < experiences.length - 1 && (
                <motion.div
                  className="absolute left-8 top-24 hidden h-24 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:block"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ transformOrigin: 'top' }}
                />
              )}

              <motion.div
                className="absolute left-6 top-8 hidden h-4 w-4 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30 md:block"
                variants={dotVariants}
                whileHover={{ scale: 1.3 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(var(--primary), 0.4)',
                    '0 0 0 10px rgba(var(--primary), 0)',
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut',
                  },
                }}
              />

              <div className="mb-16 md:ml-16">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <Card className="group overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/30 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                    <CardHeader className="relative overflow-hidden bg-gradient-to-r from-muted/50 to-muted/30 pb-6">
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                          {/* Company logo placeholder */}
                          <motion.div
                            className="flex-shrink-0"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-md">
                              <span className="text-sm font-bold text-primary">
                                {getCompanyInitials(t(experience.company))}
                              </span>
                            </div>
                          </motion.div>

                          <div className="flex-1">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <CardTitle className="mb-2 text-xl transition-colors duration-300 group-hover:text-primary">
                                {t(experience.title)}
                              </CardTitle>
                              <CardDescription className="flex items-center gap-2 text-lg font-medium text-primary">
                                <FiBriefcase className="h-4 w-4" />
                                {t(experience.company)}
                              </CardDescription>
                            </motion.div>
                          </div>
                        </div>

                        <motion.div
                          className="flex items-center gap-2 rounded-full bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <FiCalendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {formatDate(experience.duration.start)} -{' '}
                            {experience.duration.end
                              ? formatDate(experience.duration.end)
                              : t('experience.present')}
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        className="absolute right-4 top-4 h-20 w-20 rounded-full bg-primary/5"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 30,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'linear',
                        }}
                      />
                      <motion.div
                        className="absolute bottom-2 right-8 h-12 w-12 rounded-full bg-primary/10"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 4,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                        }}
                      />
                    </CardHeader>

                    <CardContent className="pt-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-8"
                      >
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          <FiTrendingUp className="h-4 w-4 text-primary" />
                          {t('experience.keyAchievements')}
                        </h4>
                        <ul className="space-y-3">
                          {tRaw(experience.responsibilitiesKey).map(
                            (responsibility, idx) => (
                              <motion.li
                                key={idx}
                                className="group/item flex items-start gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * idx }}
                                whileHover={{ x: 8 }}
                              >
                                <motion.div
                                  className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-sm"
                                  whileHover={{ scale: 1.5 }}
                                  transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                  }}
                                />
                                <span className="text-muted-foreground transition-colors duration-300 group-hover/item:text-foreground">
                                  {responsibility}
                                </span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          <FiMapPin className="h-4 w-4 text-primary" />
                          {t('experience.technologiesUsed')}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {experience.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:border-primary/40 hover:bg-primary/20 hover:shadow-md"
                              initial={{ opacity: 0, scale: 0, y: 20 }}
                              whileInView={{ opacity: 1, scale: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.5,
                                delay: 0.05 * techIndex,
                                type: 'spring',
                                stiffness: 200,
                              }}
                              whileHover={{
                                scale: 1.1,
                                y: -4,
                                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
