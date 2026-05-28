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
  async function displayProducts() {
    const grid = document.getElementById("product-grid");

    if (!grid) return;

    try {
      const response = await fetch("./fakeDatabase.json");

      if (!response.ok) {
        throw new Error("Failed to fetch product data.");
      }

      const fullProductsList = await response.json();

      const productsList = fullProductsList.slice(0, 6);

      grid.innerHTML = "";

      productsList.forEach((item) => {
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
          <div class="product-image-wrapper">
            <img
              src="${item.image}"
              alt="${item.name} Research Peptide"
              class="product-image"
              loading="lazy"
            >
          </div>

          <h3 class="product-name">
            ${item.name}
          </h3>

          <div class="product-price">
            ${item.price}
          </div>

          <a
            href="product-detail.html?id=${item.id}"
            class="btn btn-outline"
            style="
              width: 100%;
              height: 40px;
              font-size: 0.75rem;
            "
          >
            View Details
          </a>
        `;

        grid.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading products:", error);

      grid.innerHTML = `
        <p
          style="
            color: #cbd5e1;
            text-align: center;
            grid-column: 1 / -1;
            padding: 20px;
          "
        >
          Unable to load compound profiles.
        </p>
      `;
    }
  }

  displayProducts();
});
