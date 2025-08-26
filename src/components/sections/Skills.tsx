'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { SkillsMarquee } from '@/components/skills/SkillsMarquee';
import { skills } from '@/lib/data';

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

        {/* Skills Marquee per Category */}
        <div className="space-y-12">
          {sortedCategories.map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="mb-6 text-center text-xl font-semibold">
                {categories[category as keyof typeof categories]}
              </h3>
              <SkillsMarquee skills={categorySkills} />
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
