# Uldem · Landing

Página estática de Uldem (distribuidora mayorista de ferretería y corralón, Olavarría).
Presenta la empresa, muestra los rubros y deriva todas las consultas a WhatsApp.
**No muestra precios**: todo se consulta por WhatsApp.

Es HTML + CSS + JS puro: no hay nada que instalar ni compilar. Para verla, abrí `index.html` con doble clic.

## Estructura

```
uldem-landing/
├─ index.html          Todo el contenido y los textos
├─ css/styles.css      Diseño (colores, tipografías, tamaños)
├─ js/main.js          Número de WhatsApp y armado de los links
├─ assets/
│  ├─ logo/            uldem-logo.webp (el que usa la página), uldem-logo.png, favicon.png, og-image.jpg
│  ├─ products/        Una foto .webp por rubro
│  └─ brands/          (vacía) logos de marcas, si se consiguen
├─ source/             Archivos originales. NO SUBIR AL HOSTING (ver abajo)
├─ qa/                 Capturas de revisión en celular, tablet y escritorio. No hace falta subirla
├─ armar-publicacion.bat   Genera la carpeta publicar/ lista para subir (ver "Publicar")
├─ publicar/           La crea el script: copia del sitio sin source/ ni qa/
├─ .gitignore          Excluye source/, qa/ y publicar/ de Git
└─ README.md
```

## Cambiar el número de WhatsApp

Se cambia en un solo lugar: las primeras líneas de `js/main.js`.

```js
const WHATSAPP_NUMBER = "5492284588656"; // el que usan los links
const WHATSAPP_DISPLAY = "2284-588656";  // el que se lee en el footer
```

`WHATSAPP_NUMBER` va en formato internacional, sin `+`, espacios ni guiones:
`54` (Argentina) + `9` (celular) + código de área sin el 0 + número sin el 15.

Todos los botones de WhatsApp de la página toman el número de ahí.

## Cambiar los mensajes de WhatsApp

Cada botón tiene en `index.html` un atributo `data-wa` con el mensaje que aparece ya escrito al abrir el chat:

```html
<a class="card__link" data-wa="Hola, quiero consultar por Jardinería">Consultar precios →</a>
```

Editá el texto entre comillas. No hace falta codificar nada: de eso se encarga `main.js`.

El botón flotante (el círculo rojo de abajo a la derecha) es el `<a class="fab" …>` del final de `index.html`.
Se oculta solo mientras hay otro botón grande de WhatsApp en pantalla, para no tapar contenido.

## Cambiar textos

Todos los textos están en `index.html`, separados por comentarios (`<!-- ===== 2. HERO ===== -->`, etc.).
Abrí el archivo con cualquier editor (Bloc de notas, VS Code), cambiá el texto entre las etiquetas y guardá.

### Pendientes marcados con [COMPLETAR]

Queda un solo pendiente, resaltado en amarillo al final del párrafo principal de **Quiénes somos**:
hace cuántos años trabajan y a quiénes abastecen.

Buscá `[COMPLETAR` en `index.html` y vas a encontrar esto:

```html
<mark>[COMPLETAR: hace cuántos años trabajan y a quiénes abastecen]</mark>
```

Reemplazá toda esa línea por el texto real. Hay que borrar también la etiqueta `<mark>` que lo envuelve
(la apertura `<mark>` y el cierre `</mark>`); si queda, el texto sigue saliendo resaltado en amarillo.

## Cambiar o agregar productos

Cada rubro es un bloque `<article class="card glass">` dentro de la sección Productos.
Para agregar uno, copiá un bloque entero, cambiá título, lista, foto y el `data-wa`.

### Fotos

- Van en `assets/products/`, en `.webp`, de 800 px de ancho como máximo (las actuales miden 800×520).
- Para reemplazar una, guardá la nueva con el mismo nombre de archivo.
- Actualizá el `alt` de la imagen para que describa lo que se ve.
- **No usar fotos con precios** ni con marcas que Uldem no representa.
- Si un rubro se queda sin foto, reemplazá su `<div class="card__media">…</div>` por
  `<div class="card__media card__media--empty">Foto próximamente</div>`.

## Marcas

Están como texto en la sección Marcas de `index.html`. Para usar logos, guardalos en
`assets/brands/` y reemplazá el `<li>Marca</li>` por
`<li><img src="assets/brands/marca.png" alt="Marca" height="32" loading="lazy"></li>`.

## Colores y tipografías

Al principio de `css/styles.css`, en el bloque `:root`, están los colores como variables
(`--bg`, `--black`, `--gray`, `--gray-light`, `--red`). Cambiando un valor ahí cambia en toda la página.
Las tipografías (Barlow y Barlow Condensed) se cargan desde Google Fonts en el `<head>` de `index.html`.

## Publicar

**Importante:** la carpeta `source/` tiene la lista de precios y los archivos originales.
No la subas al hosting. Lo que se publica es: `index.html`, `css/`, `js/` y `assets/`.
La carpeta `qa/` (capturas de revisión) tampoco se sube.

### Armar la carpeta para subir

Hacé doble clic en `armar-publicacion.bat`. El script:

1. Borra la carpeta `publicar/` si ya existía y la crea de nuevo.
2. Copia adentro `index.html`, `css/`, `js/` y `assets/`. No copia `source/` ni `qa/`.
3. Revisa que en `publicar/` no haya quedado ningún PDF ni archivo de precios. Si encuentra alguno, avisa con un error y borra `publicar/` para que no se suba por error.

Cada vez que cambies algo del sitio, volvé a ejecutar el script antes de publicar.
No edites archivos dentro de `publicar/`: se pisan en la próxima ejecución.

### Netlify (lo más simple)

1. Ejecutá `armar-publicacion.bat`.
2. Entrá a <https://app.netlify.com/drop> y arrastrá la carpeta `publicar/`.
3. Netlify te da una dirección al instante. Después podés conectarle un dominio propio desde *Domain settings*.

### Vercel

1. Instalá la herramienta: `npm i -g vercel`.
2. Ejecutá `armar-publicacion.bat`.
3. Dentro de la carpeta `publicar/`, ejecutá `vercel` y seguí los pasos. Para publicar la versión final: `vercel --prod`.

También se puede subir el proyecto a GitHub e importarlo desde <https://vercel.com/new> (sin configuración: es un sitio estático).
El archivo `.gitignore` ya excluye `source/`, `qa/` y `publicar/`, así que la lista de precios no se sube a GitHub.

### Hosting común (cPanel / FTP)

1. Entrá al administrador de archivos de tu hosting o conectate por FTP (por ejemplo con FileZilla).
2. Ejecutá `armar-publicacion.bat` y subí el contenido de `publicar/` a la carpeta `public_html` (o `www`).
3. Listo: la página queda en tu dominio.

### Después de publicar

Cuando tengas la dirección final, en el `<head>` de `index.html`:

- Cambiá `og:image` por la dirección completa, por ejemplo
  `https://www.tudominio.com.ar/assets/logo/og-image.jpg` (WhatsApp y Facebook necesitan la dirección completa para mostrar la imagen al compartir el link).
- Agregá `<meta property="og:url" content="https://www.tudominio.com.ar/">`.
