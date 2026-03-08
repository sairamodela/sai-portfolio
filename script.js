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
  const themeToggle = document.getElementById("theme-toggle");

  // Theme toggle logic
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    
    // Set initial icon based on data-theme
    if (document.documentElement.getAttribute("data-theme") === "light") {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      if (currentTheme === "light") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    });
  }

  // Mark icon elements as decorative for screen readers
  document.querySelectorAll("i").forEach((icon) => {
    if (!icon.hasAttribute("aria-hidden")) {
      icon.setAttribute("aria-hidden", "true");
    }
  });

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
  let isScrolling = false;
  
  const handleScroll = () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
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

        // Ensure the last section is highlighted when scrolling reaches the bottom
        if (window.innerHeight + Math.round(scrollY) >= document.body.offsetHeight - 10) {
          if (sections.length > 0) {
            activeId = sections[sections.length - 1].id;
          }
        }

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
        
        isScrolling = false;
      });
      isScrolling = true;
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

  // Resume link loading indicator
  const resumeLink = document.getElementById("resume-link");
  if (resumeLink) {
    const originalText = resumeLink.innerHTML;

    resumeLink.addEventListener("click", (e) => {
      // Allow middle-click / ctrl/cmd/shift/alt modified clicks to open in new tab/window
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      // We do not use e.preventDefault() so that the browser handles opening the tab natively (respecting target="_blank")
      // This helps avoid popup blockers while still allowing us to show the loading indicator in the original tab.

      if (resumeLink.classList.contains("btn-loading")) return;

      resumeLink.classList.add("btn-loading");
      resumeLink.innerHTML = 'Opening <i class="fas fa-spinner fa-spin spinner"></i>';

      // Restore button state after a delay (if the user returns to this tab)
      setTimeout(() => {
        resumeLink.innerHTML = originalText;
        resumeLink.classList.remove("btn-loading");
      }, 2000);
    });

    // Reset button state if the page is loaded from bfcache (when user clicks Back button from same tab)
    window.addEventListener("pageshow", (e) => {
      if (e.persisted || (window.performance && window.performance.navigation && window.performance.navigation.type === 2)) {
        resumeLink.innerHTML = originalText;
        resumeLink.classList.remove("btn-loading");
      }
    });
  }

  // Live clock display (India Standard Time)
  const liveTimeEl = document.getElementById("live-time");
  if (liveTimeEl) {
    const updateTime = () => {
      const now = new Date();
      // Format specifically to Asia/Kolkata (IST)
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      liveTimeEl.innerHTML = `${timeString} IST`;
    };
    updateTime();
    // Update every minute (no need for seconds anymore)
    setInterval(updateTime, 10000);
  }
});

