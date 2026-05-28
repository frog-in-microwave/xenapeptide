import fetchProducts from "./fetchProducts.js";




document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1. Mobile Drawer Menu
  // =========================
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("nav-overlay");

  function openDrawer() {
    navLinks.classList.add("active");
    overlay.classList.add("active");
    hamburger.textContent = "✕";
  }

  function closeDrawer() {
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.textContent = "☰";
  }

  if (hamburger && navLinks && overlay) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.contains("active") ? closeDrawer() : openDrawer();
    });

    overlay.addEventListener("click", closeDrawer);

    // Close drawer when a nav link is tapped
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });
  }

  // =========================
  // 2. Load Products
  // =========================
  

  fetchProducts();
});
