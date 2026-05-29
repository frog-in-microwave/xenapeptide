document.addEventListener("DOMContentLoaded", () => {
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
  // 2. Validation Rules
  // =========================================
  const VALIDATORS = {
    name: {
      el: () => document.getElementById("contact-name"),
      err: () => document.getElementById("error-name"),
      validate(val) {
        if (!val) return "Please enter your full name.";
        if (val.length < 2) return "Name must be at least 2 characters.";
        return null;
      },
    },
    email: {
      el: () => document.getElementById("contact-email"),
      err: () => document.getElementById("error-email"),
      validate(val) {
        if (!val) return "Please enter your email address.";
        // Standard email regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return "Please enter a valid email address (e.g. john@example.com).";
        return null;
      },
    },
    phone: {
      el: () => document.getElementById("contact-phone"),
      err: () => document.getElementById("error-phone"),
      validate(val) {
        if (!val) return null; // optional field
        // Allow: digits, spaces, +, -, (, ) only
        if (!/^[0-9+\-\s()]{6,20}$/.test(val))
          return "Phone number can only contain digits, spaces, +, -, ( and ).";
        return null;
      },
    },
    message: {
      el: () => document.getElementById("contact-message"),
      err: () => document.getElementById("error-message"),
      validate(val) {
        if (!val) return "Please enter a message before submitting.";
        if (val.length < 10)
          return "Message is too short. Please provide more detail.";
        return null;
      },
    },
  };

  function validateField(key) {
    const { el, err, validate } = VALIDATORS[key];
    const input = el();
    const errEl = err();
    const val = input.value.trim();
    const error = validate(val);

    if (error) {
      input.classList.add("invalid");
      errEl.textContent = error;
      return false;
    } else {
      input.classList.remove("invalid");
      errEl.textContent = "";
      return true;
    }
  }

  // Validate each field on blur so errors appear as the user moves on
  Object.keys(VALIDATORS).forEach((key) => {
    VALIDATORS[key].el().addEventListener("blur", () => validateField(key));
    // Clear error as soon as the user starts correcting the field
    VALIDATORS[key].el().addEventListener("input", () => {
      if (VALIDATORS[key].el().classList.contains("invalid")) {
        validateField(key);
      }
    });
  });

  // =========================================
  // 3. Form Submit
  // =========================================
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Run all validators and stop if any fail
      const allValid = Object.keys(VALIDATORS)
        .map((key) => validateField(key))
        .every(Boolean);

      if (!allValid) return;

      const submitBtn = form.querySelector(".contact-submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      status.className = "form-status";
      status.textContent = "";

      const payload = {
        name: document.getElementById("contact-name").value.trim(),
        email: document.getElementById("contact-email").value.trim(),
        phone: document.getElementById("contact-phone").value.trim(),
        message: document.getElementById("contact-message").value.trim(),
      };

      try {
        // When backend is ready, replace with:
        // const res = await fetch("/api/contact", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(payload),
        // });
        // if (!res.ok) throw new Error("Server error");

        // Placeholder until backend is built
        await new Promise((resolve) => setTimeout(resolve, 800));

        status.textContent = "Message sent! We will get back to you shortly.";
        status.className = "form-status success";
        form.reset();
        // Clear any leftover invalid states after reset
        Object.keys(VALIDATORS).forEach((key) => {
          VALIDATORS[key].el().classList.remove("invalid");
          VALIDATORS[key].err().textContent = "";
        });
      } catch (error) {
        status.textContent =
          "Something went wrong. Please try again or contact us directly.";
        status.className = "form-status error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }
});
