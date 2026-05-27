document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1. Mobile Menu Logic
  // =========================
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // =========================
  // 2. Contact Form
  // =========================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      alert(
        "Thank you! Your message has been sent to our laboratory operations office.",
      );

      contactForm.reset();
    });
  }

  // =========================
  // 3. Load Products
  // =========================
  async function displayProducts() {
    console.log("Loading product data...");

    const grid = document.getElementById("product-grid");

    if (!grid) {
      console.error("No product grid found.");
      return;
    }

    try {
      // IMPORTANT:
      // Adjust path depending on your folder structure
      const response = await fetch("./fakeDatabase.json");

      if (!response.ok) {
        throw new Error("Failed to fetch JSON file.");
      }

      const fullProductsList = await response.json();
      const productsList = fullProductsList.slice(0, 4); // Limit to first 4 items
      

      console.log(productsList);

      // Clear existing content
      grid.innerHTML = "";

      // Generate cards
      productsList.forEach((item) => {
        const containerBox = document.createElement("article");

        containerBox.className = "product-card";

        containerBox.innerHTML = `
          <h3 class="product-name">${item.name}</h3>

          <div class="product-purity">
            ${item.purity}
          </div>

          <p class="product-description">
            ${item.description}
          </p>

          <div class="product-price">
            ${item.price}
          </div>

          <a 
            href="#" 
            class="btn btn-outline"
            style="
              width: 100%;
              height: 40px;
              font-size: 0.75rem;
            "
          >
            View Lab Report
          </a>
        `;

        grid.appendChild(containerBox);
      });
    } catch (error) {
      console.error("Error loading products:", error);

      grid.innerHTML = `
        <p style="
          color: #cbd5e1;
          text-align: center;
          grid-column: 1 / -1;
          padding: 20px;
        ">
          Unable to load compound profiles.
        </p>
      `;
    }
  }

  displayProducts();
});
