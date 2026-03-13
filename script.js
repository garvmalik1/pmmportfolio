/* ============================================================
   PORTFOLIO — script.js
   Handles:
   1. Nav scroll shadow
   2. Mobile hamburger menu
   3. Close mobile menu on nav link click
   4. Scroll reveal animations (Intersection Observer)
   ============================================================ */

(function () {
  'use strict';

  // ── 1. NAV SCROLL SHADOW ──────────────────────────────────
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load in case page is already scrolled


  // ── 2. MOBILE HAMBURGER MENU ──────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    // Prevent body scroll when menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('open');
    toggleMenu(!isOpen);
  });


  // ── 3. CLOSE MOBILE MENU ON LINK CLICK ───────────────────
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(false);
    });
  });

  // Also close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(false);
    }
  });


  // ── 4. SCROLL REVEAL ──────────────────────────────────────
  // All elements with class .reveal animate in as they enter the viewport.
  // Add the class .reveal to any element in HTML to opt it in.

  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once revealed (animation plays once)
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,      // trigger when 10% of element is visible
        rootMargin: '0px 0px -40px 0px', // slight offset from bottom
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback: just show everything immediately in older browsers
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
