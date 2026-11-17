/* ==========================================================================
   Uldem · Landing
   Configuración de WhatsApp + generación de links
   ========================================================================== */

// Número en formato internacional, sin "+", espacios ni guiones.
// 54 (Argentina) + 9 (celular) + código de área sin 0 + número sin 15.
const WHATSAPP_NUMBER = "5492284588656"; // A CONFIRMAR

// Cómo se muestra el número en el footer.
const WHATSAPP_DISPLAY = "2284-588656";

// Mensaje que se usa cuando un botón no define el suyo.
const DEFAULT_MESSAGE = "Hola, quiero hacer una consulta.";

/**
 * Arma el link de WhatsApp con el mensaje ya cargado.
 * @param {string} [message] Texto que aparece escrito al abrir el chat.
 * @returns {string} https://wa.me/<número>?text=<mensaje codificado>
 */
function whatsappLink(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Todo elemento con data-wa="mensaje" se convierte en un link de WhatsApp.
function initWhatsappLinks() {
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = whatsappLink(link.dataset.wa || DEFAULT_MESSAGE);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-wa-display]").forEach((el) => {
    el.textContent = WHATSAPP_DISPLAY;
  });
}

// Si el logo (assets/logo/uldem-logo.webp) carga, se muestra; si no, queda el texto "ULDEM".
function initLogo() {
  document.querySelectorAll(".brand").forEach((brand) => {
    const img = brand.querySelector(".brand__img");
    if (!img) return;

    const showLogo = () => brand.classList.add("brand--has-logo");

    if (img.complete && img.naturalWidth > 0) {
      showLogo();
    } else {
      img.addEventListener("load", showLogo, { once: true });
    }
  });
}

// Logos de marcas (assets/brands/*.webp): si cargan se muestran; si no, queda el nombre.
function initBrandLogos() {
  document.querySelectorAll(".brand-logo").forEach((item) => {
    const img = item.querySelector(".brand-logo__img");
    if (!img) return;

    const showLogo = () => item.classList.add("brand-logo--loaded");

    if (img.complete && img.naturalWidth > 0) {
      showLogo();
    } else {
      img.addEventListener("load", showLogo, { once: true });
    }
  });
}

// Menú desplegable en celular: se cierra al tocar un link, fuera del menú o con Escape.
function initNav() {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#nav");
  if (!header || !toggle || !nav) return;

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("is-menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (isOpen() && !header.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

// El botón flotante se oculta mientras hay otro botón grande de WhatsApp en pantalla
// (hero y llamado final), así no tapa contenido ni se duplica.
function initFab() {
  const fab = document.querySelector(".fab");
  const targets = document.querySelectorAll(".hero .btn--primary, .cta .btn--primary");
  if (!fab || !targets.length || !("IntersectionObserver" in window)) return;

  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    fab.classList.toggle("is-hidden", visible.size > 0);
  }, { threshold: 0.6 });

  targets.forEach((target) => observer.observe(target));
}

// Tarjeta animada del hero: rota las fotos de los rubros cada pocos segundos.
// Solo corre mientras la tarjeta está en pantalla y la pestaña visible, y no
// se anima si el usuario pidió reducir el movimiento.
function initPromo() {
  const promo = document.querySelector("[data-promo]");
  if (!promo) return;

  const slides = [...promo.querySelectorAll(".promo__img")];
  const title = promo.querySelector(".promo__title");
  const dotsBox = promo.querySelector(".promo__dots");
  if (slides.length < 2 || !title || !dotsBox) return;

  const INTERVAL = 3200; // milisegundos que se ve cada foto
  const dots = slides.map(() => dotsBox.appendChild(document.createElement("span")));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer = null;
  let onScreen = false;

  // La tarjeta es un enlace: lleva al rubro de la foto que se está viendo.
  const syncLink = () => {
    const slide = slides[index];
    if (slide.dataset.rubro) promo.href = `rubro.html?rubro=${slide.dataset.rubro}`;
    promo.setAttribute("aria-label", `Ver ${slide.dataset.title || "productos"}`);
  };

  const show = (next) => {
    slides[index].classList.remove("is-active");
    dots[index].classList.remove("is-active");
    index = next;
    slides[index].classList.add("is-active");
    dots[index].classList.add("is-active");

    title.textContent = slides[index].dataset.title || "";
    syncLink();
    title.classList.remove("is-changing");
    void title.offsetWidth; // reinicia la animación del texto
    title.classList.add("is-changing");
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  const update = () => {
    const shouldRun = onScreen && !document.hidden && !reduceMotion.matches;
    if (shouldRun && !timer) {
      timer = setInterval(() => show((index + 1) % slides.length), INTERVAL);
    } else if (!shouldRun) {
      stop();
    }
  };

  dots[0].classList.add("is-active");

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      update();
    }, { threshold: 0.25 }).observe(promo);
  } else {
    onScreen = true;
  }

  document.addEventListener("visibilitychange", update);
  update();
}

