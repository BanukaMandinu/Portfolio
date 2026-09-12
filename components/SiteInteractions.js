'use client';

import { useEffect } from 'react';

const EMAIL = 'banukananayak@gmail.com';

export default function SiteInteractions() {
  useEffect(() => {
    document.documentElement.classList.add('js');

    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const revealElements = document.querySelectorAll('.reveal');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function handleNavbarScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

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

    function openMobileMenu() {
      navToggle.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('open');
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      const firstLink = navLinks.querySelector('.nav-link');
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
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    navToggle.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);

    const phosphorToggle = document.getElementById('phosphor-toggle');
    function handlePhosphorToggleClick() {
      const isGreen = document.documentElement.getAttribute('data-phosphor') === 'green';
      const next = isGreen ? 'white' : 'green';
      if (next === 'green') {
        document.documentElement.setAttribute('data-phosphor', 'green');
      } else {
        document.documentElement.removeAttribute('data-phosphor');
      }
      try {
        localStorage.setItem('phosphor', next);
      } catch (e) {
        /* private browsing / storage disabled — phosphor color still applies for this load */
      }
    }
    if (phosphorToggle) {
      phosphorToggle.addEventListener('click', handlePhosphorToggleClick);
    }

    function handleDocumentKeydown(e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    }
    document.addEventListener('keydown', handleDocumentKeydown);

    function handleNavLinksKeydown(e) {
      if (e.key !== 'Tab') return;
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;

      const focusable = navLinks.querySelectorAll('.nav-link');
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
    navLinks.addEventListener('keydown', handleNavLinksKeydown);

    function handleNavLinkClick(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }

      if (navToggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
      }
    }
    navLinkItems.forEach(function (link) {
      link.addEventListener('click', handleNavLinkClick);
    });

    let revealObserver;
    if (!prefersReducedMotion) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }

    const heroScrollIndicator = document.getElementById('hero-scroll-indicator');

    function handleHeroScrollIndicator() {
      if (!heroScrollIndicator) return;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      if (currentScroll > 40) {
        heroScrollIndicator.classList.add('hidden');
      } else {
        heroScrollIndicator.classList.remove('hidden');
      }
    }

    function handleHeroScrollIndicatorClick(e) {
      e.preventDefault();
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
    if (heroScrollIndicator) {
      heroScrollIndicator.addEventListener('click', handleHeroScrollIndicatorClick);
    }

    const contactEmailBtn = document.getElementById('contact-email');
    function handleContactEmailClick() {
      window.location.href = `mailto:${EMAIL}`;
    }
    if (contactEmailBtn) {
      contactEmailBtn.addEventListener('click', handleContactEmailClick);
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    const copyEmailStatus = document.getElementById('copy-email-status');
    const copyEmailTooltip = copyEmailBtn ? copyEmailBtn.querySelector('.copy-email-tooltip') : null;
    let copyResetTimer = null;

    function handleCopyEmailClick() {
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
        navigator.clipboard.writeText(EMAIL).then(showCopied, function () {
          /* clipboard permission denied — mailto link next to it is still the primary path */
        });
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = EMAIL;
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
    }
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', handleCopyEmailClick);
    }

    function handleBackToTopVisibility() {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    function handleBackToTopClick() {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    backToTop.addEventListener('click', handleBackToTopClick);

    let ticking = false;
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

    handleNavbarScroll();
    updateActiveNavLink();
    handleBackToTopVisibility();
    handleHeroScrollIndicator();

    return function cleanup() {
      navToggle.removeEventListener('click', toggleMobileMenu);
      navOverlay.removeEventListener('click', closeMobileMenu);
      if (phosphorToggle) {
        phosphorToggle.removeEventListener('click', handlePhosphorToggleClick);
      }
      document.removeEventListener('keydown', handleDocumentKeydown);
      navLinks.removeEventListener('keydown', handleNavLinksKeydown);
      navLinkItems.forEach(function (link) {
        link.removeEventListener('click', handleNavLinkClick);
      });
      if (revealObserver) revealObserver.disconnect();
      if (heroScrollIndicator) {
        heroScrollIndicator.removeEventListener('click', handleHeroScrollIndicatorClick);
      }
      if (contactEmailBtn) {
        contactEmailBtn.removeEventListener('click', handleContactEmailClick);
      }
      if (copyEmailBtn) {
        copyEmailBtn.removeEventListener('click', handleCopyEmailClick);
      }
      clearTimeout(copyResetTimer);
      backToTop.removeEventListener('click', handleBackToTopClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
