const actionButtons = document.querySelectorAll(".admin-action-btn");
const panels = document.querySelectorAll(".admin-panel");

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
        "http://localhost:5000/api/admin/add-product",
        {
          method: "POST",
          headers: {
            "authorization": `Bearer ${localStorage.getItem("adminToken")}`,
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
        "http://localhost:5000/api/admin/remove-product",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("adminToken")}`,
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
        "http://localhost:5000/api/admin/edit-product",
        {
          method: "PUT",
          headers: {
            "authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      console.log("Edit Product Response:", data);
      if (!response.ok) {
        alert(data.message || "Failed to update product.");
        return;
      }
      alert("Product updated successfully.");

      // e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to update product.");
    }
  });
