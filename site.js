(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (path === "" || path === "/") path = "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) {
      a.setAttribute("aria-current", "page");
      a.classList.add("is-active");
    }
  });

  if (new URLSearchParams(location.search).get("sent") === "1") {
    var note = document.querySelector(".note");
    if (note) {
      note.hidden = false;
      note.textContent = "Thanks — your message was sent.";
    }
  }
})();
