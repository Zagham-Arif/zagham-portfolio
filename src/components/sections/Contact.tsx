'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { personalInfo, socialLinks } from '@/lib/data';
import { useForm as useFormspree, ValidationError } from '@formspree/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiLoader, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { z } from 'zod';
import { IconRenderer } from '../ui/icon-renderer';

type ContactFormData = {
  name: string;
  email: string;
  website?: string;
  message: string;
};

export function Contact() {
  const t = useTranslations('contact');
  const [formspreeState, handleFormspreeSubmit] = useFormspree(
    process.env.NEXT_PUBLIC_FORMSPREE_ID!
  );

  // Create a dynamic schema with translated messages
  const createContactFormSchema = () =>
    z.object({
      name: z.string().min(2, { message: t('validation.nameMinLength') }),
      email: z.string().email(),
      website: z
        .string()
        .trim()
        .url({ message: t('validation.invalidUrl') })
        .optional()
        .or(z.literal('')),
      message: z
        .string()
        .min(10, { message: t('validation.messageMinLength') }),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactFormSchema()),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Create a form event-like object for Formspree
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('website', data.website || '');
    formData.append('message', data.message);

    // Submit to Formspree
    await handleFormspreeSubmit(formData);

    // Reset form if successful
    if (formspreeState.succeeded) {
      reset();
    }
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  useEffect(() => {
    if (formspreeState.succeeded) {
      reset();
    }
  }, [formspreeState.succeeded, reset]);

  return (
    <section id="contact" className="bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
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
          className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3">
                  <FiMail className="h-5 w-5 text-primary" />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="h-5 w-5 text-primary" />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMapPin className="h-5 w-5 text-primary" />
                  <span>{personalInfo.location}</span>
                </div>

                <div className="pt-6">
                  <h4 className="mb-4 font-semibold">{t('followMe')}</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map(link => (
                      <Button
                        key={link.name}
                        variant="outline"
                        size="icon"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={t(`social.${link.name.toLowerCase()}`)}
                        >
                          <IconRenderer
                            iconName={link.icon}
                            size={20}
                            className="transition-colors duration-200 group-hover:text-primary"
                          />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('sendMessage')}</CardTitle>
                <CardDescription>{t('getBackSoon')}</CardDescription>
              </CardHeader>
              <CardContent>
                {formspreeState.succeeded ? (
                  <div className="py-8 text-center">
                    <div className="mb-4">
                      <FiSend className="mx-auto h-12 w-12 text-green-500" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-green-600">
                      {t('messageSentTitle')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('messageSentDescription')}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Input
                        placeholder={t('name')}
                        {...register('name')}
                        name="name"
                        className={errors.name ? 'border-destructive' : ''}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="email"
                        placeholder={t('email')}
                        {...register('email')}
                        name="email"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.email.message}
                        </p>
                      )}
                      <ValidationError
                        prefix={t('Email')}
                        field="email"
                        errors={formspreeState.errors}
                        className="mt-1 text-sm text-destructive"
                      />
                    </div>

                    <div>
                      <Input
                        type="url"
                        placeholder={t('website')}
                        {...register('website')}
                        name="website"
                        className={errors.website ? 'border-destructive' : ''}
                      />
                      {errors.website && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.website.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        placeholder={t('message')}
                        rows={5}
                        {...register('message')}
                        name="message"
                        className={errors.message ? 'border-destructive' : ''}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-destructive">
                          {errors.message.message}
                        </p>
                      )}
                      <ValidationError
                        prefix={t('message')}
                        field="message"
                        errors={formspreeState.errors}
                        className="mt-1 text-sm text-destructive"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formspreeState.submitting}
                    >
                      {formspreeState.submitting ? (
                        <>
                          <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2 h-4 w-4" />
                          {t('send')}
                        </>
                      )}
                    </Button>

                    {formspreeState.errors && (
                      <div className="text-center text-sm text-destructive">
                        <p>{t('errorSending')}</p>
                      </div>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
