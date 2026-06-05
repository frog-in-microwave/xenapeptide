import {API_URL}  from "./config.js";

const actionButtons = document.querySelectorAll(".admin-action-btn");
const panels = document.querySelectorAll(".admin-panel");

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
});

/* =========================================
   Panel Switching
   ========================================= */

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    actionButtons.forEach((btn) => btn.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    button.classList.add("active");

    document.getElementById(button.dataset.target).classList.add("active");
  });
});

/* =========================================
   Add Product
   ========================================= */

document
  .getElementById("add-product-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageFile = document.getElementById("add-image").files[0];

    const formData = new FormData();

    formData.append("name", document.getElementById("add-name").value.trim());

    formData.append(
      "description",
      document.getElementById("add-description").value.trim(),
    );

    formData.append("price", document.getElementById("add-price").value.trim());

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        `${API_URL}/admin/add-product`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add product.");
        return;
      }
      alert("Product added successfully.");

      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to add product.");
    }
  });

/* =========================================
   Remove Product
   ========================================= */

document
  .getElementById("remove-product-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("remove-name").value.trim();

    try {
      console.log("Attempting to remove product:", name);
      const response = await fetch(
        `${API_URL}/admin/remove-product`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ name }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Failed to remove product.");
        return;
      }

      alert("Product removed successfully.");

      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to remove product.");
    }
  });

/* =========================================
   Edit Product
   ========================================= */

document
  .getElementById("edit-product-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageFile = document.getElementById("edit-image").files[0];

    const formData = new FormData();

    formData.append(
      "productName",
      document.getElementById("edit-search-name").value.trim(),
    );

    formData.append(
      "newName",
      document.getElementById("edit-name").value.trim(),
    );

    formData.append(
      "newDescription",
      document.getElementById("edit-description").value.trim(),
    );

    formData.append(
      "newPrice",
      document.getElementById("edit-price").value.trim(),
    );

    if (imageFile) {
      formData.append("newImage", imageFile);
    }

    try {
      const response = await fetch(
        `${API_URL}/admin/edit-product`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      console.log("Edit Product Response:", data);

      alert("Product updated successfully.");

      // e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  });