/* --------------------------------------------------------------------------
   Catálogo (datos en js/catalogo.js) y consulta de varios productos
   -------------------------------------------------------------------------- */

const CATALOG_PHOTOS = "assets/products/catalogo/";
const QUOTE_STORAGE_KEY = "uldem-consulta";
const QUOTE_MAX_ITEMS = 200; // tope de productos en la consulta guardada
const QUOTE_MAX_TEXT = 200; // largo máximo de cada texto guardado
const ALL_GROUPS = -1;

// Productos agregados a la consulta: clave -> { rubro, grupo, nombre }
const quote = new Map();
const quoteListeners = [];

function loadQuote() {
  try {
    const saved = JSON.parse(localStorage.getItem(QUOTE_STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return;

    // Lo guardado puede estar modificado o roto: solo se aceptan textos cortos y una cantidad razonable.
    // (Igual nunca se muestra como HTML: todo se escribe con textContent.)
    const text = (value) => (typeof value === "string" && value.length <= QUOTE_MAX_TEXT ? value : null);
    saved.slice(0, QUOTE_MAX_ITEMS).forEach((raw) => {
      if (!raw || typeof raw !== "object") return;
      const item = { key: text(raw.key), rubro: text(raw.rubro), grupo: text(raw.grupo || ""), nombre: text(raw.nombre) };
      if (item.key && item.nombre && item.rubro !== null && item.grupo !== null) quote.set(item.key, item);
    });
  } catch (error) {
    /* sin almacenamiento: la consulta arranca vacía */
  }
}

function saveQuote() {
  try {
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify([...quote.values()]));
  } catch (error) {
    /* sin almacenamiento: no pasa nada, solo no se recuerda */
  }
}

function quoteChanged() {
  saveQuote();
  quoteListeners.forEach((listener) => listener());
}

// "Herramientas eléctricas · Línea industrial · Amoladoras"
function productLabel(item) {
  return [item.rubro, item.grupo, item.nombre].filter(Boolean).join(" · ");
}

function quoteMessage() {
  const lines = [...quote.values()].map((item) => `• ${productLabel(item)}`);
  return `Hola, quiero consultar precio y disponibilidad de:\n${lines.join("\n")}`;
}

// Marcas de un producto (lista): las suyas, o si no tiene, la de su grupo (línea).
function productBrands(product, group) {
  return [].concat(product.marca || (group && group.marca) || []);
}

const sameText = (a, b) => a.localeCompare(b, "es", { sensitivity: "base" }) === 0;

// Una "vista" es lo que muestra el panel: un rubro, o todos los productos de una marca.
// Cada producto va con su rubro y su línea reales, así el mensaje y la foto son los mismos
// se lo vea desde el rubro o desde la marca.
function categoryView(category) {
  const entry = (product, group) => ({ product, rubro: category, linea: group });
  return {
    category,
    nombre: category.nombre,
    todos: Boolean(category.todos),
    grupos: category.grupos
      ? category.grupos.map((group) => ({ nombre: group.nombre, entradas: group.productos.map((p) => entry(p, group)) }))
      : null,
    entradas: category.productos ? category.productos.map((p) => entry(p, null)) : [],
  };
}

// Productos de una marca, agrupados por rubro.
function brandView(marca) {
  const grupos = [];
  CATALOGO.forEach((category) => {
    const groups = category.grupos || [{ productos: category.productos }];
    const entradas = groups.flatMap((group) =>
      group.productos
        .filter((product) => productBrands(product, group).some((name) => sameText(name, marca)))
        .map((product) => ({ product, rubro: category, linea: group.nombre ? group : null }))
    );
    if (entradas.length) grupos.push({ nombre: category.nombre, entradas });
  });
  return { marca, nombre: marca, todos: true, grupos, entradas: [] };
}

function viewEntries(view, groupIndex) {
  if (!view.grupos) return view.entradas;
  const groups = groupIndex === ALL_GROUPS ? view.grupos : [view.grupos[groupIndex]];
  return groups.flatMap((group) => group.entradas);
}

function photoPath(category, group, product) {
  const parts = [category.carpeta, group && group.carpeta, product.foto].filter(Boolean);
  return CATALOG_PHOTOS + parts.join("/");
}

// Catálogo.
// - index.html: los 14 rubros son links a su página (rubro.html?rubro=...).
// - rubro.html (data-catalog-rubro) y marca.html (data-catalog-marca): todos los productos juntos,
//   ordenados con un título por sección (en un rubro, por línea o tipo; en una marca, por rubro). Sin filtros.
function initCatalog() {
  const root = document.querySelector("[data-catalog]");
  if (!root || typeof CATALOGO === "undefined" || !CATALOGO.length) return;

  // Rubros como links (página principal)
  const rubrosBox = root.querySelector("[data-catalog-rubros]");
  if (rubrosBox) {
    CATALOGO.forEach((category) => {
      const link = document.createElement("a");
      link.className = "rubro";
      link.href = `rubro.html?rubro=${encodeURIComponent(category.id)}`;
      link.innerHTML = `
        <span class="rubro__media"><img alt="" loading="lazy" decoding="async"></span>
        <span class="rubro__name"></span>`;
      link.querySelector("img").src = category.portada;
      link.querySelector(".rubro__name").textContent = category.nombre;
      rubrosBox.appendChild(link);
    });
  }

  const itemsBox = root.querySelector("[data-catalog-items]");
  if (!itemsBox) return;

  const brandOnly = root.dataset.catalogMarca || "";
  const rubroOnly = CATALOGO.find((category) => category.id === root.dataset.catalogRubro);
  const view = brandOnly ? brandView(brandOnly) : rubroOnly ? categoryView(rubroOnly) : null;
  if (!view) return;

  const titleEl = root.querySelector("[data-catalog-title]");
  const countEl = root.querySelector("[data-catalog-count]");
  const allLink = root.querySelector("[data-catalog-all]");
  const groupsBox = root.querySelector("[data-catalog-groups]");
  const panel = root.querySelector(".catalog__panel");

  if (groupsBox) groupsBox.hidden = true;
  allLink.target = "_blank";
  allLink.rel = "noopener noreferrer";

  // Título de sección de cada producto: en la marca, su rubro; en el rubro, su línea o tipo
  const sectionOf = ({ rubro, linea }) => (view.marca ? rubro.nombre : linea ? linea.nombre : "");

  function renderItems() {
    const list = viewEntries(view, ALL_GROUPS);
    root.classList.toggle("catalog--empty", list.length === 0);

    countEl.textContent = `${list.length} ${list.length === 1 ? "producto" : "productos"}`;
    if (view.marca) {
      allLink.href = whatsappLink(`Hola, quiero consultar por los productos ${view.marca}.`);
      allLink.firstChild.textContent = "Consultar toda la marca ";
    } else {
      allLink.href = whatsappLink(`Hola, quiero consultar por ${view.nombre}.`);
      allLink.firstChild.textContent = "Consultar todo el rubro ";
    }

    itemsBox.textContent = "";

    // Marca sin productos cargados (por ejemplo BOLTZ): se invita a consultar por WhatsApp
    if (!list.length) {
      const empty = document.createElement("li");
      empty.className = "items__empty";
      empty.innerHTML = `
        <p></p>
        <a class="btn btn--primary">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-whatsapp"/></svg>
          Consultar por WhatsApp
        </a>`;
      const name = view.marca || view.nombre;
      empty.querySelector("p").textContent = `Todavía no cargamos los productos ${name} en la web. Escribinos y te pasamos el listado completo con precios y disponibilidad.`;
      const link = empty.querySelector("a");
      link.href = whatsappLink(`Hola, quiero consultar por los productos ${name}.`);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      itemsBox.appendChild(empty);
    }

    let lastSection = null;
    list.forEach((entry) => {
      const { product, rubro, linea } = entry;

      // Un título cada vez que empieza una sección nueva
      const section = sectionOf(entry);
      if (section && section !== lastSection) {
        lastSection = section;
        const total = list.filter((other) => sectionOf(other) === section).length;
        const heading = document.createElement("li");
        heading.className = "items__heading";
        heading.innerHTML = "<h3></h3><span></span>";
        heading.querySelector("h3").textContent = section;
        heading.querySelector("span").textContent = `${total} ${total === 1 ? "producto" : "productos"}`;
        itemsBox.appendChild(heading);
      }

      const item = {
        key: `${rubro.id}/${linea ? linea.nombre : ""}/${product.nombre}`,
        rubro: rubro.nombre,
        grupo: linea ? linea.nombre : "",
        nombre: product.nombre,
      };

      const li = document.createElement("li");
      li.className = "item";
      li.innerHTML = `
        <div class="item__media"><img loading="lazy" decoding="async"></div>
        <div class="item__body">
          <p class="item__tag"></p>
          <h4 class="item__name"></h4>
          <div class="item__actions">
            <button class="item__add" type="button"></button>
            <a class="item__wa">
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-whatsapp"/></svg>
            </a>
          </div>
        </div>`;

      const img = li.querySelector("img");
      img.src = photoPath(rubro, linea, product);
      img.alt = product.nombre;
      img.addEventListener("error", () => li.querySelector(".item__media").classList.add("item__media--empty"), { once: true });

      // En la marca, el rubro está en el título: se aclara solo la línea (industrial / profesional)
      const tag = li.querySelector(".item__tag");
      if (view.marca && linea) tag.textContent = linea.nombre;
      else tag.remove();

      li.querySelector(".item__name").textContent = product.nombre;

      const wa = li.querySelector(".item__wa");
      wa.href = whatsappLink(`Hola, quiero consultar precio y disponibilidad de: ${productLabel(item)}`);
      wa.target = "_blank";
      wa.rel = "noopener noreferrer";
      wa.setAttribute("aria-label", `Consultar ${product.nombre} por WhatsApp`);

      const add = li.querySelector(".item__add");
      const paint = () => {
        const added = quote.has(item.key);
        add.setAttribute("aria-pressed", String(added));
        add.setAttribute("aria-label", `${added ? "Quitar" : "Agregar"} ${product.nombre} ${added ? "de" : "a"} la consulta`);
        add.innerHTML = added
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>Agregado'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Agregar';
        li.classList.toggle("is-added", added);
      };
      add.addEventListener("click", () => {
        if (quote.has(item.key)) quote.delete(item.key);
        else quote.set(item.key, item);
        quoteChanged();
      });
      li.paint = paint;
      paint();

      itemsBox.appendChild(li);
    });
  }

  titleEl.textContent = view.marca ? `Productos ${view.marca}` : "Productos";
  // Con la clase brand-card--<marca> el panel toma los colores de la marca (en un rubro, los de Uldem)
  panel.classList.add("catalog__panel--marca", `brand-card--${view.marca ? view.marca.toLowerCase() : "uldem"}`);

  // Si la consulta cambia desde otro lado (barra inferior), se actualizan los botones
  quoteListeners.push(() => itemsBox.querySelectorAll(".item").forEach((li) => li.paint && li.paint()));

  renderItems();
}

// Tarjetas de la sección Marcas (index.html): muestran cuántos productos tiene cada marca y,
// si la tarjeta no trae fotos de fondo, usa las de MARCAS (js/catalogo.js).
// Son links comunes a marca.html, así el botón "atrás" del navegador vuelve a la página principal.
function initBrandCards() {
  if (typeof CATALOGO === "undefined") return;
  document.querySelectorAll("[data-marca]").forEach((card) => {
    const marca = card.dataset.marca;
    const count = card.querySelector("[data-marca-count]");
    const total = viewEntries(brandView(marca), ALL_GROUPS).length;
    if (count) count.textContent = total ? `Ver ${total} ${total === 1 ? "producto" : "productos"}` : "Consultar";

    const bg = card.querySelector(".brand-card__bg");
    const brand = typeof MARCAS !== "undefined" ? MARCAS[marca.toLowerCase()] : null;
    if (bg && !bg.children.length && brand) {
      (brand.fondo || []).forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        bg.appendChild(img);
      });
    }
  });
}

