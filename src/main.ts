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



// --- Step 6: Multiple upgrades and status ---
let growthRate = 0;
type Upgrade = {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button: HTMLButtonElement;
};

// Define upgrades
const upgrades: Upgrade[] = [
  { name: "Sashimi", cost: 10, rate: 2, count: 0, button: document.createElement("button") },
  { name: "Temaki", cost: 100, rate: 10, count: 0, button: document.createElement("button") },
  { name: "Nigiri", cost: 1000, rate: 50, count: 0, button: document.createElement("button") },
];


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

function updateStatus() {
  statusDiv.textContent =
    `Growth rate: ${growthRate.toFixed(1)} sushi/sec\n` +
    `Owned: ${upgrades.map(u => `${u.name}×${u.count}`).join("  ")}`;
}

// --- Create upgrade buttons dynamically ---
upgrades.forEach(upg => {
  upg.button.textContent = `Buy Upgrade ${upg.name} (+${upg.rate}/sec) - Cost: ${upg.cost}`;
  upg.button.style.fontSize = "1rem";
  upg.button.style.padding = "0.5em 1em";
  upg.button.style.borderRadius = "10px";
  upg.button.style.border = "2px solid #ccc";
  upg.button.style.cursor = "pointer";
  upg.button.disabled = true;

  upg.button.addEventListener("click", () => {
    if (counter >= upg.cost) {
      counter -= upg.cost;
      upg.count += 1;
      growthRate += upg.rate;
      upg.cost = Math.floor(upg.cost * 1.2); // optional price scaling
      upg.button.textContent = ` Buy Upgrade ${upg.name} (+${upg.rate}/sec) - Cost: ${upg.cost}`;
      updateStatus();
    }
  });

  upgradesContainer.appendChild(upg.button);
});


// --- Update availability ---
function updateUpgradeButtons() {
  upgrades.forEach(upg => {
    if (counter >= upg.cost) {
      upg.button.disabled = false;
      upg.button.style.backgroundColor = "#d1ffd1";
    } else {
      upg.button.disabled = true;
      upg.button.style.backgroundColor = "#f0f0f0";
    }
  });
}

// --- Main animation loop ---
let lastTime = performance.now();
function animate(time: number) {
  const delta = (time - lastTime) / 1000;
  lastTime = time;

  // Apply automatic growth
  counter += growthRate * delta;

  // Update display
  counterDiv.textContent = `${Math.floor(counter)} sushi rolls 🍣`;
  updateUpgradeButtons();
  updateStatus();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
