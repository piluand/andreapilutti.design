// Primary cursor replacement
const primaryCursor = document.getElementById("cursor");
const standardCursor = document.getElementById("standard");
const linkCursor = document.getElementById("link");
const cursorAndrea = document.getElementById("cursor-andrea");
const cursorAnimation = document.getElementById("cursor-animation");

// Hide the default cursor for interactive elements
document.querySelectorAll("div, a, button, [role='button']").forEach((el) => {
  el.style.cursor = "none";
});
document.body.style.cursor = "none";

// Initially hide link cursor and cursor animation
linkCursor.style.display = "none";
cursorAnimation.style.display = "none";

// Sync primary cursor with mouse movement
document.addEventListener("mousemove", (e) => {
    primaryCursor.style.left = `${e.clientX}px`;
    primaryCursor.style.top = `${e.clientY}px`;    

  // Toggle between standard and link cursor visibility
  if (["A", "BUTTON"].includes(e.target.tagName) || e.target.hasAttribute("role")) {
    standardCursor.style.display = "none";
    linkCursor.style.display = "block";
    linkCursor.style.left = `${e.pageX}px`;
    linkCursor.style.top = `${e.pageY}px`;
  } else {
    standardCursor.style.display = "block";
    linkCursor.style.display = "none";
  }
});

// Set initial position for cursorAndrea
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let delayedScrollX = window.scrollX;
let delayedScrollY = window.scrollY;

cursorAndrea.style.position = "absolute";
cursorAndrea.style.left = `${currentX}px`;
cursorAndrea.style.top = `${currentY}px`;
cursorAndrea.style.transition = "left 1s ease-in-out, top 1s ease-in-out";

// Update scroll offsets and sync cursorAndrea with delayed scroll effect
window.addEventListener("scroll", () => {
  delayedScrollX = window.scrollX;
  delayedScrollY = window.scrollY;
});

// Smoothly update cursorAndrea's position with scroll
function updatecursorAndreaForScroll() {
  const targetX = currentX + delayedScrollX;
  const targetY = currentY + delayedScrollY;

  cursorAndrea.style.left = `${targetX}px`;
  cursorAndrea.style.top = `${targetY}px`;

  requestAnimationFrame(updatecursorAndreaForScroll);
}
updatecursorAndreaForScroll();

// Randomly generate a new target position within the viewport
function getRandomPosition() {
  const margin = 50;
  return {
    x: Math.random() * (window.innerWidth - 2 * margin) + margin,
    y: Math.random() * (window.innerHeight - 2 * margin) + margin,
  };
}

// Randomly generate a speed multiplier for varied movement
function getRandomSpeed() {
  return Math.random() * 2 + 0.5;
}

// Move cursorAndrea towards a target position
function movecursorAndrea(targetX, targetY, speed) {
  const deltaX = targetX - currentX;
  const deltaY = targetY - currentY;
  const distance = Math.hypot(deltaX, deltaY);

  if (distance < speed) {
    currentX = targetX;
    currentY = targetY;
  } else {
    const angle = Math.atan2(deltaY, deltaX) + (Math.random() - 0.5) * 0.2;
    currentX += Math.cos(angle) * speed;
    currentY += Math.sin(angle) * speed;
  }

  cursorAndrea.style.left = `${currentX}px`;
  cursorAndrea.style.top = `${currentY}px`;

  return distance < speed;
}

// Main animation loop for cursorAndrea
function animatecursorAndrea() {
  const { x: targetX, y: targetY } = getRandomPosition();
  const speed = getRandomSpeed();

  function step() {
    const reachedTarget = movecursorAndrea(targetX, targetY, speed);

    if (reachedTarget) {
      setTimeout(animatecursorAndrea, Math.random() * 2000 + 500);
    } else {
      requestAnimationFrame(step);
    }
  }

  step();
}
animatecursorAndrea();

// Click event for cursorAndrea with animation
cursorAndrea.addEventListener("click", (e) => {
  const clickX = e.pageX;
  const clickY = e.pageY;

  // Hide cursors
  cursorAndrea.style.display = "none";
  primaryCursor.style.display = "none";

  // Show click animation
  cursorAnimation.style.display = "block";
  cursorAnimation.style.left = `${clickX}px`;
  cursorAnimation.style.top = `${clickY}px`;

  setTimeout(() => {
    cursorAnimation.style.display = "none";
    cursorAndrea.style.display = "block";
    primaryCursor.style.display = "block";
  }, 1000);
});