'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { IconRenderer } from '@/components/ui/icon-renderer';
import { skills } from '@/lib/data';

export function Skills() {
  const t = useTranslations('skills');

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Categories mapping
  const categories = {
    frontend: t('categories.frontend'),
    backend: t('categories.backend'),
    database: t('categories.database'),
    tools: t('categories.tools'),
    other: t('categories.other'),
  };

  const categoryOrder = ['backend', 'frontend', 'database', 'tools', 'other'];

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  // Sorted categories
  const sortedCategories = categoryOrder
    .filter(category => groupedSkills[category]?.length)
    .map(category => [category, groupedSkills[category]] as const);

  // Stats for Additional Skills
  const stats = [
    { value: '4+', label: t('stats.yearsExperience') },
    { value: '25+', label: t('stats.projectsCompleted') },
    { value: '40+', label: t('stats.technologies') },
  ];

  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
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

        {/* Skills Grid */}
        <div className="space-y-12">
          {sortedCategories.map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="mb-6 text-center text-xl font-semibold">
                {categories[category as keyof typeof categories]}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {categorySkills.map(skill => (
                  <motion.div key={skill.name} variants={itemVariants}>
                    <Card className="group cursor-pointer p-4 transition-shadow hover:shadow-lg">
                      <CardContent className="p-0 text-center">
                        <div className="mb-2 flex justify-center transition-transform group-hover:scale-110">
                          <IconRenderer iconName={skill.icon} size={32} />
                        </div>
                        <p className="text-sm font-medium">{skill.name}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {stats.map(stat => (
            <Card key={stat.label} className="p-6 text-center">
              <CardContent className="p-0">
                <div className="mb-2 text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
