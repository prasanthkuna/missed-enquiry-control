(function () {
  "use strict";

  var WHATSAPP = "919008393030";
  var SITE = {
    whatsapp: WHATSAPP,
    base: ""
  };

  /* ——— Mobile nav ——— */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.hidden = !open;
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ——— Audit form → WhatsApp ——— */
  document.querySelectorAll("[data-audit-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var phoneEl = form.querySelector("[name='phone']");
      var clinicEl = form.querySelector("[name='clinic']");
      var phone = (phoneEl && phoneEl.value ? phoneEl.value : "").replace(/\D/g, "");
      var clinic = clinicEl && clinicEl.value ? clinicEl.value.trim() : "";
      if (!phone || !clinic) return;

      var message =
        "Hi — I'd like the free 7-day WhatsApp leakage audit for my derma clinic.\n\n" +
        "Clinic: " + clinic + "\n" +
        "My WhatsApp: +" + phone;

      window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  /* ——— Sticky nav + mobile CTA bar ——— */
  var header = document.querySelector(".top-nav-on-dark");
  var stickyCta = document.getElementById("sticky-cta");
  var hero = document.querySelector(".hero-band-cinema, .page-hero-compact");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;

    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }

    if (stickyCta && hero) {
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      stickyCta.classList.toggle("is-visible", y > heroBottom - 80);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ——— Scroll reveal ——— */
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reducedMotion) {
    var revealEls = document.querySelectorAll("[data-reveal]");
    if (revealEls.length && "IntersectionObserver" in window) {
      var revealObs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObs.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        revealObs.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ——— Stat counters ——— */
  function animateCount(el, target, duration) {
    var start = 0;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll("[data-count-to]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count-to"), 10);
    if (isNaN(target)) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      el.textContent = target;
      return;
    }

    var counted = false;
    var counterObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            animateCount(el, target, 1200);
            counterObs.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObs.observe(el);
  });

  /* ——— Carousels ——— */
  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var track = root.querySelector(".carousel-track");
    var slides = root.querySelectorAll(".carousel-slide");
    var dotsWrap = root.querySelector(".carousel-dots");
    var prevBtn = root.querySelector("[data-carousel-prev]");
    var nextBtn = root.querySelector("[data-carousel-next]");
    if (!track || !slides.length) return;

    var index = 0;

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      var slide = slides[index];
      track.scrollTo({ left: slide.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
      updateDots();
    }

    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.querySelectorAll("button").forEach(function (btn, i) {
        btn.classList.toggle("is-active", i === index);
        btn.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-label", "Slide " + (i + 1));
        btn.addEventListener("click", function () {
          goTo(i);
        });
        dotsWrap.appendChild(btn);
      });
      updateDots();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); });

    track.addEventListener(
      "scroll",
      function () {
        var closest = 0;
        var minDist = Infinity;
        slides.forEach(function (slide, i) {
          var dist = Math.abs(track.scrollLeft - slide.offsetLeft);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        if (closest !== index) {
          index = closest;
          updateDots();
        }
      },
      { passive: true }
    );
  });

  /* ——— Parallax on cinematic bands ——— */
  if (!reducedMotion) {
    var parallaxBands = document.querySelectorAll(".band-cinema-wide[data-parallax]");
    if (parallaxBands.length) {
      function parallaxTick() {
        var vh = window.innerHeight;
        parallaxBands.forEach(function (band) {
          var img = band.querySelector("img");
          if (!img) return;
          var rect = band.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > vh) return;
          var center = (rect.top + rect.height * 0.5 - vh * 0.5) / vh;
          img.style.transform = "translate3d(0, " + (center * 18).toFixed(1) + "px, 0)";
        });
      }
      window.addEventListener("scroll", parallaxTick, { passive: true });
      parallaxTick();
    }
  }
})();