// marca.html?marca=gladiator: arma el encabezado de la marca y le dice al catálogo qué marca mostrar.
function initBrandPage() {
  const page = document.querySelector("[data-brand-page]");
  if (!page || typeof MARCAS === "undefined") return;

  const key = (new URLSearchParams(location.search).get("marca") || "").toLowerCase();
  const brand = MARCAS[key];
  const hero = page.querySelector("[data-brand-hero]");
  const catalog = page.querySelector("[data-catalog]");

  if (!brand) {
    page.querySelector("[data-brand-missing]").hidden = false;
    hero.hidden = true;
    // Sin marca válida no se muestra ningún producto (y el catálogo no se arma)
    catalog.closest("section").hidden = true;
    catalog.removeAttribute("data-catalog");
    return;
  }

  document.title = `${brand.nombre} · Uldem`;
  hero.classList.add(`brand-card--${key}`);
  hero.querySelector("[data-brand-tipo]").textContent =
    brand.tipo === "representada" ? "Marca que representamos" : "Importación propia";
  hero.querySelector("[data-brand-name]").textContent = brand.nombre;
  hero.querySelector("[data-brand-text]").textContent = brand.texto;

  const total = viewEntries(brandView(brand.nombre), ALL_GROUPS).length;
  hero.querySelector("[data-brand-count]").textContent = total ? `${total} ${total === 1 ? "producto" : "productos"}` : "";

  const bg = hero.querySelector("[data-brand-bg]");
  (brand.fondo || []).forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.decoding = "async";
    bg.appendChild(img);
  });

  catalog.dataset.catalogMarca = brand.nombre;
}

