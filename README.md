# CHINAGRAPH — plantilla de estudio de fotografía

> **Sitio de demostración. CHINAGRAPH es un negocio ficticio.** Nombre,
> dirección, teléfono, horarios, tarifas y fichas técnicas son datos de muestra
> inventados para enseñar la plantilla. No corresponden a ningún estudio real. La
> página lleva `noindex, nofollow` y no publica valoraciones en sus datos
> estructurados.
>
> **Y no contiene ni una sola fotografía.** A propósito: ver abajo.

**Demo:** https://alvarotaiagu.github.io/plantilla-fotografia-web/

Web estática: HTML + CSS + un `main.js`. Sin framework, sin build, sin backend y
sin npm. GSAP, ScrollTrigger y Lenis por CDN; con el CDN caído la página se lee
entera y las marcas de lápiz aparecen ya dibujadas, que es su estado legible.

---

## El concepto: «Hoja de contactos»

Una web de fotógrafo **sin fotos** parece un chiste o un descuido. Aquí es la
idea entera, y sale de un problema real: este estudio no existe, así que no tiene
obra. Rellenar su portfolio con fotos de archivo o con el trabajo de otro sería
exactamente lo que no debe hacer nadie que viva de la imagen.

Así que la plantilla enseña **todo lo que rodea a la foto menos la foto**:

- **La hoja de contactos.** Doce fotogramas con su ficha técnica —toma, óptica,
  luz— y cuatro marcados con el círculo del lápiz rojo. Los fotogramas están
  vacíos y lo dicen: *sin exponer*. Son los huecos, con proporción y recorte ya
  decididos, donde va el trabajo del estudio real.
- **La marca de lápiz es el protagonista.** Antes de que exista una foto buena
  hay alguien eligiendo cuál se lleva: ese gesto es el oficio, y es lo que se
  anima. Cada círculo se traza cuando su fotograma entra en pantalla.
- **El visor del hero** enseña las esquinas, la retícula de tercios y la ficha de
  la toma… con el encuadre vacío.
- **El plató se dibuja, no se fotografía**: un esquema cenital de la sesión de
  retrato con luz de ventana.
- Y hay una sección entera de **derechos**, que es lo que de verdad diferencia a
  un estudio serio y lo que nadie pone en su web.

Quien reskinee esto sabe exactamente dónde van las imágenes y, mientras tanto, la
plantilla se puede enseñar sin mentir ni una sola vez.

## Registro visual

| | |
|---|---|
| **Paleta** | cuarto oscuro: fondo `#0C0A0A`, panel `#15100F`, línea `#2A2220`, acero `#4A403D`, humo `#B0A7A3`, hueso `#F2EEEC` y un único acento: rojo de lápiz graso `#FF2D2D` |
| **Tipografía** | Archivo Narrow (titulares), Azeret Mono (fichas técnicas y rótulos), Public Sans (texto) |
| **Movimiento protagonista** | la marca de lápiz rojo que elige la toma buena, trazada fotograma a fotograma |
| **Tono** | cuarto oscuro y mesa de luz; ninguna épica de «capturamos momentos» |

## Mapa de secciones

1. **Hero** — la declaración («aquí no hay fotos») y el visor vacío con su ficha.
2. **Franja** — marquesina de tipos de sesión ligada a la velocidad del scroll.
3. **01 · La hoja** — doce fotogramas, sus fichas y las marcas (protagonista).
4. **02 · Sesiones** — cuatro tipos, con lo que de verdad importa: cuántas
   imágenes se entregan y en qué plazo.
5. **03 · El plató** — esquema de luz dibujado y cuatro contadores.
6. **04 · Proceso** — seis pasos, de la llamada a los archivos.
7. **05 · Derechos** — autoría, uso cedido, imagen de las personas y permiso para
   publicar el trabajo.
8. **06 · Tarifas** — ocho líneas de precios de muestra, con la ampliación de uso
   como concepto propio.
9. **07 · Preguntas** — acordeón nativo (`<details>`).
10. **08 · Reservar** — formulario de muestra y mapa solo bajo clic.
11. **Pie** — sello de demostración y enlaces legales.

## Recursos de movimiento

