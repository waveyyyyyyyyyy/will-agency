/* Logica della home: catalogo (con link a pagina annuncio dedicata, niente
   carosello nelle card), vetrina in hero, FAQ, form contatti. */
(function () {
  "use strict";
  DRM.setupChrome();

  var BASE = ''; // index.html è nella cartella drmotors/, i path in CARS sono già relativi a lì

  function detailUrl(car) { return 'auto/' + car.slug + '.html'; }

  /* ---- catalogo ---- */
  var grid = document.getElementById('carGrid');
  if (grid) {
    CARS.forEach(function (car, idx) {
      var hasPhoto = car.images && car.images.length > 0;
      var mediaHTML = hasPhoto
        ? '<img src="' + BASE + car.images[0] + '" alt="' + car.name + '" loading="lazy">'
        : '<div class="placeholder">' + DRM.placeholderSVG(car.cat, idx) + '</div>';
      var priceHTML = car.price
        ? '<span class="car-price-tag tabular">€ ' + car.price + '</span>'
        : '<span class="car-price-tag request">Prezzo su richiesta</span>';

      var card = document.createElement('article');
      card.className = 'car-card';
      card.setAttribute('data-cat', car.cat);
      card.setAttribute('data-brand', car.brand || '');
      card.innerHTML =
        '<a class="car-media" href="' + detailUrl(car) + '">' +
          (hasPhoto ? '' : '<span class="car-badge">Foto in arrivo</span>') +
          mediaHTML +
          priceHTML +
        '</a>' +
        '<div class="car-body">' +
          '<span class="kicker">' + car.catLabel + '</span>' +
          '<h3><a href="' + detailUrl(car) + '" style="text-decoration:none;color:inherit;">' + car.name + '</a></h3>' +
          '<p class="desc">' + car.desc + '</p>' +
          '<div class="spec-row">' + DRM.specRowHTML(car) + '</div>' +
          '<div class="car-foot"><a href="' + detailUrl(car) + '" class="btn btn-primary btn-block">Vedi Dettagli</a></div>' +
        '</div>';
      grid.appendChild(card);
    });

    /* ---- filtro marca (elenco fisso, indipendente dallo stock attuale) ---- */
    var BRANDS = ['Alfa Romeo','Audi','BMW','Citroën','Cupra','Dacia','Fiat','Ford','Kia','Lancia','Mercedes','Nissan','Opel','Peugeot','Piaggio','Renault','Seat','Skoda','Suzuki','Toyota','Volkswagen','Volvo'];
    var brandSelect = document.getElementById('brandFilter');
    BRANDS.forEach(function (b) {
      var opt = document.createElement('option');
      opt.value = b; opt.textContent = b;
      brandSelect.appendChild(opt);
    });

    function applyFilters() {
      var cat = document.querySelector('.chip.active').getAttribute('data-filter');
      var brand = brandSelect.value;
      document.querySelectorAll('.car-card').forEach(function (card) {
        var matchCat = cat === 'tutte' || card.getAttribute('data-cat') === cat;
        var matchBrand = brand === 'tutte' || card.getAttribute('data-brand') === brand;
        card.hidden = !(matchCat && matchBrand);
      });
    }

    document.getElementById('filterBar').addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
    brandSelect.addEventListener('change', applyFilters);
  }

  /* ---- count-up statistiche hero ---- */
  var counted = false;
  function countUp() {
    if (counted) return; counted = true;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (reduceMotion) { el.textContent = target; return; }
      var start = null, dur = 1100;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statStrip = document.querySelector('.stat-strip');
  if (statStrip) {
    if ('IntersectionObserver' in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { countUp(); io2.disconnect(); } });
      }, { threshold: .4 });
      io2.observe(statStrip);
    } else { countUp(); }
  }

  /* ---- vetrina in hero (ruota tra alcune auto, una foto alla volta) ---- */
  var scStage = document.getElementById('showcaseStage');
  if (scStage) {
    var showcaseCars = CARS.filter(function (c) { return c.images && c.images.length; }).slice(0, 5);
    var scIndex = 0;
    var scDots = document.getElementById('showcaseDots');
    scDots.innerHTML = showcaseCars.map(function (_, i) { return '<span class="' + (i === 0 ? 'active' : '') + '"></span>'; }).join('');
    function renderShowcase() {
      var car = showcaseCars[scIndex];
      scStage.innerHTML = '<img src="' + BASE + car.images[0] + '" alt="' + car.name + '">';
      document.getElementById('showcaseName').textContent = car.name;
      document.getElementById('showcasePrice').textContent = car.price ? ('€ ' + car.price) : 'Prezzo su richiesta';
      scDots.querySelectorAll('span').forEach(function (d, i) { d.classList.toggle('active', i === scIndex); });
    }
    if (showcaseCars.length) {
      renderShowcase();
      setInterval(function () { scIndex = (scIndex + 1) % showcaseCars.length; renderShowcase(); }, 3800);
    }
  }

  /* ---- faq ---- */
  var faqs = [
    { q: 'Posso richiedere un finanziamento?', a: 'Sì, in salone lavoriamo con più istituti finanziari e possiamo darti una risposta indicativa già durante la visita.' },
    { q: 'Ritirate la mia auto usata in permuta?', a: 'Certo, valutiamo la tua vettura attuale e la scontiamo direttamente dal prezzo della nuova.' },
    { q: 'Le auto hanno garanzia?', a: 'Tutte le vetture in vendita sono coperte da garanzia secondo la normativa vigente sull\'usato garantito.' },
    { q: 'Posso prenotare un giro di prova?', a: 'Sì, contattaci per telefono, email o Instagram e fissiamo insieme data e orario per il test drive.' }
  ];
  var faqList = document.getElementById('faqList');
  if (faqList) {
    faqs.forEach(function (f) {
      var item = document.createElement('div');
      item.className = 'faq-item';
      item.innerHTML = '<button class="faq-q"><span>' + f.q + '</span><span class="plus"></span></button><div class="faq-a"><p>' + f.a + '</p></div>';
      item.querySelector('.faq-q').addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
      faqList.appendChild(item);
    });
  }

  /* ---- form contatti (demo) ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    var sel = document.getElementById('f-car');
    CARS.forEach(function (car) {
      var opt = document.createElement('option');
      opt.textContent = car.name; opt.value = car.name;
      sel.appendChild(opt);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var toast = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = 'Richiesta inviata! (demo — collegare a un indirizzo reale)';
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 3200);
      e.target.reset();
    });
  }
})();
