/* ==========================================================================
   CHINAGRAPH — plantilla de demostración (negocio ficticio)
   Concepto «Hoja de contactos»: una web de fotógrafo sin ni una fotografía.
   GSAP, ScrollTrigger y Lenis por CDN; sin ellos la página se lee entera y las
   marcas de lápiz aparecen ya dibujadas, que es su estado legible.
   ========================================================================== */

(function () {
  "use strict";

  var raiz = document.documentElement;
  var mqReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducido = mqReducido.matches;
  var gsapListo = !!(window.gsap && window.ScrollTrigger);
  var movimiento = gsapListo && !reducido;

  if (gsapListo) { window.gsap.registerPlugin(window.ScrollTrigger); }
  if (movimiento) { raiz.classList.add("has-motion"); }

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ======================================================================
     1. CONTENIDO — con o sin movimiento
     ====================================================================== */

  (function menu() {
    var boton = $("#hamburguesa"), nav = $("#nav");
    if (!boton || !nav) { return; }
    function cerrar() {
      boton.setAttribute("aria-expanded", "false");
      boton.setAttribute("aria-label", "Abrir menú");
      nav.classList.remove("esta-abierto");
    }
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", abierto ? "false" : "true");
      boton.setAttribute("aria-label", abierto ? "Abrir menú" : "Cerrar menú");
      nav.classList.toggle("esta-abierto", !abierto);
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", cerrar); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("esta-abierto")) { cerrar(); boton.focus(); }
    });
  })();

  (function cookies() {
    var banner = $("#cookie-banner"), ok = $("#cookie-ok");
    if (!banner || !ok) { return; }
    var CLAVE = "chinagraph-cookies";
    var aceptado = false;
    try { aceptado = localStorage.getItem(CLAVE) === "1"; } catch (e) {}
    if (!aceptado) { banner.hidden = false; }
    ok.addEventListener("click", function () {
      banner.hidden = true;
      try { localStorage.setItem(CLAVE, "1"); } catch (e) {}
    });
  })();

  (function mapa() {
    var boton = $("#mapa-boton"), caja = $("#mapa");
    if (!boton || !caja) { return; }
    boton.addEventListener("click", function () {
      var marco = document.createElement("iframe");
      /* la ciudad, nunca un portal concreto: la dirección es inventada */
      marco.src = "https://www.google.com/maps?q=Vigo+Pontevedra&output=embed";
      marco.title = "Mapa de Vigo (la dirección del plató es ficticia)";
      marco.loading = "lazy";
      marco.referrerPolicy = "no-referrer-when-downgrade";
      marco.setAttribute("width", "600");
      marco.setAttribute("height", "320");
      caja.insertBefore(marco, boton.nextSibling);
      boton.remove();
    });
  })();

  (function formulario() {
    var form = $("#formulario"), salida = $("#formulario-respuesta");
    if (!form || !salida) { return; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nombre = $("#f-nombre").value.trim();
      var correo = $("#f-correo").value.trim();
      if (!nombre || !correo || !$("#f-ok").checked) {
        salida.textContent = "Faltan el nombre, el correo o el aviso legal.";
        return;
      }
      salida.textContent = "Demostración: no se envía nada. Te escribiríamos, " + nombre + ".";
      form.reset();
    });
  })();

  /* --- 1.1 La cuenta de fotogramas marcados -------------------------------
     Es contenido: sale del propio DOM, así que no se puede desincronizar de
     lo que se ve. */
  (function cuentaFotogramas() {
    var pie = $("#hoja-pie");
    var frames = $$(".frame");
    if (!pie || !frames.length) { return; }
    var elegidos = frames.filter(function (f) { return f.classList.contains("es-elegido"); }).length;
    pie.textContent = elegidos + " de " + frames.length +
      " fotogramas marcados · los marcados son los que se revelan";
  })();

  /* --- 1.2 Las fichas se pueden recorrer con el teclado --------------------
     Cada fotograma es un bloque con su ficha; dándole foco se puede leer con
     el teclado y se resalta igual que al pasar el ratón. */
  (function fotogramasFocalizables() {
    $$(".frame").forEach(function (f) {
      f.tabIndex = 0;
      var num = $(".frame-num", f);
      var toma = $(".frame-ficha dd", f);
      if (num && toma) {
        f.setAttribute("aria-label", "Fotograma " + num.textContent.trim() + ", " +
          toma.textContent.trim() + (f.classList.contains("es-elegido") ? ", marcado" : ""));
      }
    });
  })();

  /* ======================================================================
     2. MOVIMIENTO
     ====================================================================== */
  if (!movimiento) { return; }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;

  var lenis = null;
  if (window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.16, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var destino = document.querySelector(a.getAttribute("href"));
        if (!destino) { return; }
        e.preventDefault();
        lenis.scrollTo(destino, { offset: -80 });
      });
    });
  }

  /* Un ScrollTrigger con `once` no dispara si el elemento ya está en pantalla
     al crearse: lo de una sola vez, con IntersectionObserver. */
  function alEntrar(el, hacer, margen) {
    if (!("IntersectionObserver" in window)) { hacer(); return; }
    var io = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); hacer(); } });
    }, { rootMargin: margen || "0px 0px -8% 0px", threshold: 0.04 });
    io.observe(el);
  }

  function titulares() {
    $$("[data-revelar]").forEach(function (el) {
      var texto = (el.textContent || "").replace(/\s+/g, " ").trim();
      el.setAttribute("aria-label", texto);
      el.textContent = "";
      var frag = document.createDocumentFragment();
      var partes = [];
      texto.split(" ").forEach(function (palabra) {
        var caja = document.createElement("span");
        caja.className = "palabra";
        caja.setAttribute("aria-hidden", "true");
        var dentro = document.createElement("i");
        dentro.textContent = palabra;
        caja.appendChild(dentro);
        frag.appendChild(caja);
        frag.appendChild(document.createTextNode(" "));
        partes.push(dentro);
      });
      el.appendChild(frag);
      /* y:0 explícito: GSAP lee el translate3d del CSS como `y` en píxeles */
      gsap.set(partes, { y: 0, yPercent: 112 });
      alEntrar(el, function () {
        gsap.to(partes, { yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.045 });
      });
    });
  }

  function apariciones() {
    $$("[data-aparecer]").forEach(function (el, i) {
      alEntrar(el, function () {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: (i % 4) * 0.07 });
      });
    });
  }

  function franja() {
    var pista = $("#franja-pista");
    if (!pista) { return; }
    var bucle = gsap.to(pista, { xPercent: -50, duration: 24, ease: "none", repeat: -1 });
    var vuelta;
    ScrollTrigger.create({
      onUpdate: function (self) {
        bucle.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 700, 5));
        clearTimeout(vuelta);
        vuelta = setTimeout(function () { gsap.to(bucle, { timeScale: 1, duration: 0.8 }); }, 140);
      }
    });
  }

  /* --- EL LÁPIZ ROJO: la marca se dibuja sobre el fotograma elegido --------
     Es el recurso protagonista y es el trabajo del oficio: elegir la toma.
     Cada marca se traza cuando su fotograma entra en pantalla, no con un
     anclaje, para que la hoja se lea como una hoja y no como una diapositiva. */
  function marcasDeLapiz() {
    var marcas = $$(".frame-marca path");
    if (!marcas.length) { return; }
    marcas.forEach(function (p) {
      if (!p.getTotalLength) { return; }
      var largo = Math.ceil(p.getTotalLength());
      p.style.setProperty("--largo", largo);
      gsap.set(p, { strokeDasharray: largo, strokeDashoffset: largo });
      var frame = p.closest(".frame") || p;
      alEntrar(frame, function () {
        gsap.to(p, {
          strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut",
          delay: 0.1 + Math.random() * 0.25
        });
      }, "0px 0px -12% 0px");
    });
  }

  /* --- El visor del hero va cambiando de ficha ------------------------------ */
  function visor() {
    var salida = $("#visor-datos");
    if (!salida) { return; }
    var fichas = [
      "35 mm · f/2 · 1/125 · ISO 400",
      "85 mm · f/1,8 · 1/250 · ISO 200",
      "100 mm macro · f/11 · 1/160 · ISO 100",
      "24 mm · f/8 · 1/15 · ISO 100 · trípode",
      "50 mm · f/1,8 · 1/80 · ISO 3200"
    ];
    var i = 0;
    setInterval(function () {
      i = (i + 1) % fichas.length;
      gsap.to(salida, {
        opacity: 0, duration: 0.25, onComplete: function () {
          salida.textContent = fichas[i];
          gsap.to(salida, { opacity: 1, duration: 0.25 });
        }
      });
    }, 3200);
  }

  function contadores() {
    $$(".contador").forEach(function (el) {
      var hasta = parseFloat(el.dataset.hasta || el.textContent) || 0;
      var estado = { v: 0 };
      el.textContent = "0";
      alEntrar(el, function () {
        gsap.to(estado, {
          v: hasta, duration: 1.3, ease: "power2.out",
          onUpdate: function () { el.textContent = Math.round(estado.v); }
        });
      });
    });
  }

  function imanes() {
    if (!window.matchMedia("(hover:hover)").matches) { return; }
    $$("[data-iman]").forEach(function (el) {
      var aX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      var aY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      el.addEventListener("mousemove", function (e) {
        var c = el.getBoundingClientRect();
        aX((e.clientX - (c.left + c.width / 2)) * 0.3);
        aY((e.clientY - (c.top + c.height / 2)) * 0.42);
      });
      el.addEventListener("mouseleave", function () { aX(0); aY(0); });
    });
  }

  function cursor() {
    var caja = $("#cursor"), texto = $("#cursor-texto");
    if (!caja || !window.matchMedia("(hover:hover)").matches) { return; }
    var aX = gsap.quickTo(caja, "x", { duration: 0.2, ease: "power3.out" });
    var aY = gsap.quickTo(caja, "y", { duration: 0.2, ease: "power3.out" });
    window.addEventListener("mousemove", function (e) { aX(e.clientX); aY(e.clientY); }, { passive: true });

    [
      { sel: ".frame", txt: "fotograma" },
      { sel: ".sesion", txt: "sesión" },
      { sel: ".esquema", txt: "el plató" },
      { sel: ".tabla tbody tr", txt: "tarifa" }
    ].forEach(function (g) {
      $$(g.sel).forEach(function (el) {
        el.addEventListener("mouseenter", function () { caja.classList.add("es-grande"); texto.textContent = g.txt; });
        el.addEventListener("mouseleave", function () { caja.classList.remove("es-grande"); texto.textContent = ""; });
      });
    });
    $$("a, button").forEach(function (el) {
      el.addEventListener("mouseenter", function () { caja.classList.add("es-grande"); });
      el.addEventListener("mouseleave", function () { caja.classList.remove("es-grande"); });
    });
  }

  function arrancar() {
    titulares();
    apariciones();
    franja();
    marcasDeLapiz();
    visor();
    contadores();
    imanes();
    cursor();
    ScrollTrigger.refresh();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(arrancar);
  } else {
    window.addEventListener("load", arrancar);
  }

  if (mqReducido.addEventListener) {
    mqReducido.addEventListener("change", function () { window.location.reload(); });
  }
})();
