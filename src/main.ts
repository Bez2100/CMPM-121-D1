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
const sushiCounterDisplay = document.createElement("div");
sushiCounterDisplay.textContent = `${counter} sushi rolls 🍣`;
sushiCounterDisplay.style.fontSize = "2rem";
sushiCounterDisplay.style.marginBottom = "1rem";
sushiCounterDisplay.style.fontFamily = "sans-serif";
sushiCounterDisplay.style.color = "#333";
container.appendChild(sushiCounterDisplay);

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

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  count: number;
  button: HTMLButtonElement;
}

// GoldenButton set up and text
let goldenClicks = 0;
const goldenThreshold = 20; // starts at 20 clicks

function triggerGoldenState() {
  sushiButton.style.backgroundColor = "gold";
  sushiButton.style.border = "3px solid orange";
  sushiButton.textContent = "✨ GOLDEN SUSHI ✨";
}

function endGoldenState() {
  sushiButton.style.backgroundColor = "#fff5f5";
  sushiButton.style.border = "2px solid #ffb6b6";
  sushiButton.textContent = "🍣 Sell Sushi";
}

// --- Step 2: Button click behavior ---
sushiButton.addEventListener("click", () => {
  goldenClicks++;

  // Golden mode activated
  if (goldenSushiUnlocked && goldenClicks >= goldenThreshold) {
    counter += counter * 1; // double (adds another full counter amount)
    triggerGoldenState();

    // After a moment, switch back to normal
    setTimeout(endGoldenState, 700);

    goldenClicks = 0;
  } else {
    counter += 1;
  }

  sushiCounterDisplay.textContent = `${Math.floor(counter)} sushi rolls 🍣`;
});

// Upgrades : Defines the purchaseable upgrades with the cost, rates, and descriptions
let growthRate = 0;
let goldenSushiUnlocked = false;

// --- FULL UPGRADE LIST INCLUDING ANCIENT SCROLL ---
const availableItems: Item[] = [
  {
    name: "Sous Chef Helper 👨‍🍳",
    description: "A helpful apprentice who prepares ingredients nonstop.",
    cost: 10,
    rate: 2,
    count: 0,
    button: document.createElement("button"),
  },
  {
    name: "Conveyor Belt 🍣➡️",
    description: "A steady mechanical belt that rolls sushi automatically.",
    cost: 100,
    rate: 10,
    count: 0,
    button: document.createElement("button"),
  },
  {
    name: "Robot Sushi Machine 🤖🍣",
    description: "A fully automated robot that produces perfect sushi rolls.",
    cost: 1000,
    rate: 50,
    count: 0,
    button: document.createElement("button"),
  },

  {
    name: "Ancient Sushi Scroll 📜✨",
    description: "Mystical writings that boost ALL sushi production by +10%.",
    cost: 2000,
    rate: 0, // not direct production, special multiplier
    count: 0,
    button: document.createElement("button"),
  },

  // Fifth item
  {
    name: "Wasabi Turbo Mixer 🌪️",
    description: "Creates spicy sushi paste that speeds up sushi output.",
    cost: 150,
    rate: 5,
    count: 0,
    button: document.createElement("button"),
  },
];

// --- Upgrade display section ---
const upgradesContainer = document.createElement("div");
upgradesContainer.style.display = "flex";
upgradesContainer.style.flexDirection = "column";
upgradesContainer.style.gap = "0.5rem";
upgradesContainer.style.marginTop = "2rem";
container.appendChild(upgradesContainer);

// --- Status display ---
const statusDiv = document.createElement("div");
statusDiv.style.marginTop = "1rem";
statusDiv.style.fontFamily = "monospace";
statusDiv.style.fontSize = "1.1rem";
container.appendChild(statusDiv);

function updateStatus() {
  statusDiv.textContent = `Growth rate: ${growthRate.toFixed(1)} sushi/sec\n` +
    `Owned: ${availableItems.map((u) => `${u.name}×${u.count}`).join("  ")}`;
}

// --- Create upgrade buttons dynamically ---
availableItems.forEach((item) => {
  item.button.textContent =
    `Buy ${item.name} (+${item.rate}/sec)\nCost: ${item.cost}\n${item.description}`;

  item.button.style.fontSize = "1rem";
  item.button.style.padding = "0.6em 1em";
  item.button.style.whiteSpace = "pre-line";
  item.button.style.borderRadius = "10px";
  item.button.style.border = "2px solid #ccc";
  item.button.style.cursor = "pointer";
  item.button.disabled = true;

  item.button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.count++;
      item.cost = Math.floor(item.cost * 1.25);

      // Add rate normally
      if (item.rate > 0) {
        growthRate += item.rate;
      }

      // Special logic: Ancient Sushi Scroll boosts all production
      if (item.name.includes("Ancient Sushi Scroll")) {
        growthRate *= 1.1; // +10% boost
        goldenSushiUnlocked = true;
      }

      // Update button text with new cost
      item.button.textContent =
        `Buy ${item.name} (+${item.rate}/sec)\nCost: ${item.cost}\n${item.description}`;
    }
  });

  upgradesContainer.appendChild(item.button);
});

// --- Enable/disable upgrade buttons ---
function updateUpgradeButtons() {
  availableItems.forEach((item) => {
    if (counter >= item.cost) {
      item.button.disabled = false;
      item.button.style.backgroundColor = "#d5ffd5";
    } else {
      item.button.disabled = true;
      item.button.style.backgroundColor = "#f0f0f0";
    }
  });
}

// --- Main Animation Loop ---
let lastTime = performance.now();

function animate(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  counter += growthRate * delta;

  sushiCounterDisplay.textContent = `${Math.floor(counter)} sushi rolls 🍣`;
  updateUpgradeButtons();
  updateStatus();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
