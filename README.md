# Pachamama Ceremonias

Sitio bilingüe (español e inglés) hecho con Next.js App Router, TypeScript y CSS. La estructura prioriza páginas renderizadas en el servidor, contenido indexable y consultas de clientes desde San Miguel de Allende y la región.

## Requisitos

- Node.js 20.9 o posterior
- npm

## Desarrollo local

1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env.local`.
3. Configura el envío de consultas (ver abajo).
4. Inicia el sitio: `npm run dev`
5. Abre `http://localhost:3000`; el sitio redirige a `/es`. La versión inglesa está en `/en`.

Comandos de validación: `npm run lint`, `npm run typecheck` y `npm run build`.

## Consultas, agenda y pagos

El formulario envía los datos mediante `/api/inquiries` usando Resend. Configura `RESEND_API_KEY` y verifica el dominio remitente en Resend antes de publicar; `INQUIRY_TO_EMAIL` e `INQUIRY_FROM_EMAIL` permiten ajustar las direcciones. La protección antispam usa Cloudflare Turnstile: [crea un widget](https://developers.cloudflare.com/turnstile/get-started/) en modo administrado, autoriza los hostnames del sitio y configura `NEXT_PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`. La clave secreta solo se usa en el servidor. Configura ambas variables en local y en Hostinger antes de publicar. Para desarrollo local puedes usar las [claves de prueba de Turnstile](https://developers.cloudflare.com/turnstile/troubleshooting/testing/), nunca en producción. No guardamos las consultas en una base de datos.

Cuando exista la página pública de Cal.com, define `NEXT_PUBLIC_CAL_URL` con la URL completa. Hasta entonces, las consultas se pueden coordinar por WhatsApp. El pago no se cobra en el sitio: el paquete y el anticipo del 50 % se acuerdan después de la llamada, como se hace actualmente.

## SEO y publicación

Incluye rutas `/es` y `/en`, metadatos por idioma, canonical/hreflang, sitemap, robots.txt y datos estructurados de negocio local y preguntas frecuentes. Las imágenes reutilizadas del sitio actual están en `public/assets`, así que no dependen de que WordPress siga activo.

Antes de conectar el dominio, completar la URL de Cal.com, verificar remitente de correo, revisar textos legales y comprobar la exactitud de fotos, testimonios, descripciones y traducciones. Los precios no se muestran porque dependen del paquete.
