document.addEventListener("DOMContentLoaded", () => {
    const optionsInput = document.getElementById("options");
    const setOptionsBtn = document.getElementById("setOptions");
    const shuffleBtn = document.getElementById("shuffle");
    const resetBtn = document.getElementById("reset");
    const shuffleContainer = document.getElementById("shuffleContainer");
    const finalOrder = document.getElementById("finalOrder");

    let options = [];

    // Render the options as cards in the visual container and in the ordered list
    const renderShuffle = (list) => {
        shuffleContainer.innerHTML = '';
        finalOrder.innerHTML = '';
        const containerRect = shuffleContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        const cardWidth = 100,
            cardHeight = 40;

        list.forEach((option) => {
            // Create visual card for each option
            const card = document.createElement("div");
            card.textContent = option;
            card.className =
                "jumbled absolute bg-blue-200 border rounded p-2 text-center";
            card.style.width = cardWidth + "px";
            card.style.height = cardHeight + "px";
            // Place card at a random position
            const x = Math.random() * (containerWidth - cardWidth);
            const y = Math.random() * (containerHeight - cardHeight);
            card.style.left = x + "px";
            card.style.top = y + "px";
            // Apply a random rotation
            const rotation = Math.random() * 360;
            card.style.transform = `rotate(${rotation}deg)`;
            shuffleContainer.appendChild(card);
        });

        // Render initial final order (same order as entered)
        list.forEach((option) => {
            const li = document.createElement("li");
            li.textContent = option;
            finalOrder.appendChild(li);
        });
    };

    // Standard Fisher-Yates shuffle
    const shuffleArray = (arr) => {
        let array = arr.slice();
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Animate the cards to new random positions and update the final order list
    const performShuffle = () => {
        if (options.length < 2) return;
        const shuffled = shuffleArray(options);
        const cards = Array.from(shuffleContainer.children);
        const containerRect = shuffleContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        const cardWidth = 100,
            cardHeight = 40;

        cards.forEach((card) => {
            const newX = Math.random() * (containerWidth - cardWidth);
            const newY = Math.random() * (containerHeight - cardHeight);
            const newRotation = Math.random() * 360;
            card.style.left = newX + "px";
            card.style.top = newY + "px";
            card.style.transform = `rotate(${newRotation}deg)`;
        });

        // Update the ordered list after animation completes
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
        options = raw.split(",").map((opt) => opt.trim()).filter((opt) => opt);
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

    // Shake detection using the DeviceMotion API
    const threshold = 15; // Adjust shake sensitivity threshold as needed
    let lastShakeTime = 0;

    function handleMotion(event) {
        const acc = event.accelerationIncludingGravity;
        if (!acc) return;
        // Calculate the acceleration vector magnitude
        const magnitude = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
        if (magnitude > threshold) {
            const currentTime = Date.now();
            if (currentTime - lastShakeTime > 1000) { // Debounce to prevent rapid triggers
                lastShakeTime = currentTime;
                performShuffle();
            }
        }
    }

    // Request permission on iOS devices and add the event listener
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
