export const scrollToSection = (href) => {
  const section = document.querySelector(href);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
