// Sudivino — interazioni minime: fade-in allo scroll + stato topbar.
// Niente parallasse, niente librerie esterne.

document.getElementById("year").textContent = new Date().getFullYear();

const topbar = document.getElementById("topbar");
if (topbar) {
  const onScroll = () => {
    topbar.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
if (navToggle && navPanel) {
  const closeNav = () => {
    navPanel.classList.remove("is-open");
    navPanel.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
  };
  const toggleNav = () => {
    const willOpen = !navPanel.classList.contains("is-open");
    navPanel.classList.toggle("is-open", willOpen);
    navPanel.setAttribute("aria-hidden", String(!willOpen));
    navToggle.setAttribute("aria-expanded", String(willOpen));
  };
  navToggle.addEventListener("click", toggleNav);
  navPanel.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const lightbox = document.getElementById("lightbox");
const lightboxTriggers = document.querySelectorAll("[data-lightbox]");
if (lightbox && lightboxTriggers.length) {
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");
  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openLightbox(trigger.dataset.lightbox, trigger.dataset.lightboxAlt);
    });
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

// Sentinella per il team: elementi ancora da collegare a dati reali del cliente
// (Instagram, link recensioni Google, P.IVA). Non blocca nulla, è solo un promemoria
// in console durante lo sviluppo locale.
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
  const todos = document.querySelectorAll("[data-todo]");
  if (todos.length) {
    console.warn(
      `Sudivino site: ${todos.length} placeholder da completare col cliente prima del deploy →`,
      [...todos].map((el) => el.dataset.todo),
    );
  }
}
