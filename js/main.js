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
