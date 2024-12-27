// Primary cursor replacement
const primaryCursor = document.getElementById("cursor");
const standardCursor = document.getElementById("standard");
const linkCursor = document.getElementById("link");
const cursorAndrea = document.getElementById("cursor-andrea");
const cursorAnimation = document.getElementById("cursor-animation");

// Set initial positions
let primaryX = window.innerWidth / 2;
let primaryY = window.innerHeight / 2;

primaryCursor.style.position = "absolute"; // Absolute position for movement
primaryCursor.style.left = `${primaryX}px`;
primaryCursor.style.top = `${primaryY}px`;

// Hide the default pointer for all interactive elements
document.querySelectorAll("div, a, button, [role='button']").forEach((el) => {
  el.style.cursor = "none";
});

document.body.style.cursor = "none"; // Hide the default cursor globally

// Initially display the standard cursor
linkCursor.style.display = "none";
cursorAnimation.style.display = "none"; // Initially hide cursor animation

// Sync primary cursor with mouse movement
document.addEventListener("mousemove", (e) => {
  primaryCursor.style.left = `${e.pageX}px`;
  primaryCursor.style.top = `${e.pageY}px`;

  // Toggle between standard and link cursor visibility
  if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.hasAttribute("role")) {
    standardCursor.style.display = "none";
    linkCursor.style.display = "block";
    linkCursor.style.left = `${e.pageX}px`;
    linkCursor.style.top = `${e.pageY}px`;
  } else {
    standardCursor.style.display = "block";
    linkCursor.style.display = "none";
  }
});

// Set initial position of the cursorAndrea
let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let scrollOffsetX = window.scrollX;
let scrollOffsetY = window.scrollY;

let delayedScrollX = scrollOffsetX;
let delayedScrollY = scrollOffsetY;

cursorAndrea.style.position = "absolute"; // Absolute position to move with the scroll
cursorAndrea.style.left = `${currentX + delayedScrollX}px`;
cursorAndrea.style.top = `${currentY + delayedScrollY}px`;
cursorAndrea.style.transition = "left 1s ease-in-out, top 1s ease-in-out";

// Update scroll offsets on scroll event
window.addEventListener("scroll", () => {
  scrollOffsetX = window.scrollX;
  scrollOffsetY = window.scrollY;
});

// Sync cursorAndrea position with delayed scroll effect
function updatecursorAndreaForScroll() {
  delayedScrollX += (scrollOffsetX - delayedScrollX) * 0.1;
  delayedScrollY += (scrollOffsetY - delayedScrollY) * 0.1;

  cursorAndrea.style.left = `${currentX + delayedScrollX}px`;
  cursorAndrea.style.top = `${currentY + delayedScrollY}px`;

  requestAnimationFrame(updatecursorAndreaForScroll);
}

// Randomly generate a new target position within the viewport
function getRandomPosition() {
  const margin = 50; // Keep some margin from edges
  const x = Math.random() * (window.innerWidth - 2 * margin) + margin;
  const y = Math.random() * (window.innerHeight - 2 * margin) + margin;
  return { x, y };
}

// Randomly generate a speed multiplier for more varied movement
function getRandomSpeed() {
  return Math.random() * 2 + 0.5; // Speed range between 0.5 and 2.5 pixels per frame
}

// Move cursorAndrea towards a target position
function movecursorAndrea(targetX, targetY, speed) {
  const deltaX = targetX - currentX;
  const deltaY = targetY - currentY;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance < speed) {
    currentX = targetX;
    currentY = targetY;
  } else {
    const angle = Math.atan2(deltaY, deltaX) + (Math.random() - 0.5) * 0.2; // Add slight randomness to direction
    currentX += Math.cos(angle) * speed;
    currentY += Math.sin(angle) * speed;
  }

  cursorAndrea.style.left = `${currentX + delayedScrollX}px`;
  cursorAndrea.style.top = `${currentY + delayedScrollY}px`;

  return distance < speed;
}

// Main animation loop
function animatecursorAndrea() {
  const { x: targetX, y: targetY } = getRandomPosition();
  const speed = getRandomSpeed();

  function step() {
    const reachedTarget = movecursorAndrea(targetX, targetY, speed);

    if (reachedTarget) {
      setTimeout(animatecursorAndrea, Math.random() * 2000 + 500); // Pause for 0.5-2.5 seconds
    } else {
      requestAnimationFrame(step);
    }
  }

  step();
}

// Add click event for cursorAndrea
cursorAndrea.addEventListener("click", (e) => {
  const clickX = e.pageX;
  const clickY = e.pageY;

  // Store current position of cursorAndrea
  const andreaCurrentX = parseFloat(cursorAndrea.style.left) || 0;
  const andreaCurrentY = parseFloat(cursorAndrea.style.top) || 0;

  // Hide both cursors
  cursorAndrea.style.display = "none";
  primaryCursor.style.display = "none";

  // Show the cursor animation at the click position
  cursorAnimation.style.display = "block";
  cursorAnimation.style.left = `${clickX}px`;
  cursorAnimation.style.top = `${clickY}px`;

  setTimeout(() => {
    // Hide cursor animation and restore cursorAndrea position
    cursorAnimation.style.display = "none";
    cursorAndrea.style.display = "block";
    primaryCursor.style.display = "block";
    cursorAndrea.style.left = `${andreaCurrentX}px`;
    cursorAndrea.style.top = `${andreaCurrentY}px`;
  }, 1000);
});

// Start the cursorAndrea animation
animatecursorAndrea();

// Start syncing cursorAndrea with viewport scroll
updatecursorAndreaForScroll();