| Recurso | Dónde |
|---|---|
| Lenis como único motor de scroll | toda la página (`lerp: 0.16`) |
| Trazado de las marcas de lápiz | hoja de contactos (protagonista) |
| Revelado palabra a palabra | todos los titulares con `data-revelar` |
| Marquesina ligada a la velocidad del scroll | franja de tipos de sesión |
| Ficha del visor que va cambiando | hero |
| Contadores | cifras del plató |
| Botones magnéticos | todos los `[data-iman]` |
| Cursor en forma de encuadre | sobre fotogramas, sesiones, esquema y tarifas |
| Fotogramas recorribles con el teclado | la hoja entera, con `aria-label` por fotograma |

## Qué tocar para reskinear a un cliente real

1. **Las fotos.** Es lo primero y lo más importante. Cada `<li class="frame">`
   tiene un `.frame-caja` con proporción 3:2: ahí dentro va un `<img>` (o un
   `<picture>` con `srcset`) sustituyendo al `<span class="frame-vacio">`. El
   número, la ficha técnica y la marca de lápiz se quedan: son lo que hace que la
   rejilla siga siendo una hoja de contactos y no un mosaico cualquiera.
   **Y hay que quitar el aviso `.hoja-aviso`** de la cabecera de la sección, que
   explica por qué está vacía.
2. **Datos del negocio.** `index.html` (bloque `ld+json`, sección `#reservar` y
   pie), `aviso-legal.html`, `manifest.json` y este README. Busca `chinagraph`,
   `986 00 00 00`, `Rúa do Fotograma` y `Vigo`.
3. **Quitar el sello de demostración**: el comentario HTML de la primera línea de
   cada página, el párrafo `.sello` del pie, el `<meta name="robots">` y los
   avisos de este README y del aviso legal.
4. **Derechos.** La sección `#derechos` describe un modelo de cesión de uso
   habitual, pero cada estudio tiene el suyo: hay que ajustarla a lo que de
   verdad firma el cliente, y que la revise quien corresponda.
5. **Tarifas.** Una sola `<table class="tabla">`.
6. **Paleta.** Las variables de `:root` en `css/style.css`; el acento vive en
   `--rojo`.
7. **Tipografía.** El `<link>` de Google Fonts en las tres páginas y las
   variables `--display`, `--mono` y `--texto`.
8. **El esquema del plató.** SVG en línea; mover una luz es mover un rectángulo.

## Decisiones tomadas

- **Cero fotografías, y dicho en voz alta.** Está en el titular del hero, en el
  aviso de la hoja, en las preguntas frecuentes, en el pie, en el aviso legal y
  en los créditos. No es un hueco que se disimula: es el argumento.
- **Ninguna imagen de personas**, ni de archivo ni generada, para no tener que
  fingir autorizaciones de derechos de imagen que no existen.
- **Se dice que no se fotografía a menores**, y no hay ninguna imagen ni
  referencia que sugiera lo contrario.
- **La sección de derechos existe porque es lo que falta en casi todas las webs
  del sector**: quién es el autor, qué uso se cede y qué pasa si sale gente. Va
  con el aviso de que no sustituye a un contrato.
- **Nada de «capturamos momentos».** El texto habla de tomas entregadas, plazos,
  ópticas y usos cedidos, que es lo que un cliente necesita decidir.
- **El mapa apunta a la ciudad**, nunca a un portal: la dirección es inventada.
- **Sin `aggregateRating` ni `review`** en `schema.org`.
- **Movimiento reducido**: se apaga el movimiento, no el contenido. Las marcas se
  ven dibujadas, la cuenta de fotogramas marcados se sigue calculando del DOM y
  los contadores muestran su cifra final.

## Verificación

Ver `screenshots/`: capturas a 1440×900 y 390×844, más las pasadas con GSAP
bloqueado y con `prefers-reduced-motion: reduce`. Consola limpia, sin peticiones
fallidas y sin imágenes rotas —de hecho, sin imágenes—; probados el botón de
cookies, el menú móvil, el botón del mapa y el formulario.

**Accesibilidad:** auditada con axe-core (`wcag2a`, `wcag2aa`, `wcag21a`,
`wcag21aa` y `best-practice`) en 1440×900 y 390×844 sobre las tres páginas, con
el aviso de cookies cerrado y la página recorrida entera. Sin violaciones.

## Licencia de uso

Plantilla de muestra propiedad de su autor. El contenido es ficticio y no puede
presentarse como un negocio real.