// rubro.html?rubro=herramientas-electricas: arma el encabezado del rubro y le dice al catálogo cuál mostrar.
function initRubroPage() {
  const page = document.querySelector("[data-rubro-page]");
  if (!page || typeof CATALOGO === "undefined") return;

  const id = (new URLSearchParams(location.search).get("rubro") || "").toLowerCase();
  const category = CATALOGO.find((item) => item.id === id);
  const hero = page.querySelector("[data-brand-hero]");
  const catalog = page.querySelector("[data-catalog]");

  if (!category) {
    page.querySelector("[data-brand-missing]").hidden = false;
    hero.hidden = true;
    catalog.closest("section").hidden = true;
    catalog.removeAttribute("data-catalog");
    return;
  }

  document.title = `${category.nombre} · Uldem`;
  hero.classList.add("brand-card--uldem");
  hero.querySelector("[data-brand-name]").textContent = category.nombre;

  // Texto: las líneas o tipos que tiene el rubro, o una invitación a consultar
  const groups = (category.grupos || []).map((group) => group.nombre.toLowerCase());
  hero.querySelector("[data-brand-text]").textContent = groups.length
    ? `Incluye: ${groups.join(", ")}. Sumá a tu consulta los que te interesan y te pasamos precios y disponibilidad por WhatsApp.`
    : "Sumá a tu consulta los productos que te interesan y te pasamos precios y disponibilidad por WhatsApp.";

  const total = viewEntries(categoryView(category), ALL_GROUPS).length;
  hero.querySelector("[data-brand-count]").textContent = `${total} ${total === 1 ? "producto" : "productos"}`;

  // De fondo, la foto de portada del rubro
  const bg = hero.querySelector("[data-brand-bg]");
  const img = document.createElement("img");
  img.src = category.portada;
  img.alt = "";
  img.decoding = "async";
  bg.appendChild(img);

  catalog.dataset.catalogRubro = category.id;
}

