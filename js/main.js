(function () {
  "use strict";

  /* Mobile navigation */
  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      if (isOpen) {
        mobileNav.setAttribute("hidden", "");
      } else {
        mobileNav.removeAttribute("hidden");
      }
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
        toggle.focus();
      }
    });
  }

  /* Load Google Maps only after explicit click (privacy) */
  var mapButton = document.querySelector("[data-map-load]");
  if (mapButton) {
    mapButton.addEventListener("click", function () {
      var panel = document.getElementById("map-frame");
      if (!panel) return;
      var src = mapButton.getAttribute("data-map-src");
      var iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = "Google Maps: Standort von Honeymoon Wimpernverlängerung";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.setAttribute("allowfullscreen", "");
      panel.innerHTML = "";
      panel.appendChild(iframe);
      mapButton.remove();
    });
  }

  /* Result video autoplays natively; pause it off-screen, and respect reduced motion */
  var galleryVideo = document.querySelector(".gallery-video");
  if (galleryVideo) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      galleryVideo.removeAttribute("autoplay");
      galleryVideo.pause();
      galleryVideo.setAttribute("controls", "");
      galleryVideo.setAttribute("preload", "metadata");
    } else if ("IntersectionObserver" in window) {
      var videoObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.play().catch(function () {});
            } else {
              entry.target.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      videoObserver.observe(galleryVideo);
    }
  }
})();
