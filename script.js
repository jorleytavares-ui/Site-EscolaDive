(function () {
  var WA = "5562992938118";

  // Links do WhatsApp com mensagem pronta
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(a.getAttribute("data-wa"));
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Cabeçalho e menu mobile
  var header = document.getElementById("header");
  var burger = document.getElementById("burger");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  function setMenu(open) {
    header.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }
  burger.addEventListener("click", function () { setMenu(!header.classList.contains("open")); });
  document.querySelectorAll("#nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  // Revelar ao rolar
  var items = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 70 + "ms"; io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Lightbox da galeria
  var lb = document.getElementById("lightbox"), lbimg = document.getElementById("lbimg"), lbcap = document.getElementById("lbcap");
  document.querySelectorAll("#gallery button").forEach(function (b) {
    b.addEventListener("click", function () {
      var im = b.querySelector("img");
      lbimg.src = b.getAttribute("data-full"); lbimg.alt = im.alt; lbcap.textContent = im.alt;
      lb.classList.add("on"); document.body.style.overflow = "hidden";
    });
  });
  function closeLb() { lb.classList.remove("on"); document.body.style.overflow = ""; }
  lb.addEventListener("click", function (e) { if (e.target !== lbimg) closeLb(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
})();
