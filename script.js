/* ============================================================
   PORTFOLIO — Script
   Lightweight vanilla JS for interactivity & accessibility
   ============================================================ */

(function () {
  'use strict';

  // Content is visible by default in CSS (see .reveal in styles.css) so the
  // page still works with JS disabled/blocked. This class opts back into the
  // hide-then-reveal scroll animation once we know JS actually ran.
  document.documentElement.classList.add('js');

  // ---- DOM References ----
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinkItems = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section[id]');
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');

  // ---- Check for reduced motion preference ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== NAVBAR SCROLL STATE =====
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  function updateActiveNavLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinkItems.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===== MOBILE MENU =====
  function openMobileMenu() {
    navToggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap: focus the first nav link
    var firstLink = navLinks.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }

  function closeMobileMenu() {
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  function toggleMobileMenu() {
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  navToggle.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', closeMobileMenu);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeMobileMenu();
    }
  });

  // Focus trap within mobile menu
  navLinks.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;

    var focusable = navLinks.querySelectorAll('.nav-link');
    var firstFocusable = focusable[0];
    var lastFocusable = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  });

  // ===== NAV LINK CLICK — Smooth Scroll & Close Menu =====
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href').substring(1);
      var targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }

      // Close mobile menu if open
      if (navToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  if (!prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Immediately show everything for reduced motion
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }



  // ===== HERO SCROLL INDICATOR =====
  var heroScrollIndicator = document.getElementById('hero-scroll-indicator');

  function handleHeroScrollIndicator() {
    if (!heroScrollIndicator) return;
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (currentScroll > 40) {
      heroScrollIndicator.classList.add('hidden');
    } else {
      heroScrollIndicator.classList.remove('hidden');
    }
  }

  if (heroScrollIndicator) {
    heroScrollIndicator.addEventListener('click', function (e) {
      e.preventDefault();
      var aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  }

  // ===== CONTACT EMAIL HANDLER =====
  var contactEmailBtn = document.getElementById('contact-email');
  if (contactEmailBtn) {
    contactEmailBtn.addEventListener('click', function (e) {
      window.location.href = 'mailto:banukananayak@gmail.com';
    });
  }

  // ===== COPY EMAIL FALLBACK =====
  // mailto: does nothing visible on a machine with no default mail client
  // configured (common on locked-down work hardware) — this gives visitors
  // a working alternative instead of a dead-looking click (PORT-09).
  var copyEmailBtn = document.getElementById('copy-email-btn');
  var copyEmailStatus = document.getElementById('copy-email-status');
  var copyEmailTooltip = copyEmailBtn ? copyEmailBtn.querySelector('.copy-email-tooltip') : null;
  var copyResetTimer = null;

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      var email = 'banukananayak@gmail.com';

      function showCopied() {
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.setAttribute('aria-label', 'Email address copied');
        if (copyEmailTooltip) copyEmailTooltip.textContent = 'Copied!';
        if (copyEmailStatus) copyEmailStatus.textContent = 'Email address copied to clipboard';

        clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(function () {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.setAttribute('aria-label', 'Copy email address to clipboard');
          if (copyEmailTooltip) copyEmailTooltip.textContent = 'Copy email';
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied, function () {
          /* clipboard permission denied — mailto link next to it is still the primary path */
        });
      } else {
        var tempInput = document.createElement('textarea');
        tempInput.value = email;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          showCopied();
        } catch (err) {
          /* copy failed silently — mailto link next to it is still the primary path */
        }
        document.body.removeChild(tempInput);
      }
    });
  }

  // ===== BACK TO TOP =====
  function handleBackToTopVisibility() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });

  // ===== SCROLL EVENT HANDLER (Throttled) =====
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        handleNavbarScroll();
        updateActiveNavLink();
        handleBackToTopVisibility();
        handleHeroScrollIndicator();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===== INITIAL STATE =====
  handleNavbarScroll();
  updateActiveNavLink();
  handleBackToTopVisibility();
  handleHeroScrollIndicator();

})();
