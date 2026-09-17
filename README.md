# We Flick Business Card — Landing

Landing page estática (HTML/CSS/JS) para la validación comercial de **We Flick Business Card**: tarjeta física NFC + QR conectada a un perfil digital editable.

## Estructura

```
index.html        Contenido y estructura de la landing
css/styles.css     Estilos (paleta de marca: violeta #7F35FC + blanco/negro)
js/main.js         Menú móvil, acordeón de FAQ, año dinámico en footer
```

## Pendiente antes de publicar

- **Imágenes/videos reales**: reemplazar los bloques placeholder marcados como `F01`–`F11` (ver detalle en el plan de validación) por las fotos y videos reales del producto.
- **Stripe**: reemplazar los enlaces `href="#"` con `data-cta="stripe-checkout"` por el Payment Link real.
- **WhatsApp**: reemplazar los enlaces `https://wa.me/000000000...` por el número real de WhatsApp Business.

## Cómo previsualizar en local

```bash
python3 -m http.server 4321
```

Abrir [http://localhost:4321](http://localhost:4321).
