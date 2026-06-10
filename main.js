(function () {
  'use strict';

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  const saved = localStorage.getItem('theme');
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    setTheme('light');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // --- Mobile Menu ---
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // --- Scroll Hints (inject into every section except the last) ---
  const sectionOrder = ['hero', 'about', 'experience', 'skills', 'portfolio', 'hobbies', 'contact'];
  const chevronSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg>';

  sectionOrder.forEach((id, i) => {
    if (i >= sectionOrder.length - 1) return;
    const section = document.getElementById(id);
    if (!section || id === 'hero') return;
    const nextId = sectionOrder[i + 1];
    const hint = document.createElement('a');
    hint.href = '#' + nextId;
    hint.className = 'scroll-hint';
    hint.setAttribute('aria-label', 'Scroll to next section');
    hint.innerHTML = chevronSvg;
    const container = section.querySelector('.container');
    if (container) {
      container.appendChild(hint);
    }
  });

  // --- Scroll Reveal ---
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));

  // --- Active Nav Link ---
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--accent)'
        : '';
    });
  }

  // --- Back to Top ---
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Nav Border on Scroll ---
  const nav = document.getElementById('nav');

  function onScroll() {
    updateActiveLink();
    updateBackToTop();
    nav.style.borderBottomColor = window.scrollY > 50
      ? 'var(--border-strong)'
      : 'var(--border)';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
