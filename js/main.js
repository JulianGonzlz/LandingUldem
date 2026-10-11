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

// Refuerza el fondo del header al hacer scroll.
function initHeaderScroll() {
  const header = document.querySelector(".header");
  if (!header) return;

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsappLinks();
  initLogo();
  initNav();
  initFab();
  initHeaderScroll();
});
