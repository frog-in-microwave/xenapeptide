// js/shop.js
import fetchProducts from "./fetchProducts.js";

document.addEventListener("DOMContentLoaded", async () => {
  // =========================================
  // 1. Navigation Panel Controls
  // =========================================
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("nav-overlay");

  function toggleDrawer() {
    const isActive = navLinks.classList.contains("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", !isActive);

    // Toggle between Hamburger and Close icon shapes
    if (!isActive) {
      hamburger.innerHTML = `
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      hamburger.innerHTML = `
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    }
  }

  if (hamburger && navLinks && overlay) {
    hamburger.addEventListener("click", toggleDrawer);
    overlay.addEventListener("click", toggleDrawer);
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) toggleDrawer();
      });
    });
  }

  // =========================================
  // 2. Data Initialization & Caching
  // =========================================
  let masterProductList = [];
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search-input");

  try {
    // Cache the database internally for immediate parsing during search
    const response = await fetch("./fakeDatabase.json");
    if (response.ok) {
      masterProductList = await response.json();
    }

    // Utilize your provided rendering module for the initial build
    await fetchProducts(true);
  } catch (error) {
    console.error("Database resolution error:", error);
  }

  // =========================================
  // 3. Search & Filter Pipeline
  // =========================================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      // Clean and parse the input data
      const query = e.target.value.trim().toLowerCase();

      const filtered = masterProductList.filter((item) =>
        item.name.toLowerCase().includes(query),
      );

      // Wipe current grid
      grid.innerHTML = "";

      // Handle empty states gracefully
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state">
            No analytical records match "${e.target.value}". 
          </div>
        `;
        return;
      }

      // Re-render strictly parsed HTML content for filtered items
      filtered.forEach((item) => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-image-wrapper">
            <img src="${item.image}" alt="${item.name} Research Peptide" class="product-image" loading="lazy">
          </div>
          <h3 class="product-name">${item.name}</h3>
          <div class="product-price">${item.price}</div>
          <a href="product-detail.html?id=${item.id}" class="btn btn-outline" style="width: 100%; height: 40px; font-size: 0.75rem;">
            View Details
          </a>
        `;
        grid.appendChild(card);
      });
    });
  }
});
