async function displayProducts() {
  const grid = document.getElementById("product-grid");

  if (!grid) return;

  try {
    const response = await fetch("./fakeDatabase.json");

    if (!response.ok) {
      throw new Error("Failed to fetch product data.");
    }

    const fullProductsList = await response.json();

    const productsList = fullProductsList.slice(0, 4);

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

export default displayProducts;