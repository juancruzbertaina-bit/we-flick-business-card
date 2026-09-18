# We Flick Business Card — Configuración legal

**Última revisión:** Septiembre de 2026

Documento interno. No enlazado desde la web pública ni desde el sitemap. Su función es servir de fuente única de verdad para la configuración legal del proyecto y facilitar revisiones futuras.

---

## Titular

| Campo | Valor |
| --- | --- |
| Titular | Juan Cruz Bertaina |
| Forma jurídica | Trabajador autónomo |
| NIF/NIE | Y9897128N |
| Domicilio | Florida Blanca 33, 08015 Barcelona, Barcelona, España |
| Email | administracion@weflick.es |
| Teléfono / WhatsApp | +34 695 287 032 |
| Marca comercial | We Flick |
| Registro Mercantil | No aplica |

---

## Comercial

| Campo | Valor |
| --- | --- |
| Territorio de venta | España |
| Entrega | 2–6 días laborables desde la compra |
| Precio Business Card estándar | 19,90 € (IVA incluido) |

Precio incluye:
- Envío
- IVA
- Business Card (NFC + QR)
- 12 meses de acceso al perfil digital

Renovación:
- Manual
- No existe renovación automática
- Al finalizar los 12 meses, We Flick puede enviar un enlace de pago para contratar un nuevo periodo

Business Card Custom:
- Condiciones acordadas por WhatsApp
- Configuración personalizada (logo, nombre, colores)
- Precio confirmado antes del pago
- Pago mediante enlace
- Tratamiento específico del desistimiento para productos personalizados

Desistimiento estándar:
- 14 días naturales desde la recepción (cuando corresponda)
- Coste directo de devolución por desistimiento ordinario: a cargo del comprador
- Dirección de devoluciones: Florida Blanca 33, 08015 Barcelona, España

Proveedor de pagos actual: Stripe (Payment Link `https://buy.stripe.com/fZu28rfyUb3SdbM4NP93y0X`).

---

## Analytics

**Plataforma:** We Flick Analytics (propia).

Configuración:
- `sessionStorage` para el `session_id`
- `session_id` aleatorio, independiente por site (business-card, stickers, pop, ...)
- Sin cross-site tracking
- Sin fingerprinting
- Sin advertising IDs
- IP no almacenada como dato analítico (uso transitorio solo para seguridad / rate limiting)
- Retención máxima: **24 meses**
- Sin heatmaps
- Sin session recordings

Eventos recogidos (categorías):
- Identificador de sesión (session_id anónimo)
- Dispositivo genérico (desktop / mobile / tablet)
- Navegación (pathname, versión de landing, page_view, section_view)
- Interacciones (buy_click, whatsapp_click, faq_open, selección de color/producto/pack/cantidad)
- Compra (`purchase`: producto, importe, moneda — nunca datos bancarios)
- Adquisición (referrer normalizado, UTMs)

Datos que Analytics NO guarda:
- Nombre, email, teléfono, dirección
- IP completa
- Fingerprint
- Advertising IDs
- Información de cuenta de We Flick
- Datos del perfil digital
- Session recordings / heatmaps

---

## Páginas legales públicas

- `/aviso-legal/`
- `/privacidad/`
- `/condiciones/`
- `/cookies/`

Enlazadas desde el footer de la landing y desde el footer de cada página legal (navegación cruzada).

---

## Separación de datos

- **Páginas legales:** repositorio de la landing (`/aviso-legal/`, `/privacidad/`, `/condiciones/`, `/cookies/`).
- **Documentación legal interna:** repositorio de la landing en `/docs/legal/`.
- **Eventos Analytics:** base de datos independiente de We Flick Analytics.
- **Datos de pago:** proveedor de pagos (Stripe).
- **Datos de pedidos:** sistema operativo/comercial correspondiente.

No se guarda información de clientes en We Flick Analytics salvo los eventos anónimos definidos.

---

## Pendientes / revisar si cambia el negocio

Revisar las páginas legales si cambia cualquiera de los siguientes elementos:

- Titular
- NIF/NIE
- Dirección
- Email
- Teléfono
- Precio
- Productos
- Territorios de venta
- Transportista
- Plazos de entrega
- Gastos de envío
- Política de renovación
- Precio de renovación
- Proveedor de pagos
- Stripe
- Funcionamiento del perfil digital
- Business Card Custom
- Analytics
- Retención de datos
- sessionStorage
- Cookies
- Tecnologías de terceros
- Publicidad
- Meta Pixel
- Google Analytics
- Clarity
- Nuevos productos We Flick

Cada cambio debe registrarse en `CHANGELOG.md`.
