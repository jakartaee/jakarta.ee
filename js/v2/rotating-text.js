/**
 * Creates a debounced version of the provided function that delays invoking the function
 * until after a specified number of milliseconds have elapsed since the last time the
 * debounced function was invoked. This is useful for limiting the rate at which a function
 * can fire, such as in event handlers for user input.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay execution.
 * @returns {Function} A debounced version of the input function that can be called with any arguments.
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function setupRotatingText() {
  // Find all containers with rotating text
  const containers = document.querySelectorAll(".rotating-text-container");
  if (!containers.length) return;

  // Function to set up rotating text for a single container
  function setupContainer(container) {
    // Get the container holding the words
    const itemsContainer = container.querySelector(".rotating-text-items");
    if (!itemsContainer) return;

    // Get all span elements containing the words
    const spans = itemsContainer.querySelectorAll("span");
    if (!spans.length) return;

    // Extract words and trim whitespace
    const words = Array.from(spans, (span) => span.textContent.trim());

    // Track current word index and visible element
    let wordIndex = 0;
    let currentElement = null;
    let wordDimensions = []; // Will be calculated after fonts load

    // Helper: Calculate the rendered width of a word using the container's font styles
    function getDimensions(word, container) {
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
        lineHeight: getComputedStyle(container).lineHeight,
      });
      document.body.appendChild(temp);
      const width = temp.offsetWidth + 1; // Adding 1px as safety margin
      const height = temp.offsetHeight;
      temp.remove();
      return {
        width,
        height,
      };
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
      const nextDimension = wordDimensions[nextIndex];
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
            animate(nextElement, nextDimension.width);
          })
        );
      } else {
        // First word: show instantly without animation
        nextElement.style.opacity = 1;
        nextElement.style.transform = "translateX(0)";
        container.style.width = `${nextDimension.width}px`;
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

    // Wait for fonts to load, then calculate dimensions and start cycling
    document.fonts.ready.then(() => {
      // Pre-calculate widths for each word after fonts are loaded
      wordDimensions = words.map((word) => getDimensions(word, container));
      
      wordIndex = words.length - 1; // Start with last word as "current"
      cycle(); // Initial cycle
      // we need to set the height of the container to match the text height
      const firstDimension = wordDimensions[0];
      container.style.height = `${firstDimension.height}px`;
      // Set interval for cycling through words
      container.intervalId = setInterval(cycle, 3500); // Repeat every 3 seconds
    });
  }

  // Set up each container
  containers.forEach(setupContainer);

  // Handle window resize: re-create rotating text
  const debouncedResize = debounce(() => {
    containers.forEach(container => {
      // Clear existing interval
      if (container.intervalId) {
        clearInterval(container.intervalId);
        container.intervalId = null;
      }
      // Remove existing rotating text elements
      const itemsContainer = container.querySelector(".rotating-text-items");
      if (itemsContainer) {
        const rotatingTexts = container.querySelectorAll(".rotating-text");
        rotatingTexts.forEach(el => el.remove());
        container.style.width = ''; // Reset width
      }
      // Re-setup the container
      setupContainer(container);
    });
  }, 250); // Debounce for 250ms

  window.addEventListener('resize', debouncedResize);
}