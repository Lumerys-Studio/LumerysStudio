/* =========================================================================
   Lumerys Studio — Animations spectaculaires (magic.js)
   - Révélation des sections/cartes au scroll (cascade + délais)
   - Gestion des attributs data-anim
   ========================================================================= */
(function () {
  'use strict';

  var SELECTORS = [
    '.hero',
    '.section-head',
    '.intro-grid > div',
    '.benefit-cards article',
    '.comparison-card',
    '.plan-grid article',
    '.process-grid > div',
    '.faq-grid > div',
    '.devis-card',
    '.devis-form-card',
    '.commande-cta',
    '.site-footer'
  ].join(',');

  function prefersReduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function setup() {
    var nodes = [].slice.call(document.querySelectorAll(SELECTORS));
    if (!nodes.length) return;

    // Application de la classe de révélation avec délai en cascade.
    nodes.forEach(function (el, idx) {
      if (el.classList.contains('lum-reveal')) return;
      el.classList.add('lum-reveal');
      var delay = (idx % 5) * 90;
      el.style.setProperty('--d', delay + 'ms');
    });

    // Si l'utilisateur préfère réduire les animations : tout visible immédiatement.
    if (prefersReduced()) {
      nodes.forEach(function (el) { el.classList.add('lum-in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('lum-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    nodes.forEach(function (el) { observer.observe(el); });
  }

  function init() {
    setup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();