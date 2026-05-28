import { getProducts, renderProducts } from "./fetchProducts.js";
import "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {
  // =========================================
  // 1. Mobile Drawer
  // =========================================
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("nav-overlay");

  const ICON_OPEN = `
    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="3" y1="6"  x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`;

  const ICON_CLOSE = `
    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6"  y1="6" x2="18" y2="18"></line>
    </svg>`;

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

  if (hamburger && navLinks && overlay) {
    hamburger.innerHTML = ICON_OPEN;
    hamburger.addEventListener("click", () =>
      navLinks.classList.contains("active") ? closeDrawer() : openDrawer(),
    );
    overlay.addEventListener("click", closeDrawer);
    navLinks
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeDrawer));
  }

  // =========================================
  // 2. Load All Products (single fetch)
  // =========================================
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search-input");
  let allProducts = [];

  if (grid) {
    try {
      allProducts = await getProducts();
      renderProducts(allProducts, grid);
    } catch (error) {
      console.error("Error loading products:", error);
      grid.innerHTML = `
        <p style="color:#cbd5e1; text-align:center; grid-column:1/-1; padding:20px;">
          Unable to load compound profiles.
        </p>`;
    }
  }

  // =========================================
  // 3. Search & Filter (no extra fetch)
  // =========================================
  if (searchInput && grid) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      const filtered = allProducts.filter((item) =>
        item.name.toLowerCase().includes(query),
      );

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state">
            No compounds match "${e.target.value}".
          </div>`;
        return;
      }

      renderProducts(filtered, grid);
    });
  }
});
