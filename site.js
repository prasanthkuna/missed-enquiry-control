(function () {
  "use strict";

  var WHATSAPP = "919008393030";

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

  document.querySelectorAll("[data-audit-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var phoneEl = form.querySelector("[name='phone']");
      var clinicEl = form.querySelector("[name='clinic']");
      var phone = (phoneEl && phoneEl.value ? phoneEl.value : "").replace(/\D/g, "");
      var clinic = clinicEl && clinicEl.value ? clinicEl.value.trim() : "";
      if (!phone || !clinic) return;

      var message =
        "Hi — I'd like the free 7-day leakage audit for my clinic.\n\n" +
        "Clinic: " + clinic + "\n" +
        "Clinic WhatsApp: +" + phone + "\n\n" +
        "Interested in missed calls + WhatsApp recovery.";

      window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message),
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  var header = document.getElementById("site-header");
  var stickyCta = document.getElementById("sticky-cta");
  var hero = document.querySelector(".hero");

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (stickyCta && hero) {
      var heroBottom = hero.offsetTop + hero.offsetHeight;
      stickyCta.classList.toggle("is-visible", y > heroBottom - 80);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ——— Hero intro sequence ——— */
  function runHeroIntro() {
    var rows = document.querySelectorAll("[data-hero-row]");
    var progress = document.getElementById("hero-progress");
    var progressFill = document.getElementById("hero-progress-fill");
    var ctas = document.getElementById("hero-ctas");
    var alertRow = document.querySelector("[data-hero-alert]");

    if (reducedMotion) {
      rows.forEach(function (r) { r.classList.add("is-visible"); });
      if (progress) progress.classList.add("is-visible");
      if (progressFill) progressFill.classList.add("is-visible");
      if (ctas) ctas.classList.add("is-visible");
      return;
    }

    rows.forEach(function (row, i) {
      window.setTimeout(function () {
        row.classList.add("is-visible");
        if (row === alertRow) row.classList.add("is-pulse");
      }, 400 + i * 180);
    });

    window.setTimeout(function () {
      if (progress) progress.classList.add("is-visible");
      if (progressFill) progressFill.classList.add("is-visible");
    }, 400 + rows.length * 180 + 200);

    window.setTimeout(function () {
      if (ctas) ctas.classList.add("is-visible");
    }, 400 + rows.length * 180 + 500);
  }

  if (document.querySelector("[data-hero-row]")) {
    runHeroIntro();
  }

  /* ——— Scroll reveal ——— */
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
        { rootMargin: "0px 0px -5% 0px", threshold: 0.08 }
      );
      revealEls.forEach(function (el) { revealObs.observe(el); });

      window.requestAnimationFrame(function () {
        revealEls.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
            el.classList.add("is-visible");
            revealObs.unobserve(el);
          }
        });
      });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }

    window.setTimeout(function () {
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 2500);
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

  function initCounters() {
    document.querySelectorAll("[data-count-to]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count-to"), 10);
      if (isNaN(target)) return;
      if (reducedMotion || !("IntersectionObserver" in window)) {
        el.textContent = target;
        return;
      }
      if (el.dataset.countStarted === "1") return;
      el.dataset.countStarted = "1";
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
  }

  initCounters();
  document.addEventListener("clinic:hydrated", initCounters);

  /* ——— Chapter nav scroll spy ——— */
  var chapterNav = document.querySelector("[data-chapter-nav]");
  if (chapterNav && "IntersectionObserver" in window) {
    var chapterLinks = chapterNav.querySelectorAll("[data-chapter-link]");
    var chapterIds = [];
    chapterLinks.forEach(function (link) {
      var id = (link.getAttribute("href") || "").replace("#", "");
      if (id) chapterIds.push(id);
    });

    var chapterObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            chapterLinks.forEach(function (link) {
              var active = (link.getAttribute("href") || "") === "#" + id;
              link.classList.toggle("is-active", active);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );

    chapterIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) chapterObs.observe(el);
    });
  }

  /* ——— SLA timer tick (inbox demo) ——— */
  if (!reducedMotion) {
    document.querySelectorAll("[data-sla-timer]").forEach(function (el) {
      var mins = 14;
      window.setInterval(function () {
        mins += 1;
        if (mins >= 15) {
          el.textContent = "15m SLA";
          el.classList.add("is-due");
        } else {
          el.textContent = mins + "m";
        }
      }, 8000);
    });
  }
})();
