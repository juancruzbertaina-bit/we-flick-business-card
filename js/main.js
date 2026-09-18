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

// Selector de color (sección "Una We Flick. Tres colores.")
const coloresSection = document.querySelector('[data-colores]');
if (coloresSection) {
  const variants = {
    negro:   { name: 'Negro',   desc: 'Sobria, minimal y profesional.',        src: 'assets/img/f06-negro.jpg',   alt: 'Tarjeta We Flick negra, frente y dorso' },
    violeta: { name: 'Violeta', desc: 'El color más reconocible de We Flick.', src: 'assets/img/f07-violeta.jpg', alt: 'Tarjeta We Flick violeta, frente y dorso' },
    blanco:  { name: 'Blanco',  desc: 'Limpia, luminosa y versátil.',          src: 'assets/img/f08-blanco.jpg',  alt: 'Tarjeta We Flick blanca, frente y dorso' }
  };
  const pills = Array.from(coloresSection.querySelectorAll('.colores__pill'));
  const image = coloresSection.querySelector('[data-colores-image]');
  const nameEl = coloresSection.querySelector('[data-colores-name]');
  const descEl = coloresSection.querySelector('[data-colores-desc]');
  const modifiers = ['colores--negro', 'colores--violeta', 'colores--blanco'];
  let selectedColor = coloresSection.querySelector('.colores__pill.is-selected')?.dataset.color || 'negro';

  const render = (color) => {
    const v = variants[color];
    if (!v) return;
    // Fondo reactivo
    modifiers.forEach((m) => coloresSection.classList.remove(m));
    coloresSection.classList.add(`colores--${color}`);
    // Texto
    nameEl.textContent = v.name;
    descEl.textContent = v.desc;
    // Imagen con transición suave
    if (image.getAttribute('src') !== v.src) {
      image.classList.add('is-swapping');
      window.setTimeout(() => {
        image.src = v.src;
        image.alt = v.alt;
        image.classList.remove('is-swapping');
      }, 200);
    }
    // Estado del selector
    pills.forEach((p) => {
      const on = p.dataset.color === color;
      p.classList.toggle('is-selected', on);
      p.setAttribute('aria-pressed', String(on));
    });
  };

  pills.forEach((p) => {
    p.addEventListener('click', () => {
      selectedColor = p.dataset.color;
      render(selectedColor);
    });
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

// Para quién — carrusel de perfiles + categorías clicables
const perfiles = document.querySelector('[data-perfiles]');
if (perfiles) {
  const track = perfiles.querySelector('[data-track]');
  const slides = Array.from(perfiles.querySelectorAll('.perfiles__slide'));
  const dots = Array.from(perfiles.querySelectorAll('.perfiles__dot'));
  const prevBtn = perfiles.querySelector('[data-prev]');
  const nextBtn = perfiles.querySelector('[data-next]');
  const pillButtons = Array.from(document.querySelectorAll('.tags__btn'));
  const total = slides.length;
  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 4000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sizing: track = N * 100%, each slide = 100/N %
  track.style.width = `${total * 100}%`;
  slides.forEach((slide) => { slide.style.width = `${100 / total}%`; });

  const updatePills = () => {
    const activeSlideNumber = String(current + 1);
    pillButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.slideTarget === activeSlideNumber);
    });
  };

  const goTo = (index) => {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * (100 / total)}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-selected', String(i === current));
    });
    updatePills();
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const stopAutoplay = () => {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  };
  const startAutoplay = () => {
    stopAutoplay();
    if (prefersReducedMotion) return;
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  };

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
  });
  pillButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.slideTarget, 10) - 1;
      if (!Number.isNaN(target)) { goTo(target); startAutoplay(); }
    });
  });

  perfiles.addEventListener('mouseenter', stopAutoplay);
  perfiles.addEventListener('mouseleave', startAutoplay);
  perfiles.addEventListener('focusin', stopAutoplay);
  perfiles.addEventListener('focusout', (e) => {
    if (!perfiles.contains(e.relatedTarget)) startAutoplay();
  });

  goTo(0);
  startAutoplay();
}

// WhatsApp flotante — expandir etiqueta al cargar y contraerla tras ~4s
const whatsappFloat = document.querySelector('[data-whatsapp-float]');
if (whatsappFloat) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Sin animación: mantener contraído por defecto (hover/focus sigue funcionando por CSS)
  } else {
    // Pequeño retardo para que se perciba la entrada suave
    window.setTimeout(() => {
      whatsappFloat.classList.add('is-expanded');
      window.setTimeout(() => {
        whatsappFloat.classList.remove('is-expanded');
      }, 4000);
    }, 600);
  }
}
