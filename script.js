const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenu) {
  const menuSummary = mobileMenu.querySelector("summary");
  const mobileBreakpoint = window.matchMedia("(max-width: 700px)");

  // Close the menu and move focus to the selected section.
  mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) return;

      event.preventDefault();
      mobileMenu.open = false;

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });

      target.addEventListener(
        "blur",
        () => target.removeAttribute("tabindex"),
        { once: true }
      );
    });
  });

  // Close when clicking elsewhere.
  document.addEventListener("click", (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) {
      mobileMenu.open = false;
    }
  });

  // Escape closes the menu and returns focus to its control.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.open) {
      mobileMenu.open = false;
      menuSummary.focus();
    }
  });

  // Clear the mobile menu state when switching to desktop.
  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
      mobileMenu.open = false;
    }
  });
}