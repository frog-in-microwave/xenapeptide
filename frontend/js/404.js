const hamburger = document.getElementById("hamburger-btn");
const navLinks = document.getElementById("nav-links");
const overlay = document.getElementById("nav-overlay");

const ICON_OPEN = `
<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="3" y1="6" x2="21" y2="6"></line>
  <line x1="3" y1="12" x2="21" y2="12"></line>
  <line x1="3" y1="18" x2="21" y2="18"></line>
</svg>
`;

const ICON_CLOSE = `
<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
`;

function openDrawer() {
  navLinks.classList.add("active");
  overlay.classList.add("active");
  hamburger.innerHTML = ICON_CLOSE;
  hamburger.setAttribute("aria-expanded", "true");
}

function closeDrawer() {
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.innerHTML = ICON_OPEN;
  hamburger.setAttribute("aria-expanded", "false");
}

hamburger.innerHTML = ICON_OPEN;

hamburger.addEventListener("click", () => {
  navLinks.classList.contains("active") ? closeDrawer() : openDrawer();
});

overlay.addEventListener("click", closeDrawer);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});
