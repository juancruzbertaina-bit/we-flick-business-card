// Menú móvil
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ acordeón
document.querySelectorAll('.faq__item').forEach((item) => {
  const question = item.querySelector('.faq__question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    document.querySelectorAll('.faq__item.is-open').forEach((openItem) => {
      openItem.classList.remove('is-open');
    });
    if (!isOpen) item.classList.add('is-open');
  });
});

// Año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Selector de color interactivo (sección "Elige tu color")
// El carrusel se controla únicamente desde los círculos de color:
// la tarjeta del color elegido siempre queda al centro, y las otras
// dos giran a los costados manteniendo el orden circular del selector.
const coloresStage = document.querySelector('.colores__stage');
if (coloresStage) {
  // Orden circular del carrusel (no es el orden visual del selector):
  // define quién queda a la izquierda/derecha de cada color centrado.
  // Con "negro" centrado, "violeta" cae a la izquierda y "blanco" a la derecha.
  const order = ['violeta', 'negro', 'blanco'];
  const cardsByColor = {};
  order.forEach((color) => {
    cardsByColor[color] = coloresStage.querySelector(`.colores__card--${color}`);
  });
  const swatches = Array.from(document.querySelectorAll('.colores__swatch'));
  let selectedColor = document.querySelector('.colores__swatch.is-selected')?.dataset.color || 'negro';

  const render = (color) => {
    const centerIndex = order.indexOf(color);
    const leftIndex = (centerIndex - 1 + order.length) % order.length;
    const rightIndex = (centerIndex + 1) % order.length;

    order.forEach((c, i) => {
      const card = cardsByColor[c];
      if (!card) return;
      card.classList.remove('colores__card--pos-center', 'colores__card--pos-left', 'colores__card--pos-right');
      if (i === centerIndex) card.classList.add('colores__card--pos-center');
      else if (i === leftIndex) card.classList.add('colores__card--pos-left');
      else if (i === rightIndex) card.classList.add('colores__card--pos-right');
    });

    swatches.forEach((swatch) => {
      const isSelected = swatch.dataset.color === color;
      swatch.classList.toggle('is-selected', isSelected);
      swatch.setAttribute('aria-pressed', String(isSelected));
    });
  };

  const selectColor = (color) => {
    selectedColor = color;
    render(color);
  };

  const previewColor = (color) => render(color);
  const resetPreview = () => render(selectedColor);

  swatches.forEach((swatch) => {
    swatch.addEventListener('mouseenter', () => previewColor(swatch.dataset.color));
    swatch.addEventListener('mouseleave', resetPreview);
    swatch.addEventListener('focus', () => previewColor(swatch.dataset.color));
    swatch.addEventListener('blur', resetPreview);
    swatch.addEventListener('click', () => selectColor(swatch.dataset.color));
  });

  render(selectedColor);
}

// Cómo funciona — microinteracciones al entrar en viewport
const comoFunciona = document.querySelector('.como-funciona');
if (comoFunciona && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const header = comoFunciona.querySelector('.como-funciona__header');
  const pasosWrap = comoFunciona.querySelector('.pasos-wrap');
  const pasos = Array.from(comoFunciona.querySelectorAll('.paso'));
  const cards = Array.from(comoFunciona.querySelectorAll('.media-card'));

  const revealEls = [header, ...pasos, ...cards].filter(Boolean);
  revealEls.forEach((el) => el.classList.add('reveal'));
  pasos.forEach((el, i) => { el.style.transitionDelay = `${i * 90}ms`; });
  cards.forEach((el, i) => { el.style.transitionDelay = `${i * 100}ms`; });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealEls.forEach((el) => observer.observe(el));
    if (pasosWrap) observer.observe(pasosWrap);
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    if (pasosWrap) pasosWrap.classList.add('is-visible');
  }
}
