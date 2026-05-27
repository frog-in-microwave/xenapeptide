document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Open/Close Logic
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // 2. Contact Form Interception
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

  // 3. Static English Data Source Array
  const researchProducts = [
    {
      id: "bpc-157",
      name: "BPC-157",
      purity: "99.9% Purity | Synthesized in Germany",
      description:
        "High-grade stable gastric pentadecapeptide sequence verified via HPLC testing for premium analytical research execution.",
      price: "€49.00",
    },
    {
      id: "tb-500",
      name: "TB-500",
      purity: "99.8% Purity | Synthesized in Germany",
      description:
        "Lyophilized sterile research compound of Thymosin Beta-4 sequence engineered for cellular research models.",
      price: "€59.00",
    },
    {
      id: "semaglutide",
      name: "Semaglutide",
      purity: "99.9% Purity | Synthesized in Germany",
      description:
        "High-specification Glucagon-Like Peptide-1 receptor agonist purified for advanced metabolic structural validation assays.",
      price: "€89.00",
    },
  ];

  // 4. Render Layout Cards
  function displayProducts() {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    grid.innerHTML = "";

    researchProducts.forEach((item) => {
      const containerBox = document.createElement("article");
      containerBox.className = "product-card";

      containerBox.innerHTML = `
                <h3 class="product-name">${item.name}</h3>
                <div class="product-purity">${item.purity}</div>
                <p class="product-description">${item.description}</p>
                <div class="product-price">${item.price}</div>
                <a href="#" class="btn btn-outline" style="width: 100%; height: 40px; font-size: 0.75rem;">
                    View Lab Report
                </a>
            `;
      grid.appendChild(containerBox);
    });
  }

  displayProducts();
});
