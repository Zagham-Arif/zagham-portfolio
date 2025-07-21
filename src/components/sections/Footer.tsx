'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  FiArrowUp,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMessageCircle,
} from 'react-icons/fi';
import Link from 'next/link';
import { SiFiverr, SiUpwork } from 'react-icons/si';
import { personalInfo } from '@/lib/data';

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Zagham-Arif',
      icon: FiGithub,
      color: '#181717',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/zagham-arif',
      icon: FiLinkedin,
      color: '#0A66C2',
    },
    {
      name: 'Email',
      href: `mailto:${personalInfo.email}`,
      icon: FiMail,
      color: '#EA4335',
    },
    {
      name: 'Discord',
      href: 'https://discord.com/users/zagham_arif',
      icon: FiMessageCircle,
      color: '#5865F2',
    },
  ];

  const freelanceLinks = [
    {
      name: 'Fiverr',
      href: 'https://www.fiverr.com/zagham123',
      icon: SiFiverr,
      color: '#1DBF73',
    },
    {
      name: 'Upwork',
      href: 'https://www.upwork.com/freelancers/~01b58b210c60ff7195',
      icon: SiUpwork,
      color: '#14A800',
    },
  ];

  const quickLinks = [
    { name: tNav('home'), href: '#hero' },
    { name: tNav('projects'), href: '#projects' },
    { name: tNav('experience'), href: '#experience' },
    { name: tNav('skills'), href: '#skills' },
    { name: tNav('contact'), href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
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
              <h3 className="mb-4 text-2xl font-bold">{personalInfo.name}</h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                {tFooter('brandDescription')}
              </p>
              <div className="flex flex-wrap gap-4">
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map(link => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-full border bg-background p-2 transition-colors hover:bg-background/80"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon
                        className="h-5 w-5 transition-colors"
                        style={{ color: link.color }}
                      />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Freelance Platform Links */}
                <div className="flex space-x-4">
                  {freelanceLinks.map(link => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-full border bg-background p-2 transition-colors hover:bg-background/80"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <link.icon
                        className="h-5 w-5 transition-colors"
                        style={{ color: link.color }}
                      />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
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
                  <FiMail
                    className="mr-2 h-4 w-4"
                    style={{ color: '#EA4335' }}
                  />
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {personalInfo.email}
                  </a>
                </li>
                <li className="flex items-center">
                  <FiMessageCircle
                    className="mr-2 h-4 w-4"
                    style={{ color: '#5865F2' }}
                  />
                  <span>{tFooter('availableForWork')}</span>
                </li>
                <li className="flex items-center">
                  <SiFiverr
                    className="mr-2 h-4 w-4"
                    style={{ color: '#1DBF73' }}
                  />
                  <a
                    href="https://www.fiverr.com/zaghama123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {tFooter('hireOnFiverr')}
                  </a>
                </li>
                <li className="flex items-center">
                  <SiUpwork
                    className="mr-2 h-4 w-4"
                    style={{ color: '#14A800' }}
                  />
                  <a
                    href="https://www.upwork.com/freelancers/~01234567890abcdef"
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

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center text-sm text-muted-foreground"
            >
              © 2025 {personalInfo.name}. {tFooter('builtWith')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 md:mt-0"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToTop}
                className="group"
              >
                <FiArrowUp className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                {tFooter('backToTop')}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
