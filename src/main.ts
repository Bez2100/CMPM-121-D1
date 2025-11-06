// --- Step 1: Centered container setup ---
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column"; // stack counter and button vertically
container.style.justifyContent = "center";
container.style.alignItems = "center";
container.style.height = "100vh"; // full screen height
container.style.backgroundColor = "#fffaf0"; // optional light background
document.body.appendChild(container);

let counter: number = 0; // start at 0

// Create a <div> to display the counter
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter} sushi rolls 🍣`;
counterDiv.style.fontSize = "2rem";
counterDiv.style.marginBottom = "1rem";
counterDiv.style.fontFamily = "sans-serif";
counterDiv.style.color = "#333";
container.appendChild(counterDiv);

// --- Sushi button setup ---
const sushiButton = document.createElement("button");
sushiButton.textContent = "🍣 Sell Sushi";

// Style the button
sushiButton.style.fontSize = "1.5rem";
sushiButton.style.padding = "0.7em 1.5em";
sushiButton.style.cursor = "pointer";
sushiButton.style.borderRadius = "12px";
sushiButton.style.border = "2px solid #ffb6b6";
sushiButton.style.backgroundColor = "#fff5f5";
sushiButton.style.transition = "0.3s";
sushiButton.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
container.appendChild(sushiButton);

// Add hover effects
sushiButton.addEventListener("mouseover", () => {
  sushiButton.style.backgroundColor = "#ffe0e0";
});
sushiButton.addEventListener("mouseout", () => {
  sushiButton.style.backgroundColor = "#fff5f5";
});

// --- Step 2: Button click behavior ---
sushiButton.addEventListener("click", () => {
  counter += 1; // increase the sushi count
  counterDiv.textContent = `${counter} sushi rolls 🍣`; // update text
  console.log(`You sold ${counter} sushi rolls so far!`);
});

// --- Step 3: Automatic Clicking ---
setInterval(() => {
  counter += 1;
  counterDiv.textContent = `${counter} sushi rolls 🍣`;
}, 1000);

// --- Step 4: Continuous Growth (replace setInterval) ---
let timeAccumulator = 0;
let lastTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms → seconds
  lastTime = currentTime;

  // Add time since last frame
  timeAccumulator += deltaTime;

  // Every full second, increase counter by 1
  if (timeAccumulator >= 1) {
    counter += 1;
    timeAccumulator -= 1;
    counterDiv.textContent = `${counter} sushi rolls 🍣`;
  }

  // Continue the animation loop
  requestAnimationFrame(updateCounter);
}

// --- Step 5: Purchasing an upgrade ---

// Start with no automatic growth at the beginning
let growthRate = 0;

// Create an "Upgrade" button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "🍣 Buy Upgrade (+1/sec)";
upgradeButton.style.fontSize = "1.2rem";
upgradeButton.style.padding = "0.5em 1em";
upgradeButton.style.marginTop = "1rem";
upgradeButton.style.borderRadius = "10px";
upgradeButton.style.border = "2px solid #ccc";
upgradeButton.style.backgroundColor = "#f0f0f0";
upgradeButton.style.cursor = "pointer";
upgradeButton.disabled = true; // disabled until player has ≥10
container.appendChild(upgradeButton);

// Update the button state based on counter value
function updateUpgradeButton() {
  if (counter >= 10) {
    upgradeButton.disabled = false;
    upgradeButton.style.backgroundColor = "#d1ffd1"; // green when available
  } else {
    upgradeButton.disabled = true;
    upgradeButton.style.backgroundColor = "#f0f0f0"; // grey when locked
  }
}

// Handle upgrade purchase
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;        // spend sushi
    growthRate += 1;      // increase automatic rate by +1 per second
    counterDiv.textContent = `${Math.floor(counter)} sushi rolls 🍣`;
    console.log(`Upgrade purchased! Growth rate is now ${growthRate}/sec.`);
    updateUpgradeButton();
  }
});


function animate(time: number) {
  const delta = (time - lastTime) / 1000; // seconds since last frame
  lastTime = time;

  // Apply automatic sushi growth
  counter += growthRate * delta;

  // Update counter display
  counterDiv.textContent = `${Math.floor(counter)} sushi rolls 🍣`;

  // Update upgrade button availability
  updateUpgradeButton();

  // Continue animation
  requestAnimationFrame(animate);
}

// Restart animation loop
requestAnimationFrame(animate);