// "Volver": si se llegó desde la página principal, vuelve atrás (y queda donde estaba);
// si se abrió el link directo, va a la sección Marcas de la principal.
function initBackLinks() {
  document.querySelectorAll("[data-back]").forEach((link) => {
    link.addEventListener("click", (event) => {
      let fromSite = false;
      try {
        fromSite = Boolean(document.referrer) && new URL(document.referrer).origin === location.origin;
      } catch (error) {
        fromSite = false;
      }
      if (fromSite && history.length > 1) {
        event.preventDefault();
        history.back();
      }
    });
  });
}

// Barra inferior con los productos agregados y el botón para enviar por WhatsApp.
function initQuote() {
  const bar = document.querySelector("[data-quote]");
  if (!bar) return;

  const count = bar.querySelector("[data-quote-count]");
  const label = bar.querySelector("[data-quote-label]");
  const toggle = bar.querySelector("[data-quote-toggle]");
  const sheet = bar.querySelector("[data-quote-sheet]");
  const list = bar.querySelector("[data-quote-list]");
  const send = bar.querySelector("[data-quote-send]");
  const clear = bar.querySelector("[data-quote-clear]");

  send.target = "_blank";
  send.rel = "noopener noreferrer";

  const setOpen = (open) => {
    sheet.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    bar.classList.toggle("is-open", open);
  };

  const render = () => {
    const size = quote.size;
    bar.hidden = size === 0;
    document.body.classList.toggle("has-quote", size > 0);
    if (size === 0) setOpen(false);

    count.textContent = String(size);
    label.textContent = size === 1 ? "producto en tu consulta" : "productos en tu consulta";
    toggle.setAttribute("aria-label", `${size} ${label.textContent}. Ver lista`);
    send.href = whatsappLink(quoteMessage());

    list.textContent = "";
    quote.forEach((item, key) => {
      const li = document.createElement("li");
      li.className = "quote__item";
      li.innerHTML = `
        <span class="quote__item-text"><small></small><span></span></span>
        <button class="quote__remove" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>`;
      li.querySelector("small").textContent = [item.rubro, item.grupo].filter(Boolean).join(" · ");
      li.querySelector(".quote__item-text span").textContent = item.nombre;
      const remove = li.querySelector(".quote__remove");
      remove.setAttribute("aria-label", `Quitar ${item.nombre}`);
      remove.addEventListener("click", () => {
        quote.delete(key);
        quoteChanged();
      });
      list.appendChild(li);
    });
  };

  toggle.addEventListener("click", () => setOpen(sheet.hidden));
  clear.addEventListener("click", () => {
    quote.clear();
    quoteChanged();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet.hidden) setOpen(false);
  });
  document.addEventListener("click", (event) => {
    // composedPath: el botón "quitar" ya no está en la página cuando llega el click
    if (!sheet.hidden && !event.composedPath().includes(bar)) setOpen(false);
  });

  quoteListeners.push(render);
  render();
}

// Refuerza el fondo del header al hacer scroll.
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuote();
  initBrandPage();
  initRubroPage();
  initCatalog();
  initBrandCards();
  initBackLinks();
  initQuote();
  initWhatsappLinks();
  initLogo();
  initBrandLogos();
  initNav();
  initFab();
  initPromo();
  initHeaderScroll();
});
