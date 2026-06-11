// Developer Birthday Page Logic

// 1. Typing Animation for Subtitle
const subtitleText = "Loading birthday wishes for Tun Tauk...";
const typingSpeed = 60; // ms per char
const typingElement = document.getElementById("typing-text");

let charIndex = 0;
function typeSubtitle() {
  if (charIndex < subtitleText.length) {
    typingElement.textContent += subtitleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeSubtitle, typingSpeed);
  } else {
    // Finished typing, trigger subtle terminal activity representation
    simulateTerminalLoad();
  }
}

function simulateTerminalLoad() {
  const terminal = document.getElementById("terminal-window");
  if (terminal) {
    // Add active indicator or visual feedback if desired
    terminal.style.borderColor = "var(--accent-green)";
    setTimeout(() => {
      terminal.style.borderColor = "";
    }, 1000);
  }
}

// Start typing animation on window load
window.addEventListener("DOMContentLoaded", () => {
  typeSubtitle();
});

// 2. Confetti Animation Engine (Canvas)
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let animationFrameId = null;

const colors = [
  "#3b82f6", // blue
  "#10b981", // green
  "#06b6d4", // cyan
  "#a855f7", // purple
  "#f97316", // orange
  "#f43f5e"  // rose
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class ConfettiParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Blast outward direction
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 10 + 5;
    
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed - 3; // biased upwards
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 4 - 2;
    this.gravity = 0.2;
    this.opacity = 1;
    this.fadeSpeed = Math.random() * 0.015 + 0.01;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.speedX *= 0.98; // air resistance
    this.rotation += this.rotationSpeed;
    this.opacity -= this.fadeSpeed;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    
    // Draw rectangles representing code snippets/confetti
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * (Math.random() > 0.5 ? 1.5 : 1));
    ctx.restore();
  }
}

function spawnConfetti(count, sourceX, sourceY) {
  for (let i = 0; i < count; i++) {
    particles.push(new ConfettiParticle(sourceX, sourceY));
  }
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].opacity <= 0) {
      particles.splice(i, 1);
    } else {
      particles[i].draw();
    }
  }

  if (particles.length > 0) {
    animationFrameId = requestAnimationFrame(updateConfetti);
  } else {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function triggerCelebration(event) {
  // Spawn confetti from the button position or center of screen
  const rect = event.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Create three bursts for maximum excitement
  spawnConfetti(70, x, y);
  setTimeout(() => spawnConfetti(50, x - 100, y - 50), 150);
  setTimeout(() => spawnConfetti(50, x + 100, y - 50), 300);

  if (!animationFrameId) {
    updateConfetti();
  }
}

// 3. Wish Generation Logic
const programmerWishes = [
  "tuntauk.successRate = 1.0;\ntuntauk.happiness++;\nconsole.log(\"Tun Tauk: Ready for new deployment!\");",
  
  "const currentYear = new Date().getFullYear();\nconsole.log(\"Compiled successfully! Tun Tauk v\" + currentYear + \" is running without errors.\");",
  
  "git commit -m \"feat: Add another year of absolute greatness to Tun Tauk\" --allow-empty",
  
  "// System Diagnostics:\n// Status: 100% Happy\n// Warnings: 0\n// Errors: 0\n// Life.run() compiled successfully.",
  
  "sudo systemctl restart happiness.service && echo \"Happy Birthday, Tun Tauk!\"",
  
  "SELECT happiness, success, peace \nFROM life \nWHERE name = 'Tun Tauk' \nORDER BY joy DESC;",
  
  "while (true) {\n  TunTauk.enjoyLife();\n  TunTauk.achieveDreams();\n}",
  
  "try {\n  celebrate();\n} catch (err) {\n  console.error(\"No bugs found in Tun Tauk's special day!\");\n}",
  
  "const lifeGoals = [\"deploy_dreams\", \"stay_happy\", \"zero_bugs\"];\nlifeGoals.forEach(goal => run(goal));",
  
  "ping -c 365 -i 86400 happiness.tuntauk.io"
];

let lastWishIndex = -1;

function getRandomWish() {
  let index;
  // Prevent repeating the same wish consecutively
  do {
    index = Math.floor(Math.random() * programmerWishes.length);
  } while (index === lastWishIndex && programmerWishes.length > 1);
  
  lastWishIndex = index;
  return programmerWishes[index];
}

// 4. Setup Celebration Button Click
const celebrationBtn = document.getElementById("celebration-btn");
const wishDisplay = document.getElementById("wish-display");
const wishText = document.getElementById("wish-text");

celebrationBtn.addEventListener("click", (e) => {
  // Trigger physical confetti animation
  triggerCelebration(e);
  
  // Select a random wish and formatting
  const wish = getRandomWish();
  wishText.innerHTML = "";
  
  // Format code blocks in console output gracefully
  const preElement = document.createElement("pre");
  preElement.style.margin = "0";
  preElement.style.fontFamily = "var(--font-mono)";
  preElement.style.whiteSpace = "pre-wrap";
  preElement.style.wordBreak = "break-all";
  preElement.textContent = wish;
  wishText.appendChild(preElement);
  
  // Show display block with a beautiful animation
  wishDisplay.classList.remove("hidden");
  
  // Subtle animation on the output block
  wishDisplay.style.animation = "none";
  wishDisplay.offsetHeight; // trigger reflow
  wishDisplay.style.animation = "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
  
  // Temporarily animate button text to show success
  const originalText = celebrationBtn.innerHTML;
  celebrationBtn.innerHTML = "<span class='btn-icon'>✔</span> Celebration Initiated!";
  celebrationBtn.style.background = "linear-gradient(135deg, var(--accent-green), #047857)";
  celebrationBtn.style.boxShadow = "0 4px 15px rgba(16, 185, 129, 0.4)";
  
  setTimeout(() => {
    celebrationBtn.innerHTML = originalText;
    celebrationBtn.style.background = "";
    celebrationBtn.style.boxShadow = "";
  }, 1500);
});
