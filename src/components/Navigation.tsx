'use client';

import { motion } from 'framer-motion';
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

const navItems = [
  { key: 'home', href: '#hero' },
  { key: 'projects', href: '#projects' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const router = useRouter();
  const languages = [
    { code: 'en', name: t('languages.en'), flag: '🇺🇸' },
    { code: 'es', name: t('languages.es'), flag: '🇪🇸' },
  ];

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const switchLanguage = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  const currentLanguage =
    languages.find(lang => lang.code === currentLocale) || languages[0];

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
              href="/"
              className="relative px-3 text-xl font-bold transition-colors hover:text-primary"
            >
              {personalInfo.name}
              <motion.span
                layoutId="underline-name"
                className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map(item => {
              return (
                <motion.div
                  key={item.key}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="relative pb-1 text-foreground/80 transition-colors hover:text-primary"
                  >
                    {t(item.key)}
                    <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Theme + Language */}
          <div className="hidden items-center space-x-2 md:flex">
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
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
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
          className="border-t bg-background md:hidden"
        >
          <div className="space-y-4 px-6 py-4">
            {navItems.map(item => {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block text-foreground/80 transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </Link>
              );
            })}
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
