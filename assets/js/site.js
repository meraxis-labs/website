(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
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
