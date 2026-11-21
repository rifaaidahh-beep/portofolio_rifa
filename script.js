const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.querySelector(".back-to-top");

document.querySelectorAll(".project-detail-trigger").forEach((trigger) => {
  const dialog = document.querySelector(`#${trigger.getAttribute("aria-controls")}`);
  const closeButton = dialog.querySelector(".project-detail-close");

  trigger.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const link = event.target.closest('a[href^="#"]');
  if (!(link instanceof HTMLAnchorElement)) return;

  const target = document.querySelector(link.hash);
  if (!target) return;

  event.preventDefault();
  menuToggle.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("is-open");
  history.pushState(null, "", link.hash);
  target.scrollIntoView({
    behavior: "instant",
    block: "start",
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const updateBackToTopVisibility = () => {
  backToTop.hidden = window.scrollY < 400;
};

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
updateBackToTopVisibility();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
});
