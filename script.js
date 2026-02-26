// Initialize AOS and page behaviors
window.addEventListener("load", () => {
  if (window.AOS) {
    window.AOS.init({
      once: true,
      duration: 750,
      easing: "ease-out-cubic",
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const nav = document.getElementById("site-nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll(".site-nav .nav-link");
  const backToTop = document.getElementById("back-to-top");
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  // Mobile navigation toggle
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

  // Smooth scrolling for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const rect = target.getBoundingClientRect();
      const offset = rect.top + window.scrollY - headerHeight - 12;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      // Close mobile nav after selection
      if (nav && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
      }
    });
  });

  // Scroll-based header + nav link state + back-to-top button
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // Header shadow state
    if (header) {
      if (scrollY > 10) {
        header.classList.add("site-header--scrolled");
      } else {
        header.classList.remove("site-header--scrolled");
      }
    }

    // Back-to-top visibility
    if (backToTop) {
      if (scrollY > 260) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }

    // Active nav link
    let activeId = "";
    const headerHeight = header ? header.offsetHeight : 0;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY - headerHeight - 40;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        activeId = section.id;
      }
    });

    if (activeId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${activeId}`) {
          link.classList.add("is-active");
        } else {
          link.classList.remove("is-active");
        }
      });
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Back-to-top behavior
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});

