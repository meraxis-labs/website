(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) {
        document.querySelectorAll(".nav-dropdown.is-open").forEach(function (dropdown) {
          dropdown.classList.remove("is-open");
          var dropdownToggle = dropdown.querySelector(".nav-dropdown-toggle");
          if (dropdownToggle) dropdownToggle.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  function normalize(path) {
    var value = (path || "/").split("?")[0].split("#")[0].toLowerCase();
    value = value.replace(/\/index\.html$/, "");
    value = value.replace(/\/$/, "");
    return value || "/";
  }

  var current = normalize(location.pathname);
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = normalize(a.getAttribute("href") || "");
    var active = current === href || (href !== "/" && current.indexOf(href + "/") === 0);
    if (active) {
      a.setAttribute("aria-current", "page");
      a.classList.add("is-active");
    }
  });

  document.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
    var toggle = dropdown.querySelector(".nav-dropdown-toggle");
    var menu = dropdown.querySelector(".nav-dropdown-menu");
    if (!toggle || !menu) return;

    if (dropdown.querySelector("a.is-active")) {
      toggle.classList.add("is-active");
    }

    dropdown.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = !dropdown.classList.contains("is-open");
      document.querySelectorAll(".nav-dropdown.is-open").forEach(function (other) {
        if (other === dropdown) return;
        other.classList.remove("is-open");
        var otherToggle = other.querySelector(".nav-dropdown-toggle");
        if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
      });
      dropdown.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-dropdown.is-open").forEach(function (dropdown) {
      dropdown.classList.remove("is-open");
      var toggle = dropdown.querySelector(".nav-dropdown-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".nav-dropdown.is-open").forEach(function (dropdown) {
      dropdown.classList.remove("is-open");
      var toggle = dropdown.querySelector(".nav-dropdown-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  });

  var CONTACT_EMAIL = "hello@meraxislabs.com";
  var form = document.querySelector("form[data-contact]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = (form.elements.namedItem("name").value || "").trim();
      var email = (form.elements.namedItem("email").value || "").trim();
      var message = (form.elements.namedItem("message").value || "").trim();
      var subject = encodeURIComponent("Meraxis Labs — message from " + name);
      var body = encodeURIComponent(
        "From: " + name + " <" + email + ">\n\n" + message
      );
      window.location.href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
      var note = form.querySelector(".note");
      if (note) note.hidden = false;
    });
  }
})();
