'use client';

import { containerVariants, itemVariants } from 'animations/projects';
import { motion } from 'framer-motion';
import { skills } from 'lib/data';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from 'ui/card';
import { IconRenderer } from 'ui/icon-renderer';

export function Skills() {
  const t = useTranslations('skills');

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
      <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-full text-lg text-muted-foreground sm:max-w-2xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Skills Bento Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sortedCategories.map(([category, categorySkills]) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className={
                categorySkills.length > 12 ? 'sm:col-span-2' : undefined
              }
            >
              <Card className="h-full p-6">
                <CardContent className="p-0">
                  <h3 className="mb-4 text-center text-lg font-semibold">
                    {categories[category as keyof typeof categories]}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {categorySkills.map(skill => (
                      <span
                        key={skill.name}
                        className="flex cursor-default items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-all hover:border-primary/40 hover:bg-primary/20"
                      >
                        <IconRenderer iconName={skill.icon} size={14} />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

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
