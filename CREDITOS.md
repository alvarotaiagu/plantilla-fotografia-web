# Créditos y procedencia de los recursos

**Sitio de demostración. CHINAGRAPH es un negocio ficticio.**

## Fotografías: ninguna, y es el concepto

Esta plantilla es de un **estudio de fotografía** y **no contiene ni una sola
fotografía**. No es una carencia: es la decisión que la define.

Un estudio inventado no tiene obra. Rellenar su portfolio con fotos de archivo, o
con el trabajo de otro fotógrafo, sería exactamente lo que no debe hacer nadie que
viva de la imagen. Así que la web enseña **todo lo que rodea a la foto menos la
foto**: la hoja de contactos con los fotogramas en blanco, la ficha técnica de
cada toma, la marca de lápiz rojo que elige la buena, el esquema de luz del plató,
el proceso y los derechos.

Los doce fotogramas son **huecos con sus proporciones y recortes ya decididos**.
Al adaptar la plantilla a un estudio real, cada hueco es una imagen y no hay que
tocar nada más que el `src`.

## Obra gráfica

Todo SVG dibujado a mano para este repo:

| Archivo | Qué es |
|---|---|
| `assets/logo.svg` | Marca: un fotograma con perforaciones y el círculo del lápiz graso. |
| `assets/favicon.svg` | La misma marca sobre fondo oscuro. |
| `assets/og.png` | Imagen para compartir (1200×630), generada de una composición HTML propia. |
| Hoja de contactos | HTML y CSS en `index.html`: fotogramas vacíos con su ficha. |
| Marcas de lápiz | SVG en línea, un `path` por fotograma elegido, trazado con `stroke-dasharray`. |
| Visor del hero | HTML y CSS: esquinas, retícula de tercios y ficha técnica. |
| Esquema del plató | SVG en línea: ventanal, sujeto, reflector, softbox y cámara. |

## Tipografías

| Familia | Uso | Licencia |
|---|---|---|
| [Archivo Narrow](https://fonts.google.com/specimen/Archivo+Narrow) | Titulares y cifras | SIL Open Font License 1.1 |
| [Azeret Mono](https://fonts.google.com/specimen/Azeret+Mono) | Fichas técnicas, rótulos y botones | SIL Open Font License 1.1 |
| [Public Sans](https://fonts.google.com/specimen/Public+Sans) | Texto corrido | SIL Open Font License 1.1 |

## Librerías

| Librería | Versión | Origen | Licencia |
|---|---|---|---|
| GSAP + ScrollTrigger | 3.12.5 | jsDelivr | Licencia estándar de GreenSock |
| Lenis | 1.1.13 | jsDelivr | MIT |

## Mapa

`iframe` de Google Maps sin clave de API que **solo se inserta al pulsar el
botón** y que apunta a la ciudad de Vigo, nunca a un portal concreto: la dirección
del plató es inventada.
