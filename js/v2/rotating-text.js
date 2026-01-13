export function setupRotatingText() {
  // Find all containers with rotating text
  const containers = document.querySelectorAll(".rotating-text-container");
  if (!containers.length) return;

  containers.forEach((container) => {
    // Get the container holding the words
    const itemsContainer = container.querySelector(".rotating-text-items");
    if (!itemsContainer) return;

    // Get all span elements containing the words
    const spans = itemsContainer.querySelectorAll("span");
    if (!spans.length) return;

    // Extract words and trim whitespace
    const words = Array.from(spans, (span) => span.textContent.trim());
    // Pre-calculate widths for each word to avoid repeated DOM measurements
    const wordWidths = words.map((word) => getWordWidth(word, container));

    // Track current word index and visible element
    let wordIndex = 0;
    let currentElement = null;

    // Helper: Calculate the rendered width of a word using the container's font styles
    function getWordWidth(word, container) {
      const temp = document.createElement("span");
      temp.textContent = word;
      temp.style.position = "absolute";
      temp.style.visibility = "hidden";
      temp.style.whiteSpace = "nowrap";
      // Copy font styles from container for accurate measurement
      Object.assign(temp.style, {
        fontFamily: getComputedStyle(container).fontFamily,
        fontSize: getComputedStyle(container).fontSize,
        fontWeight: getComputedStyle(container).fontWeight,
        letterSpacing: getComputedStyle(container).letterSpacing,
      });
      document.body.appendChild(temp);
      const width = temp.offsetWidth;
      temp.remove();
      return width;
    }

    // Helper: Create a new span element for a word
    function createElement(text) {
      const el = document.createElement("span");
      el.className = "rotating-text";
      el.textContent = text;
      el.style.opacity = 0; // Start invisible (number for consistency with CSS transitions)
      el.style.transform = "translateX(110%)";
      return el;
    }

    // Helper: Animate the transition to the next word
    function animate(nextElement, width) {
      // Adjust container width to fit the new word
      container.style.width = `${width}px`;
      // Slide out current element
      if (currentElement) {
        currentElement.style.transform = "translateX(-110%)";
        currentElement.style.opacity = 0;
      }
      // Slide in next element
      nextElement.style.transform = "translateX(0)";
      nextElement.style.opacity = 1;
    }

    // Main cycle: Advance to the next word with animation
    function cycle() {
      const nextIndex = (wordIndex + 1) % words.length;
      const nextWord = words[nextIndex];
      const nextWidth = wordWidths[nextIndex];
      // Create the next element
      const nextElement = createElement(nextWord);

      if (currentElement) {
        // Subsequent words: animate the transition
        nextElement.style.transform = "translateX(110%)";
        container.appendChild(nextElement);

        // Trigger animation on next frame for smoothness
        // I don't really know why two frames are needed, but it seems that the fade in animation only works reliably this way.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            animate(nextElement, nextWidth);
          })
        );
      } else {
        // First word: show instantly without animation
        nextElement.style.opacity = 1;
        nextElement.style.transform = "translateX(0)";
        container.style.width = `${nextWidth}px`;
        container.appendChild(nextElement);
      }

      // Clean up after animation completes
      const cleanupDelay = currentElement ? 600 : 0;
      setTimeout(() => {
        if (currentElement) currentElement.remove();
        currentElement = nextElement;
        wordIndex = nextIndex;
      }, cleanupDelay);
    }

    // Wait for fonts to load, then start cycling
    document.fonts.ready.then(() => {
      wordIndex = words.length - 1; // Start with last word as "current"
      cycle(); // Initial cycle
      setInterval(cycle, 3000); // Repeat every 3 seconds
    });
  });
}
