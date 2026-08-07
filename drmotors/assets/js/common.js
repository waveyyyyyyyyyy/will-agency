/* Funzioni condivise tra home e pagine annuncio: icone, illustrazione di riserva
   quando un veicolo non ha ancora foto reali (es. Peugeot 5008), nav/reveal comuni. */
(function (global) {
  "use strict";

  var fuelIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3v18M6 21V8a2 2 0 012-2h4M6 12h5M17 8l3 3v6a1.5 1.5 0 01-3 0v-2a1 1 0 00-1-1h-1"/></svg>';
  var gearIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5"/></svg>';
  var calIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
  var kmIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/></svg>';
  var leafIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21c9 0 14-5 14-14V5h-2C8 5 3 10 3 19v2z"/><path d="M5 21c4-8 8-11 14-14"/></svg>';
  var bodyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17V9l3-4h10l3 4v8M4 17h16M4 17a2 2 0 104 0M16 17a2 2 0 104 0"/></svg>';

  function specRowHTML(car) {
    var html = '' +
      '<div class="spec">' + calIcon + '<b class="tabular">' + car.year + '</b><small>Anno</small></div>' +
      '<div class="spec">' + kmIcon + '<b class="tabular">' + (car.km || '—') + '</b><small>Km</small></div>' +
      '<div class="spec">' + fuelIcon + '<b>' + (car.fuel || '—') + '</b><small>Alimentaz.</small></div>' +
      '<div class="spec">' + gearIcon + '<b>' + (car.gear || '—') + '</b><small>Cambio</small></div>';
    if (car.euro) {
      html += '<div class="spec">' + leafIcon + '<b>' + car.euro + '</b><small>Classe</small></div>';
    }
    html += '<div class="spec">' + bodyIcon + '<b>' + car.catLabel + '</b><small>Categoria</small></div>';
    return html;
  }

  var palettes = [ ['#123E8F','#4A8FE0'], ['#0B2148','#2E7BD6'], ['#1948A3','#8FC1F5'], ['#0B2148','#4A8FE0'] ];

  function placeholderSVG(cat, idx) {
    var pal = palettes[(idx || 0) % palettes.length];
    var c1 = pal[0], c2 = pal[1];
    if (cat === 'scooter') {
      return '<svg viewBox="0 0 184 118" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="92" cy="104" rx="70" ry="7" fill="#0B2148" opacity="0.08"/>' +
        '<circle cx="46" cy="90" r="17" fill="#1a2233"/><circle cx="46" cy="90" r="7" fill="#647089"/>' +
        '<circle cx="140" cy="90" r="17" fill="#1a2233"/><circle cx="140" cy="90" r="7" fill="#647089"/>' +
        '<path d="M46 90c0-11 9-21 23-23h28c15 0 22 9 29 20l14 5" stroke="' + c1 + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
        '<rect x="86" y="50" width="44" height="15" rx="7.5" fill="' + c2 + '"/>' +
        '<path d="M128 58l16-19" stroke="' + c1 + '" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M144 39l17-3M144 39l3 17" stroke="' + c1 + '" stroke-width="6" stroke-linecap="round"/>' +
        '<rect x="58" y="68" width="26" height="17" rx="4" fill="#EAF3FF" opacity="0.85"/>' +
        '</svg>';
    }
    var bodies = {
      suv: '<path d="M18 78c0-22 14-34 34-36l14-16h44l16 16c18 2 30 12 32 36" fill="' + c1 + '"/><rect x="14" y="72" width="152" height="26" rx="10" fill="' + c2 + '"/><circle cx="52" cy="100" r="16" fill="#1a2233"/><circle cx="132" cy="100" r="16" fill="#1a2233"/>',
      berlina: '<path d="M14 82c2-18 16-28 34-30l16-20h58l18 20c16 2 28 12 32 30" fill="' + c1 + '"/><rect x="10" y="78" width="160" height="20" rx="9" fill="' + c2 + '"/><circle cx="50" cy="100" r="15" fill="#1a2233"/><circle cx="134" cy="100" r="15" fill="#1a2233"/>',
      citycar: '<path d="M26 80c0-20 12-30 30-32l10-14h44l10 14c16 2 26 12 28 32" fill="' + c1 + '"/><rect x="20" y="76" width="140" height="20" rx="10" fill="' + c2 + '"/><circle cx="54" cy="98" r="15" fill="#1a2233"/><circle cx="130" cy="98" r="15" fill="#1a2233"/>',
      wagon: '<path d="M12 80c2-18 14-30 32-32l14-18h52l16 18c16 2 30 12 34 32" fill="' + c1 + '"/><rect x="8" y="76" width="166" height="20" rx="9" fill="' + c2 + '"/><circle cx="48" cy="98" r="15" fill="#1a2233"/><circle cx="138" cy="98" r="15" fill="#1a2233"/>',
      monovolume: '<path d="M16 80c0-28 12-42 30-44h56c18 2 30 16 32 44" fill="' + c1 + '"/><rect x="12" y="76" width="160" height="24" rx="10" fill="' + c2 + '"/><circle cx="50" cy="100" r="16" fill="#1a2233"/><circle cx="134" cy="100" r="16" fill="#1a2233"/>'
    };
    var winW = cat === 'suv' ? 116 : cat === 'citycar' ? 96 : cat === 'monovolume' ? 134 : 126;
    var winY = cat === 'monovolume' ? 42 : 50;
    var winH = cat === 'monovolume' ? 34 : 22;
    return '<svg viewBox="0 0 184 118" xmlns="http://www.w3.org/2000/svg">' +
      '<ellipse cx="92" cy="104" rx="80" ry="8" fill="#0B2148" opacity="0.08"/>' +
      (bodies[cat] || bodies.berlina) +
      '<rect x="34" y="' + winY + '" width="' + winW + '" height="' + winH + '" rx="9" fill="#EAF3FF" opacity="0.85"/>' +
      '</svg>';
  }

  function setupChrome() {
    var navEl = document.getElementById('siteNav');
    if (navEl) {
      window.addEventListener('scroll', function () { navEl.classList.toggle('scrolled', window.scrollY > 8); });
    }
    var burger = document.getElementById('burgerBtn');
    var navLinks = document.getElementById('navLinks');
    if (burger && navLinks) {
      burger.addEventListener('click', function () {
        var open = navLinks.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { navLinks.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); });
      });
    }
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealEls = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: .12 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  global.DRM = {
    specRowHTML: specRowHTML,
    placeholderSVG: placeholderSVG,
    setupChrome: setupChrome,
    icons: { fuel: fuelIcon, gear: gearIcon, cal: calIcon, km: kmIcon }
  };
})(window);
