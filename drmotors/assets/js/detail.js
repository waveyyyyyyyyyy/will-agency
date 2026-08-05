/* Logica della pagina annuncio singolo (drmotors/auto/<slug>.html).
   Richiede che la pagina definisca `var SLUG = '...';` prima di includere questo file. */
(function () {
  "use strict";
  DRM.setupChrome();

  var BASE = '../'; // le pagine annuncio stanno in drmotors/auto/, i path in CARS sono relativi a drmotors/
  var car = CARS.find(function (c) { return c.slug === SLUG; });
  if (!car) { return; }

  var hasPhotos = car.images && car.images.length > 0;
  var carIdx = CARS.indexOf(car);

  document.title = car.name + ' — DR Motors';
  document.getElementById('bcName').textContent = car.name;
  document.getElementById('listingKicker').textContent = car.catLabel + ' · ' + car.year;
  document.getElementById('listingTitle').textContent = car.name;
  document.getElementById('listingSpecs').innerHTML = DRM.specRowHTML(car);
  document.getElementById('listingDesc').textContent = car.desc;

  var priceEl = document.getElementById('listingPrice');
  if (car.price) {
    priceEl.innerHTML = '€ ' + car.price;
  } else {
    priceEl.classList.add('request');
    priceEl.textContent = 'Prezzo su richiesta';
  }

  /* ---- galleria ---- */
  var mainStage = document.getElementById('galleryMain');
  var thumbsWrap = document.getElementById('galleryThumbs');
  var current = 0;

  function renderMain() {
    if (!hasPhotos) {
      mainStage.innerHTML = '<div class="placeholder">' + DRM.placeholderSVG(car.cat, carIdx) + '</div>';
      return;
    }
    mainStage.innerHTML =
      '<img src="' + BASE + car.images[current] + '" alt="' + car.name + ' — foto ' + (current + 1) + '">' +
      (car.images.length > 1 ? '<button class="gallery-nav prev" aria-label="Foto precedente">‹</button><button class="gallery-nav next" aria-label="Foto successiva">›</button><span class="gallery-count">' + (current + 1) + ' / ' + car.images.length + '</span>' : '');
    if (car.images.length > 1) {
      mainStage.querySelector('.prev').addEventListener('click', function () { go(current - 1); });
      mainStage.querySelector('.next').addEventListener('click', function () { go(current + 1); });
    }
    thumbsWrap.querySelectorAll('img').forEach(function (t, i) { t.classList.toggle('active', i === current); });
  }
  function go(i) {
    current = (i + car.images.length) % car.images.length;
    renderMain();
  }
  if (hasPhotos) {
    thumbsWrap.innerHTML = car.images.map(function (src, i) {
      return '<img src="' + BASE + src + '" alt="' + car.name + ' miniatura ' + (i + 1) + '" data-i="' + i + '">';
    }).join('');
    thumbsWrap.querySelectorAll('img').forEach(function (t) {
      t.addEventListener('click', function () { go(parseInt(t.getAttribute('data-i'), 10)); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(current - 1);
      if (e.key === 'ArrowRight') go(current + 1);
    });
  } else {
    thumbsWrap.style.display = 'none';
  }
  renderMain();

  /* ---- CTA contatti pre-compilati con il nome dell'auto ---- */
  var waMsg = encodeURIComponent('Ciao! Sono interessato/a a: ' + car.name + '. È ancora disponibile?');
  document.getElementById('ctaWhatsapp').href = 'https://wa.me/393475237486?text=' + waMsg;
  document.getElementById('ctaCall').href = 'tel:+390883888658';
  document.getElementById('ctaEmail').href = 'mailto:drmotors@virgilio.it?subject=' + encodeURIComponent('Richiesta info: ' + car.name);

  /* ---- altre auto in salone ---- */
  var similar = CARS.filter(function (c) { return c.slug !== car.slug; });
  // prima le auto della stessa categoria, poi le altre
  similar.sort(function (a, b) {
    return (a.cat === car.cat ? 0 : 1) - (b.cat === car.cat ? 0 : 1);
  });
  similar = similar.slice(0, 6);
  var track = document.getElementById('similarTrack');
  similar.forEach(function (c, i) {
    var a = document.createElement('a');
    a.className = 'similar-card';
    a.href = c.slug + '.html';
    var thumb = (c.images && c.images.length)
      ? '<img src="' + BASE + c.images[0] + '" alt="' + c.name + '">'
      : '<div class="placeholder">' + DRM.placeholderSVG(c.cat, CARS.indexOf(c)) + '</div>';
    a.innerHTML =
      '<div class="thumb">' + thumb + '</div>' +
      '<div class="info"><b>' + c.name + '</b><span>' + (c.price ? '€ ' + c.price : 'Prezzo su richiesta') + '</span></div>';
    track.appendChild(a);
  });
})();
