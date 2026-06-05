import { API_URL } from "./config.js";

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

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-msg");

  errorMsg.textContent = "";

  try {
    const res = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: await JSON.stringify({ username, password }),
    });
    const data = await res.json();

    console.log(data);
    if (!res.ok) {
      errorMsg.textContent = data.message || "Login failed";
      return;
    }

    localStorage.setItem("adminToken", data.token);

    window.location.href = "admin.html";
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Server error";
  }
});
