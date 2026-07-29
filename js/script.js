document.addEventListener("DOMContentLoaded", function () {
  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var header = document.getElementById("header");
  var navToggle = document.getElementById("navToggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      header.classList.toggle("nav-open");
    });
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
      });
    });
  }

  // Menu tabs
  var tabs = document.querySelectorAll(".menu-tab");
  var panels = document.querySelectorAll(".menu-panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      var target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add("active");
    });
  });

  // Lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".js-lightbox-trigger").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var full = el.dataset.full;
      if (!full) return;
      lightboxImg.src = full;
      lightboxImg.alt = el.querySelector("img") ? el.querySelector("img").alt : "";
      lightbox.classList.add("active");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
});
