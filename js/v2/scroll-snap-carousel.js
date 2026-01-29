/**
 * Copyright (c) 2025 Eclipse Foundation AISBL
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

/**
 * Creates a scroll snap carousel with navigation controls, keyboard support, and optional auto-rotation.
 * @param {HTMLElement} container - The container element for the carousel
 * @param {Object} [options={}] - Configuration options
 * @param {string} [options.itemSelector=".scroll-snap-item"] - CSS selector for carousel items
 * @param {boolean} [options.autoRotate=false] - Whether to enable automatic rotation
 * @param {number} [options.autoRotateInterval=3000] - Interval in milliseconds for auto-rotation
 * @returns {Object} Object with public methods: move, updateButtons, stopAutoRotate
 */
function createScrollSnapCarousel(container, options = {}) {
  const itemSelector = options.itemSelector || ".scroll-snap-item";
  const items = container.querySelectorAll(itemSelector);

  if (items.length === 0) return;

  // Add ARIA attributes to container
  container.setAttribute("role", "region");
  container.setAttribute("aria-label", "Carousel content");
  container.setAttribute("tabindex", "0");

  let prevBtn, nextBtn;
  let isHovering = false;
  let autoRotateTimer;
  let originalWidth = container.scrollWidth;

  // Duplicate items for infinite scroll if autoRotate
  if (options.autoRotate) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });
    originalWidth = container.scrollWidth / 2;
  }

  /**
   * Creates navigation controls (previous/next buttons)
   */
  function createControls() {
    const wrapper = document.createElement("div");
    wrapper.className = "scroll-snap-controls";
    wrapper.setAttribute("role", "group");
    wrapper.setAttribute("aria-label", "Carousel navigation");

    prevBtn = document.createElement("button");
    prevBtn.className = "scroll-sap-btn-prev btn btn-clear btn-square"; // Kept original class name + bootstrap
    prevBtn.innerHTML =
      '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
    prevBtn.setAttribute("aria-label", "Previous item");
    prevBtn.onclick = () => move(-1);

    nextBtn = document.createElement("button");
    nextBtn.className = "scroll-snap-btn-next btn btn-clear btn-square";
    nextBtn.innerHTML =
      '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
    nextBtn.setAttribute("aria-label", "Next item");
    nextBtn.onclick = () => move(1);

    wrapper.append(prevBtn, nextBtn);
    container.before(wrapper);

    // Add hover tracking for controls as well
    wrapper.addEventListener("mouseenter", () => (isHovering = true));
    wrapper.addEventListener("mouseleave", () => (isHovering = false));
  }

  /**
   * Moves the carousel by one item in the specified direction
   * @param {number} direction - Direction to move (-1 for previous, 1 for next)
   */
  function move(direction) {
    const itemWidth = originalWidth / items.length;
    container.scrollBy({
      left: itemWidth * direction,
      behavior: "smooth",
    });
  }

  /**
   * Handles keyboard navigation for the carousel
   * @param {KeyboardEvent} e - The keyboard event
   */
  function handleKeydown(e) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        move(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        move(1);
        break;
    }
  }

  /**
   * Handles global keyboard navigation when hovering over the carousel
   * @param {KeyboardEvent} e - The keyboard event
   */
  function handleGlobalKeydown(e) {
    // Only handle global keydown when hovering over the carousel
    if (isHovering) {
      handleKeydown(e);
    }
  }

  /**
   * Updates the visibility and state of navigation buttons based on scroll position
   */
  function updateButtons() {
    const { scrollLeft, clientWidth } = container;

    // Hide/disable Prev if at start (with slight tolerance)
    const isAtStart = scrollLeft <= 1;
    prevBtn.style.visibility = isAtStart ? "hidden" : "visible";
    prevBtn.disabled = isAtStart;
    prevBtn.setAttribute("aria-disabled", isAtStart.toString());

    // For infinite scroll, next is always visible
    if (options.autoRotate) {
      nextBtn.style.visibility = "visible";
      nextBtn.disabled = false;
      nextBtn.setAttribute("aria-disabled", "false");
    } else {
      // Hide/disable Next if at end (with slight tolerance for fractional pixels)
      const isAtEnd =
        Math.ceil(scrollLeft + clientWidth) >= Math.floor(container.scrollWidth);
      nextBtn.style.visibility = isAtEnd ? "hidden" : "visible";
      nextBtn.disabled = isAtEnd;
      nextBtn.setAttribute("aria-disabled", isAtEnd.toString());
    }
  }

  // Initialize
  createControls();
  updateButtons();

  // Handle scroll for infinite loop and button updates
  container.addEventListener("scroll", () => {
    if (options.autoRotate && container.scrollLeft >= originalWidth) {
      container.scrollLeft -= originalWidth;
    }
    updateButtons();
  }, { passive: true });

  container.addEventListener("keydown", (e) => handleKeydown(e));
  document.addEventListener("keydown", (e) => handleGlobalKeydown(e));
  container.addEventListener("mouseenter", () => (isHovering = true));
  container.addEventListener("mouseleave", () => (isHovering = false));

  // Start auto-rotate if enabled
  if (options.autoRotate) {
    autoRotateTimer = setInterval(() => {
      if (!isHovering) {
        move(1);
      }
    }, options.autoRotateInterval || 3000);
  }

  // Return public methods
  return {
    /**
     * Moves the carousel by one item
     * @param {number} direction - Direction to move (-1 or 1)
     */
    move,
    /**
     * Updates the navigation button states
     */
    updateButtons,
    /**
     * Stops the auto-rotation timer
     */
    stopAutoRotate: () => {
      if (autoRotateTimer) {
        clearInterval(autoRotateTimer);
      }
    },
  };
}

