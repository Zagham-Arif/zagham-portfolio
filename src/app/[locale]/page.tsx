import LottieAnimation from 'components/LottieAnimation';
import { Navigation } from 'components/Navigation';
import { ScrollToTopButton } from 'components/ScrollToTopButton';
import { setRequestLocale } from 'next-intl/server';
import { Contact } from 'sections/Contact';
import { Experience } from 'sections/Experience';
import { Footer } from 'sections/Footer';
import { Hero } from 'sections/Hero';
import { Projects } from 'sections/Projects';
import { Skills } from 'sections/Skills';

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <LottieAnimation />
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
