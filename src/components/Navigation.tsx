'use client';

import { motion } from 'framer-motion';
import { useActiveSection } from 'hooks/useActiveSection';
import { personalInfo } from 'lib/data';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronDown, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Button } from 'ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui/dropdown-menu';

// Section links carry the locale so they also work from /projects and /contact,
// where the target section lives on another route.
const sectionItems = [
  { key: 'home', hash: '' },
  { key: 'projects', hash: '#projects' },
  { key: 'experience', hash: '#experience' },
  { key: 'skills', hash: '#skills' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0] || 'en';
  const currentPath = `/${segments.slice(1).join('/')}`;
  const home = `/${currentLocale}`;

  const languages = [
    { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
    { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
  ];

  const isHome = currentPath === '/';
  const activeSection = useActiveSection(
    sectionItems.filter(item => item.hash).map(item => item.hash.slice(1)),
    isHome
  );

  const navLinks = sectionItems.map(item => ({
    key: item.key,
    href: `${home}${item.hash}`,
    isActive: isHome && item.hash.slice(1) === activeSection,
  }));

  const allProjects = {
    key: 'allProjects',
    href: `${home}/projects`,
    isActive: currentPath === '/projects',
  };

  const contact = {
    key: 'contact',
    href: `${home}/contact`,
    isActive: currentPath === '/contact',
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}${currentPath === '/' ? '' : currentPath}`);
  };

  const currentLanguage =
    languages.find(lang => lang.code === currentLocale) || languages[0];

  const linkClass = (isActive: boolean) =>
    `group relative pb-1 text-sm transition-colors ${
      isActive ? 'text-primary' : 'text-foreground/80 hover:text-primary'
    }`;

  const underline = (isActive: boolean) =>
    `absolute bottom-0 left-0 h-[2px] w-full origin-left bg-primary transition-transform duration-300 ${
      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
    }`;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-2 sm:px-3 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Name */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link
              href={home}
              className="group relative px-3 text-xl font-bold transition-colors hover:text-primary"
            >
              {personalInfo.name}
              <span className="absolute -bottom-1 left-3 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {[...navLinks, allProjects, contact].map(item => (
              <motion.div
                key={item.key}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href={item.href} className={linkClass(item.isActive)}>
                  {t(item.key)}
                  <span className={underline(item.isActive)} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Theme + Language */}
          <div className="hidden items-center space-x-2 lg:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={t('toggleTheme')}
            >
              <FiSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <FiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <span className="text-sm font-medium">
                    {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                  </span>
                  <FiChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map(language => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => switchLanguage(language.code)}
                    className="flex items-center space-x-2"
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t('toggleMenu')}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t bg-background lg:hidden"
        >
          <div className="space-y-4 px-6 py-4">
            {[...navLinks, allProjects, contact].map(item => (
              <Link
                key={item.key}
                href={item.href}
                className={`block transition-colors ${
                  item.isActive
                    ? 'font-medium text-primary'
                    : 'text-foreground/80 hover:text-primary'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  title={t('toggleTheme')}
                >
                  <FiSun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <FiMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <span className="text-sm font-medium">
                      {currentLanguage.flag}{' '}
                      {currentLanguage.code.toUpperCase()}
                    </span>
                    <FiChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map(language => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => switchLanguage(language.code)}
                      className="flex items-center space-x-2"
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
