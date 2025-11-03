// === Framer Motion (Motion One) Animations ===
const motionGlobal = window.motion || window.MotionOne || {};
const animate = motionGlobal.animate;

// Animate elements with data-motion when they enter view (IO fallback)
if (typeof animate === "function") {
  document.querySelectorAll("[data-motion]").forEach((el) => {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(el, { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0)"] }, { duration: 0.8 });
            io.unobserve(el);
          }
        });
      }, { root: null, threshold: 0.1, rootMargin: "0px 0px -40% 0px" });
      io.observe(el);
    } else {
      animate(el, { opacity: [0, 1], transform: ["translateY(40px)", "translateY(0)"] }, { duration: 0.8 });
    }
  });
}

// === Countdown Timer ===
const countdownEl = document.getElementById("countdown");
const eventDate = new Date("November 3, 2025 19:00:00").getTime();

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

  // Confetti hearts when she clicks RSVP
  for (let i = 0; i < 30; i++) {
    createHeart("💗");
  }
});

// === Floating Hearts on Mouse Move ===
document.addEventListener("mousemove", (e) => {
  // Limit number of hearts on screen
  if (document.querySelectorAll(".float-heart").length > 25) return;
  createHeart("💖", e.pageX, e.pageY);
});

// === Touch Support for Mobile ===
document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  createHeart("💖", touch.pageX, touch.pageY);
});

// === Heart Generator Function ===
function createHeart(emoji, x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight) {
  const heart = document.createElement("span");
  heart.textContent = emoji;
  heart.classList.add("float-heart");
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.position = "fixed";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = 9999;
  heart.style.fontSize = Math.random() * 20 + 14 + "px";
  heart.style.opacity = 1;
  document.body.appendChild(heart);

  // Animate heart upwards and fade out
  const moveY = y - (100 + Math.random() * 100);
  animate(
    heart,
    { y: [0, -100], opacity: [1, 0] },
    { duration: 2 + Math.random(), easing: "ease-out" }
  );

  // Remove after animation
  setTimeout(() => heart.remove(), 2500);
}

// === Confetti Hearts (RSVP) Helper ===
const style = document.createElement("style");
style.innerHTML = `
@keyframes fall {
  to {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
.float-heart {
  transition: opacity 1s ease;
}
`;
document.head.appendChild(style);

// === Floating Hearts Background (continuous, lightweight) ===
(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const containerId = 'floating-hearts';
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.setAttribute('aria-hidden', 'true');
    document.body.prepend(container);
  }

  const MAX_HEARTS = 42;                 // cap DOM nodes for smoothness
  const SPAWN_RATE_PER_SEC = 6;          // gentle stream
  const MIN_DURATION = 4.2;              // seconds
  const MAX_DURATION = 7.6;              // seconds

  let spawnAccumulatorMs = 0;
  let lastTimestamp = 0;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFloatingHeart() {
    if (!container || container.childElementCount >= MAX_HEARTS) return;

    const heart = document.createElement('div');
    heart.className = 'heart';

    // Randomize size, position, opacity
    const sizePx = Math.round(randomBetween(8, 18));
    const leftPercent = randomBetween(0, 100);
    const startOpacity = randomBetween(0.45, 0.9);
    const duration = randomBetween(MIN_DURATION, MAX_DURATION);
    const driftVw = randomBetween(-12, 12); // gentle horizontal drift

    heart.style.width = `${sizePx}px`;
    heart.style.height = `${sizePx}px`;
    heart.style.left = `${leftPercent}%`;
    heart.style.bottom = `-${sizePx}px`;
    heart.style.opacity = String(startOpacity);

    container.appendChild(heart);

    // Animate up with slight horizontal drift and fade (transform for GPU perf)
    const controls = animate(
      heart,
      {
        transform: ['translate(0, 0)', `translate(${driftVw}vw, -110vh)`],
        opacity: [startOpacity, 0]
      },
      {
        duration,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    );

    // Remove after animation completes
    const cleanupDelay = (duration * 1000) + 100;
    window.setTimeout(() => heart.remove(), cleanupDelay);
  }

  function loop(ts) {
    if (!lastTimestamp) lastTimestamp = ts;
    const deltaMs = ts - lastTimestamp;
    lastTimestamp = ts;

    spawnAccumulatorMs += deltaMs;
    const msPerSpawn = 1000 / SPAWN_RATE_PER_SEC;
    while (spawnAccumulatorMs >= msPerSpawn) {
      createFloatingHeart();
      spawnAccumulatorMs -= msPerSpawn;
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();