/**
 * Initialize scroll snap carousel for matching elements
 * @param {string} selector - CSS selector for container elements
 * @param {string} itemSelector - CSS selector for items within the container
 * @param {Object} [options={}] - Additional options to pass to createScrollSnapCarousel
 */
function init(selector, itemSelector, options = {}) {
  document.querySelectorAll(selector).forEach((container) => {
    createScrollSnapCarousel(container, { itemSelector, ...options });
  });
}

/**
 * Initialize scroll snap carousel with MutationObserver
 * Useful when content is dynamically loaded
 * @param {string} selector - CSS selector for container elements
 * @param {string} itemSelector - CSS selector for items within the container
 * @param {Object} [options={}] - Additional options to pass to createScrollSnapCarousel
 */
function initWithObserver(selector, itemSelector, options = {}) {
  document.querySelectorAll(selector).forEach((container) => {
    // Initialize immediately if items already exist
    if (container.querySelector(itemSelector)) {
      createScrollSnapCarousel(container, { itemSelector, ...options });
    } else {
      // Watch for items being added
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList") {
            // Check if any added nodes match the item selector
            const hasItems = Array.from(mutation.addedNodes).some(
              (node) =>
                node.nodeType === Node.ELEMENT_NODE &&
                (node.matches(itemSelector) || node.querySelector(itemSelector))
            );
            if (hasItems) {
              createScrollSnapCarousel(container, { itemSelector, ...options });
              observer.disconnect(); // Stop observing once initialized
            }
          }
        });
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
      });
    }
  });
}

/**
 * Initializes carousels with scroll snap functionality
 * @param {string} selector - CSS selector for the carousel containers
 * @param {string} itemSelector - CSS selector for the carousel items
 * @param {Object} [options={}] - Additional options
 * @param {boolean} [options.useMutationObserver] - Whether to use mutation observer for deferred initialization
 * @param {boolean} [options.autoRotate] - Whether to enable auto-rotation (passed to createScrollSnapCarousel)
 * @param {number} [options.autoRotateInterval] - Auto-rotation interval (passed to createScrollSnapCarousel)
 * @returns {void}
 */
const scrollSnapCarousel = (selector, itemSelector, options = {}) => {
  if (options.useMutationObserver) {
    initWithObserver(selector, itemSelector, options);
  } else {
    init(selector, itemSelector, options);
  }
};

export default scrollSnapCarousel;
