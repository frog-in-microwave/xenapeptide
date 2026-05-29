import { openModal } from "./modal.js";

export async function getProducts() {
  const response = await fetch("./fakeDatabase.json");
  if (!response.ok) throw new Error("Failed to fetch product data.");
  return response.json();
}

export function renderProducts(products, grid) {
  grid.innerHTML = "";
  products.forEach((item) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.cursor = "pointer";
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img
          src="${item.image}"
          alt="${item.name} Research Peptide"
          class="product-image"
          loading="lazy"
        >
      </div>
      <h3 class="product-name">${item.name}</h3>
      <div class="product-price">${item.price}</div>
      <button
        class="btn btn-outline purchase-btn"
        style="width: 100%; height: 40px; font-size: 0.75rem;"
        aria-label="Purchase ${item.name}"
      >
        Purchase
      </button>
    `;

    // Purchase button opens modal — does NOT navigate
    card.querySelector(".purchase-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      openModal();
    });

    // Clicking anywhere else on the card navigates to product detail
    card.addEventListener("click", () => {
      window.location.href = `product-detail.html?id=${item.id}`;
    });

    grid.appendChild(card);
  });
}
