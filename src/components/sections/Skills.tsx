'use client';

import { containerVariants, itemVariants } from 'animations/projects';
import { motion } from 'framer-motion';
import { coreSkills, projects, skills } from 'lib/data';
import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import { FiCloud, FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';
import { Card, CardContent } from 'ui/card';
import { IconRenderer } from 'ui/icon-renderer';

// Cloud & DevOps is the largest list, so it goes last and spans the full row.
const categoryOrder = ['backend', 'frontend', 'database', 'other', 'tools'];

const categoryIcons: Record<string, IconType> = {
  backend: FiServer,
  frontend: FiCode,
  database: FiDatabase,
  tools: FiCloud,
  other: FiTool,
};

export function Skills() {
  const t = useTranslations('skills');

  const grouped = skills.reduce(
    (acc, skill) => {
      acc[skill.category] = acc[skill.category] || [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  const categories = categoryOrder
    .filter(category => grouped[category]?.length)
    .map(category => ({
      id: category,
      label: t(`categories.${category}`),
      Icon: categoryIcons[category] ?? FiTool,
      items: grouped[category],
    }));

  const stats = [
    { value: '5+', label: t('stats.yearsExperience') },
    { value: `${projects.length}`, label: t('stats.projectsCompleted') },
    { value: `${skills.length}`, label: t('stats.technologies') },
  ];

  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="container mx-auto px-1 sm:px-3 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mx-auto max-w-full text-lg text-muted-foreground sm:max-w-2xl">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Core stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t('coreStack')}
          </h3>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-5">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-primary/15 bg-gradient-to-b from-primary/[0.07] to-transparent px-3 py-4 text-center transition-colors hover:border-primary/40"
              >
                <IconRenderer iconName={skill.icon} size={28} />
                <span className="text-xs font-semibold sm:text-sm">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className={category.items.length > 14 ? 'md:col-span-2' : ''}
            >
              <Card className="h-full border-border/60 transition-colors hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3 border-b border-border/60 pb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <category.Icon className="h-4 w-4" />
                    </span>
                    <h3 className="flex-1 text-base font-semibold">
                      {category.label}
                    </h3>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {category.items.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map(skill => (
                      <span
                        key={skill.name}
                        className="flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                      >
                        <IconRenderer iconName={skill.icon} size={16} />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {stats.map(stat => (
            <Card
              key={stat.label}
              className="border-border/60 bg-gradient-to-b from-primary/[0.06] to-transparent p-6 text-center"
            >
              <CardContent className="p-0">
                <div className="mb-1 text-4xl font-bold text-primary">
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
