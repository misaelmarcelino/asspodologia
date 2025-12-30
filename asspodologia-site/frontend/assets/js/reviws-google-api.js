document.addEventListener("DOMContentLoaded", () => {
  const mosaic = document.getElementById("google-reviews");
  const visible = document.getElementById("google-reviews-visible");

  if (!mosaic && !visible) return;

  const ENDPOINT = "https://asspodologia-reviews-api.vercel.app/api/reviews";
  const MAX_TEXT_MOSAIC = 90;
  const MAX_TEXT_VISIBLE = 220;
  const MAX_VISIBLE = 5;
  const MULTIPLIER = 4;

  fetch(ENDPOINT)
    .then(res => res.json())
    .then(reviews => {
      if (!Array.isArray(reviews) || reviews.length === 0) return;

      /* ======================
         MOSAICO (FUNDO)
      ====================== */
      if (mosaic) {
        const expanded = Array(MULTIPLIER).fill(reviews).flat();
        expanded
          .sort(() => 0.5 - Math.random())
          .slice(0, 12)
          .forEach(r =>
            mosaic.appendChild(createCard(r, MAX_TEXT_MOSAIC))
          );
      }

      /* ======================
         VISÍVEL (CARROSSEL)
      ====================== */
      if (visible) {
        reviews
          .slice(0, MAX_VISIBLE)
          .forEach(r =>
            visible.appendChild(createCard(r, MAX_TEXT_VISIBLE))
          );

        initCarousel();
      }
    })
    .catch(err => {
      console.warn("Erro ao carregar reviews:", err);
    });

  function createCard(review, maxText) {
    const card = document.createElement("div");
    card.className = "review-card";

    const text =
      review.text && review.text.length > maxText
        ? review.text.slice(0, maxText) + "…"
        : review.text || "";

    card.innerHTML = `
      <div class="review-header">
        ${
          review.photo
            ? `<img class="review-avatar" src="${review.photo}" alt="${review.author}">`
            : `<div class="review-avatar"></div>`
        }
        <div>
          <div class="review-name">${review.author}</div>
          <div class="review-stars">${renderStars(review.rating)}</div>
        </div>
      </div>
      <p>${text}</p>
    `;

    return card;
  }

  function renderStars(rating = 5) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  function initCarousel() {
    const carousel = document.querySelector(".reviews-carousel");
    const prev = document.querySelector(".carousel-btn.prev");
    const next = document.querySelector(".carousel-btn.next");

    if (!carousel || !prev || !next) return;

    const card = carousel.querySelector(".review-card");
    if (!card) return;

    const gap = 24;
    const cardWidth = card.offsetWidth + gap;

    next.addEventListener("click", () => {
      carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    prev.addEventListener("click", () => {
      carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });
  }
});
