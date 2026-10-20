(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var closeBtn = document.querySelector("[data-nav-close]");
  var overlay = document.querySelector("[data-overlay]");

  function setOpen(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function wide() {
    return window.matchMedia("(min-width: 1101px)").matches;
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });
  }
  document.querySelectorAll(".side-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!wide()) setOpen(false);
    });
  });
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      if (wide()) document.body.classList.add("sidebar-collapsed");
      else setOpen(false);
    });
  }
  if (overlay) overlay.addEventListener("click", function () { setOpen(false); });

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy") || "";
      var previous = btn.textContent;
      function done(label) {
        btn.textContent = label;
        setTimeout(function () { btn.textContent = previous; }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done("Copied"); }).catch(function () { done(value); });
      } else {
        done(value);
      }
    });
  });

  var section = document.querySelector(".top-games-section");
  var track = section && section.querySelector(".games-swiper");
  var prev = section && section.querySelector("[data-games-prev]");
  var next = section && section.querySelector("[data-games-next]");

  if (typeof Swiper !== "undefined" && track) {
    var swiper = new Swiper(track, {
      slidesPerView: 2.4,
      spaceBetween: 10,
      slidesPerGroup: 1,
      watchOverflow: false,
      breakpoints: {
        600: { slidesPerView: 4.2, spaceBetween: 12 },
        900: { slidesPerView: 5.5, spaceBetween: 12 },
        1100: { slidesPerView: 6.5, spaceBetween: 12 },
      },
    });

    function syncNav() {
      if (prev) prev.disabled = swiper.isBeginning;
      if (next) next.disabled = swiper.isEnd;
    }

    if (prev) {
      prev.addEventListener("click", function () {
        swiper.slidePrev();
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        swiper.slideNext();
      });
    }

    swiper.on("slideChange", syncNav);
    swiper.on("reachBeginning", syncNav);
    swiper.on("reachEnd", syncNav);
    swiper.on("fromEdge", syncNav);
    swiper.on("resize", syncNav);
    syncNav();
  }
})();
