export const useScrollTo = () => {
  const scrollTo = (
    target: string | number,
    behavior: ScrollBehavior = 'smooth'
  ) => {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior });
      return;
    }

    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior });
    }
  };

  const scrollToTop = () => scrollTo(0);
  const scrollToNextSection = () => {
    const nextSection = document.querySelector(
      '#about, #projects, #experience, #skills, #contact'
    );
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollTo, scrollToTop, scrollToNextSection };
};
