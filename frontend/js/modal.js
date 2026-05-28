// =========================================
// Contact Info — update these values only
// =========================================
const CONTACT = {
  phone: "+961 70 123 456",
  telegram: "@xenapeptides",
  email: "contact@xenapeptides.com",
};

// =========================================
// Build & inject modal into DOM
// =========================================
const modal = document.createElement("div");
modal.id = "purchase-modal";
modal.className = "modal-overlay";
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.setAttribute("aria-labelledby", "modal-title");
modal.innerHTML = `
  <div class="modal">
    <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <p class="modal-eyebrow">Interested in this product?</p>
    <h3 class="modal-title" id="modal-title">Contact Us To Order</h3>
    <p class="modal-subtitle">Reach out through any of the channels below and we will get back to you promptly.</p>
    <div class="modal-contacts">
      <a href="tel:${CONTACT.phone.replace(/\s/g, "")}" class="modal-contact-item">
        <span class="modal-contact-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M3.654 1.328a.678.678 0 0 1 .737-.168l2.522 1.01c.329.132.445.517.265.806l-1.07 1.77a.678.678 0 0 0 .145.842l2.457 2.457a.678.678 0 0 0 .842.145l1.77-1.07a.678.678 0 0 1 .806.265l1.01 2.522a.678.678 0 0 1-.168.737l-1.272 1.272c-.74.74-1.846 1.065-2.877.702-2.54-.89-5.528-3.878-6.418-6.418-.363-1.03-.038-2.137.702-2.877L3.654 1.328z"/>
          </svg>
        </span>
        <span>${CONTACT.phone}</span>
      </a>
      <a href="https://t.me/${CONTACT.telegram.replace("@", "")}" target="_blank" rel="noopener noreferrer" class="modal-contact-item">
        <span class="modal-contact-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
          </svg>
        </span>
        <span>${CONTACT.telegram}</span>
      </a>
      <a href="mailto:${CONTACT.email}" class="modal-contact-item">
        <span class="modal-contact-icon" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-.5a1 1 0 0 0-.8.4L8 8.417 14.8 3.9a1 1 0 0 0-.8-.4H2z"/>
          </svg>
        </span>
        <span>${CONTACT.email}</span>
      </a>
    </div>
  </div>
`;
document.body.appendChild(modal);

export function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  document.getElementById("modal-close-btn").focus();
}

export function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

// Close triggers
document
  .getElementById("modal-close-btn")
  .addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
