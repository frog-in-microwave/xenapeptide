import { openModal } from "./modal.js";
import "./modal.js";

// =========================================
// Fetch single product by ID
// =========================================
async function fetchProduct(id) {
  const response = await fetch("./fakeDatabase.json");
  // When backend is ready, replace with: fetch(`/api/products/${id}`)
  if (!response.ok) throw new Error("Failed to fetch product.");
  const products = await response.json();
  return products.find((p) => p.id === id) ?? null;
}

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
  // 2. Read ID from URL
  // =========================================
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const container = document.getElementById("product-detail-container");

  if (!id) {
    window.location.href = "shop.html";
    return;
  }

  // =========================================
  // 3. Fetch & Render Product
  // =========================================
  try {
    const product = await fetchProduct(id);

    if (!product) {
      container.innerHTML = `
        <div class="detail-not-found">
          <p>Product not found.</p>
          <a href="shop.html" class="btn btn-primary">Back to Shop</a>
        </div>`;
      return;
    }

    // Update page title & meta for SEO — makes shared URLs meaningful
    document.title = `${product.name} | XenaPeptides`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", product.description.slice(0, 155));

    container.innerHTML = `
      <div class="detail-grid">

        <div class="detail-image-wrapper">
          <img
            src="${product.image}"
            alt="${product.name} Research Peptide"
            class="detail-image"
            loading="eager"
          >
        </div>

        <div class="detail-info">

          <p class="detail-eyebrow">Research Compound</p>
          <h1 class="detail-name">${product.name}</h1>
          <p class="detail-price">${product.price}</p>

          <button class="btn btn-primary detail-purchase-btn">
            Purchase
          </button>

          <div class="detail-divider"></div>

          <div class="detail-description">${product.description.replace(/\n/g, "<br>")}</div>

          <a href="contact.html" class="btn btn-outline detail-contact-btn">
            Ask Us a Question
          </a>

        </div>

      </div>
    `;

    container
      .querySelector(".detail-purchase-btn")
      .addEventListener("click", openModal);
  } catch (error) {
    console.error("Error loading product:", error);
    container.innerHTML = `
      <div class="detail-not-found">
        <p>Unable to load product details.</p>
        <a href="shop.html" class="btn btn-primary">Back to Shop</a>
      </div>`;
  }
});
