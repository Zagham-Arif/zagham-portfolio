import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <main
      id="main"
      className="relative z-[1] grid min-h-screen place-items-center p-8 text-center"
    >
      <div>
        <p className="display text-brand text-7xl">404</p>
        <h1 className="display mt-2 text-3xl">{t('title')}</h1>
        <p className="text-muted-ink mx-auto mt-3 max-w-md">
          {t('description')}
        </p>
        <Link href={`/${locale}`} className="btn btn--primary mt-7">
          {t('backToHome')}
        </Link>
      </div>
    </main>
  );
}
