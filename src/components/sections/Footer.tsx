'use client';

import { IconRenderer } from '@/components/ui/icon-renderer';
import { Links } from '@/constants/links';
import { freelanceLinks, personalInfo, socialLinks } from '@/lib/data';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');

  const quickLinks = [
    { name: tNav('home'), href: '#hero' },
    { name: tNav('projects'), href: '#projects' },
    { name: tNav('experience'), href: '#experience' },
    { name: tNav('skills'), href: '#skills' },
    { name: tNav('contact'), href: '#contact' },
  ];

  const renderIconLink = (link: {
    name: string;
    url: string;
    icon: string;
  }) => (
    <motion.a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-full border bg-background p-2 transition-colors hover:bg-background/80"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconRenderer iconName={link.icon} size={20} />
      <span className="sr-only">{link.name}</span>
    </motion.a>
  );

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-3 md:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <h3 className="mb-2 text-2xl font-bold">{personalInfo.name}</h3>
              <p className="mb-3 text-sm italic text-primary">
                {tFooter('brandTagline')}
              </p>
              <p className="mb-4 max-w-md text-justify text-muted-foreground">
                {tFooter('brandDescription')}
                <br />
                <sub>© {new Date().getFullYear()}</sub>
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex space-x-4">
                  {socialLinks.map(renderIconLink)}
                </div>
                <div className="flex space-x-4">
                  {freelanceLinks.map(renderIconLink)}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="mb-4 text-lg font-semibold">
                {tFooter('quickLinks')}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="mb-4 text-lg font-semibold">
                {tFooter('getInTouch')}
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center">
                  <IconRenderer iconName="FiMail" size={16} className="mr-2" />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {personalInfo.email}
                  </a>
                </li>
                <li className="flex items-center">
                  <IconRenderer
                    iconName="SiFiverr"
                    size={16}
                    className="mr-2"
                  />
                  <a
                    href={Links.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {tFooter('hireOnFiverr')}
                  </a>
                </li>
                <li className="flex items-center">
                  <IconRenderer
                    iconName="SiUpwork"
                    size={16}
                    className="mr-2"
                  />
                  <a
                    href={Links.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {tFooter('hireOnUpwork')}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
