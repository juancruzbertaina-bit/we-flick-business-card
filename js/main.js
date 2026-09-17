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
const coloresStage = document.querySelector('.colores__stage');
if (coloresStage) {
  const cards = Array.from(coloresStage.querySelectorAll('.colores__card'));
  const swatches = Array.from(document.querySelectorAll('.colores__swatch'));
  let selectedColor = document.querySelector('.colores__swatch.is-selected')?.dataset.color || null;

  const render = (color) => {
    coloresStage.classList.toggle('has-active', Boolean(color));
    cards.forEach((card) => {
      card.classList.toggle('is-active', card.dataset.color === color);
    });
    swatches.forEach((swatch) => {
      const isSelected = swatch.dataset.color === selectedColor;
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

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => previewColor(card.dataset.color));
    card.addEventListener('mouseleave', resetPreview);
    card.addEventListener('click', () => selectColor(card.dataset.color));
  });

  render(selectedColor);
}
