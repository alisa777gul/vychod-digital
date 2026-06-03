export const scrollToSection = (href) => {
  const section = document.querySelector(href);

  if (!section) return;

  const header = document.querySelector("header");
  const headerHeight = header?.offsetHeight || 0;

  const sectionTop = section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: sectionTop - headerHeight - 18,
    behavior: "smooth",
  });
};
