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

let growthRate = 0;

// Create a container for upgrades
const upgradesContainer = document.createElement("div");
upgradesContainer.style.display = "flex";
upgradesContainer.style.flexDirection = "column";
upgradesContainer.style.gap = "0.5rem";
upgradesContainer.style.marginTop = "2rem";
container.appendChild(upgradesContainer);

// --- Status displays ---
const statusDiv = document.createElement("div");
statusDiv.style.marginTop = "1rem";
statusDiv.style.fontFamily = "monospace";
statusDiv.style.fontSize = "1.2rem";
container.appendChild(statusDiv);

// --- Main animation loop ---
let lastTime = performance.now();
function animate(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  // Apply automatic growth
  counter += growthRate * delta;

  // Update display
  counterDiv.textContent = `${Math.floor(counter)} sushi rolls 🍣`;
  updateButtons();
  updateStatus();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

// --- Step 9: Data-driven items ---

interface Item {
  name: string;
  cost: number;
  rate: number;
}

// Data-only item definitions
const availableItems: Item[] = [
  { name: "Sous Chef Helper 👨‍🍳", cost: 10, rate: 2 },
  { name: "Conveyor Belt 🍣➡️", cost: 100, rate: 10 },
  { name: "Robot Sushi Machine 🤖🍣", cost: 1000, rate: 50 },
];

// These track gameplay state
const itemButtons: HTMLButtonElement[] = [];
const itemCounts: number[] = Array(availableItems.length).fill(0);

function createItemButtons() {
  availableItems.forEach((item, index) => {
    const btn = document.createElement("button");
    btn.textContent =
      `Buy ${item.name} (+${item.rate}/sec) - Cost: ${item.cost}`;
    btn.style.fontSize = "1rem";
    btn.style.padding = "0.5em 1em";
    btn.style.borderRadius = "10px";
    btn.style.border = "2px solid #ccc";
    btn.style.cursor = "pointer";
    btn.disabled = true;

    btn.addEventListener("click", () => {
      if (counter >= item.cost) {
        counter -= item.cost;
        itemCounts[index]++;

        // Increase growth rate
        growthRate += item.rate;

        // Scale cost
        item.cost = Math.floor(item.cost * 1.2);

        btn.textContent =
          `Buy ${item.name} (+${item.rate}/sec) - Cost: ${item.cost}`;
        updateStatus();
      }
    });

    itemButtons.push(btn);
    upgradesContainer.appendChild(btn);
  });
}

createItemButtons();

function updateButtons() {
  availableItems.forEach((item, index) => {
    const btn = itemButtons[index];
    if (counter >= item.cost) {
      btn.disabled = false;
      btn.style.backgroundColor = "#d1ffd1";
    } else {
      btn.disabled = true;
      btn.style.backgroundColor = "#f0f0f0";
    }
  });
}

function updateStatus() {
  statusDiv.textContent =
    `Growth rate: ${growthRate.toFixed(1)} sushi/sec\nOwned: ` +
    availableItems
      .map((item, i) => `${item.name}×${itemCounts[i]}`)
      .join("  ");
}
