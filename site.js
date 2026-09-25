(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".menu-btn").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      var parent = btn.parentElement;
      var expanded = parent.classList.contains("open");
      document.querySelectorAll(".dropdown.open").forEach(function (item) {
        item.classList.remove("open");
        var control = item.querySelector(".menu-btn");
        if (control) control.setAttribute("aria-expanded", "false");
      });
      if (!expanded) {
        parent.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".dropdown.open").forEach(function (item) {
      item.classList.remove("open");
      var control = item.querySelector(".menu-btn");
      if (control) control.setAttribute("aria-expanded", "false");
    });
  });

  var form = document.querySelector("form[data-contact]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var note = form.querySelector(".note");
      if (note) note.hidden = false;
      form.reset();
    });
  }
})();
