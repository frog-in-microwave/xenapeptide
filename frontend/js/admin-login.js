document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     DRAWER LOGIC (MOBILE NAV)
     ========================================= */

  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");
  const navOverlay = document.getElementById("nav-overlay");
  const navItems = document.querySelectorAll("#nav-links a");

  const ICON_OPEN = `
    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="3" y1="6"  x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`;

  const ICON_CLOSE = `
    <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;

  function openDrawer() {
    navLinks?.classList.add("active");
    navOverlay?.classList.add("active");
    if (hamburger) {
      hamburger.innerHTML = ICON_CLOSE;
      hamburger.setAttribute("aria-expanded", "true");
    }
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    navLinks?.classList.remove("active");
    navOverlay?.classList.remove("active");
    if (hamburger) {
      hamburger.innerHTML = ICON_OPEN;
      hamburger.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  }

  if (hamburger && navLinks && navOverlay) {
    hamburger.innerHTML = ICON_OPEN;

    hamburger.addEventListener("click", () => {
      navLinks.classList.contains("active") ? closeDrawer() : openDrawer();
    });

    navOverlay.addEventListener("click", closeDrawer);

    navItems.forEach((item) => item.addEventListener("click", closeDrawer));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  /* =========================================
     LOGIN FORM
     ========================================= */

  const form = document.getElementById("login-form");
  const errorMsg = document.getElementById("error-msg");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!username || !password) {
      if (errorMsg) errorMsg.textContent = "Please fill all fields";
      return;
    }

    if (errorMsg) errorMsg.textContent = "";

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      console.log("Login response:", data);

      if (!res.ok) {
        if (errorMsg) {
          errorMsg.textContent = data.message || "Login failed";
        }
        return;
      }

      localStorage.setItem("adminToken", data.token);

      window.location.href = "admin.html";
    } catch (err) {
      console.error("Login error:", err);
      if (errorMsg) errorMsg.textContent = "Server error";
    }
  });
});
