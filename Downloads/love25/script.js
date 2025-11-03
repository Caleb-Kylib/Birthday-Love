// === Framer Motion (Motion One) Animations ===
const { animate, scroll } = window.MotionOne;

// Animate elements with data-motion when they enter view
document.querySelectorAll("[data-motion]").forEach((el) => {
  scroll(animate(el, { opacity: [0, 1], y: [40, 0] }, { duration: 0.8 }), {
    target: el,
    offset: ["start 90%", "end 60%"],
  });
});

// === Countdown Timer ===
const countdownEl = document.getElementById("countdown");
const eventDate = new Date("November 25, 2025 19:00:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "It's dinner time! 💕";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// === RSVP Button ===
const rsvpBtn = document.getElementById("rsvpBtn");
const thankYou = document.getElementById("thankYou");

rsvpBtn.addEventListener("click", () => {
  thankYou.textContent = "Yay! I can’t wait to see you there 💖";
  rsvpBtn.disabled = true;

  // Confetti animation using emojis
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("span");
    heart.textContent = "💗";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";
    heart.style.fontSize = Math.random() * 24 + 16 + "px";
    heart.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
    document.body.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
  }
});

// Simple heart fall animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}`;
document.head.appendChild(style);
