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
  counter += 1; // increment automatically
  counterDiv.textContent = `${counter} sushi rolls 🍣`;
  console.log(`Automatic sushi sold: ${counter}`);
}, 1000); // every 1000 milliseconds = 1 second
