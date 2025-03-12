document.addEventListener("DOMContentLoaded", () => {
  const optionsInput = document.getElementById("options");
  const setOptionsBtn = document.getElementById("setOptions");
  const shuffleBtn = document.getElementById("shuffle");
  const resetBtn = document.getElementById("reset");
  const shuffleContainer = document.getElementById("shuffleContainer");
  const finalOrder = document.getElementById("finalOrder");

  let options = [];
  const cardWidth = 100;
  const cardHeight = 40;
  const margin = 10;

  // Render options in a grid layout that wraps as needed.
  const renderShuffle = (list) => {
    shuffleContainer.innerHTML = "";
    finalOrder.innerHTML = "";

    const containerRect = shuffleContainer.getBoundingClientRect();
    // Calculate how many columns can fit.
    const cols = Math.max(
      Math.floor((containerRect.width + margin) / (cardWidth + margin)),
      1
    );
    const rows = Math.ceil(list.length / cols);
    // Set container height based on rows.
    const computedHeight = margin + rows * (cardHeight + margin);
    shuffleContainer.style.height = computedHeight + "px";

    list.forEach((option, index) => {
      const card = document.createElement("div");
      card.textContent = option;
      card.className =
        "jumbled absolute bg-blue-200 border rounded p-2 text-center";
      card.style.width = cardWidth + "px";
      card.style.height = cardHeight + "px";
      // Compute grid position.
      const col = index % cols;
      const row = Math.floor(index / cols);
      const posX = margin + col * (cardWidth + margin);
      const posY = margin + row * (cardHeight + margin);
      card.style.left = posX + "px";
      card.style.top = posY + "px";
      card.style.transform = "rotate(0deg)"; // Keep orientation straight.
      shuffleContainer.appendChild(card);
    });

    // Render the initial ordered list.
    list.forEach((option) => {
      const li = document.createElement("li");
      li.textContent = option;
      finalOrder.appendChild(li);
    });
  };

  // Fisher-Yates shuffle.
  const shuffleArray = (arr) => {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Animate cards with a two-phase transition: float to an intermediate random position, then settle into the new grid.
  const performShuffle = () => {
    if (options.length < 2) return;
    const shuffled = shuffleArray(options);
    const cards = Array.from(shuffleContainer.children);
    const containerRect = shuffleContainer.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = parseFloat(shuffleContainer.style.height); // computed height

    // Determine number of columns in the final grid.
    const cols = Math.max(
      Math.floor((containerWidth + margin) / (cardWidth + margin)),
      1
    );

    // Phase 1: Move cards to an intermediate random position.
    cards.forEach((card, index) => {
      // Update card text to the shuffled order.
      card.textContent = shuffled[index];
      const randomX =
        margin + Math.random() * (containerWidth - cardWidth - margin);
      const randomY =
        margin + Math.random() * (containerHeight - cardHeight - margin);
      card.style.left = randomX + "px";
      card.style.top = randomY + "px";
      card.style.transform = "rotate(0deg)";
    });

    // Phase 2: After 500ms, animate cards into their final grid positions.
    setTimeout(() => {
      cards.forEach((card, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const finalX = margin + col * (cardWidth + margin);
        const finalY = margin + row * (cardHeight + margin);
        card.style.left = finalX + "px";
        card.style.top = finalY + "px";
      });
    }, 500);

    // Update the final ordered list after the complete animation (1 second total).
    setTimeout(() => {
      finalOrder.innerHTML = "";
      shuffled.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        finalOrder.appendChild(li);
      });
    }, 1000);
  };

  setOptionsBtn.addEventListener("click", () => {
    const raw = optionsInput.value.trim();
    if (!raw) return;
    options = raw
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt);
    if (options.length < 2) {
      alert("Please enter at least 2 options.");
      return;
    }
    renderShuffle(options);
  });

  shuffleBtn.addEventListener("click", performShuffle);

  resetBtn.addEventListener("click", () => {
    options = [];
    optionsInput.value = "";
    shuffleContainer.innerHTML = "";
    finalOrder.innerHTML = "";
  });

  // Shake detection using DeviceMotion API.
  const threshold = 15; // Adjust sensitivity as needed.
  let lastShakeTime = 0;
  function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;
    const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    if (magnitude > threshold) {
      const currentTime = Date.now();
      if (currentTime - lastShakeTime > 1000) {
        // Debounce trigger.
        lastShakeTime = currentTime;
        performShuffle();
      }
    }
  }

  // For iOS devices: request permission before listening.
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("devicemotion", handleMotion);
  }
});
