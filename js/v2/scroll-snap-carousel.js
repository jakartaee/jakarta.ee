/**
 * Copyright (c) 2025 Eclipse Foundation AISBL
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

class ScrollSnapCarousel {
  constructor(container, options = {}) {
    this.container = container;
    this.itemSelector = options.itemSelector || ".scroll-snap-item";
    this.items = container.querySelectorAll(this.itemSelector);

    if (this.items.length === 0) return;

    // Add ARIA attributes to container
    this.container.setAttribute("role", "region");
    this.container.setAttribute("aria-label", "Carousel content");
    this.container.setAttribute("tabindex", "0");

    this.createControls();

    // Update button visibility immediately and on scroll
    this.updateButtons();
    this.container.addEventListener("scroll", () => this.updateButtons(), {
      passive: true,
    });

    // Add keyboard navigation
    this.container.addEventListener("keydown", (e) => this.handleKeydown(e));

    // Add keyboard navigation for the entire carousel area (including when hovering)
    document.addEventListener("keydown", (e) => this.handleGlobalKeydown(e));

    // Track hover state
    this.isHovering = false;
    this.container.addEventListener(
      "mouseenter",
      () => (this.isHovering = true)
    );
    this.container.addEventListener(
      "mouseleave",
      () => (this.isHovering = false)
    );
  }

  createControls() {
    const wrapper = document.createElement("div");
    wrapper.className = "scroll-snap-controls";
    wrapper.setAttribute("role", "group");
    wrapper.setAttribute("aria-label", "Carousel navigation");

    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "scroll-sap-btn-prev btn btn-clear btn-square"; // Kept original class name + bootstrap
    this.prevBtn.innerHTML =
      '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
    this.prevBtn.setAttribute("aria-label", "Previous item");
    this.prevBtn.onclick = () => this.move(-1);

    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "scroll-snap-btn-next btn btn-clear btn-square";
    this.nextBtn.innerHTML =
      '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
    this.nextBtn.setAttribute("aria-label", "Next item");
    this.nextBtn.onclick = () => this.move(1);

    wrapper.append(this.prevBtn, this.nextBtn);
    this.container.before(wrapper);

    // Add hover tracking for controls as well
    wrapper.addEventListener("mouseenter", () => (this.isHovering = true));
    wrapper.addEventListener("mouseleave", () => (this.isHovering = false));
  }

  move(direction) {
    const itemWidth = this.container.scrollWidth / this.items.length;
    this.container.scrollBy({
      left: itemWidth * direction,
      behavior: "smooth",
    });
  }

  handleKeydown(e) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        this.move(-1);
        break;
      case "ArrowRight":
        e.preventDefault();
        this.move(1);
        break;
    }
  }

  handleGlobalKeydown(e) {
    // Only handle global keydown when hovering over the carousel
    if (this.isHovering) {
      this.handleKeydown(e);
    }
  }

  updateButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = this.container;

    // Hide/disable Prev if at start (with slight tolerance)
    const isAtStart = scrollLeft <= 1;
    this.prevBtn.style.visibility = isAtStart ? "hidden" : "visible";
    this.prevBtn.disabled = isAtStart;
    this.prevBtn.setAttribute("aria-disabled", isAtStart.toString());

    // Hide/disable Next if at end (with slight tolerance for fractional pixels)
    const isAtEnd =
      Math.ceil(scrollLeft + clientWidth) >= Math.floor(scrollWidth);
    this.nextBtn.style.visibility = isAtEnd ? "hidden" : "visible";
    this.nextBtn.disabled = isAtEnd;
    this.nextBtn.setAttribute("aria-disabled", isAtEnd.toString());
  }
}
/**
 * Initialize scroll snap carousel for matching elements
 * @param {string} selector - CSS selector for container elements
 * @param {string} itemSelector - CSS selector for items within the container
 */
function init(selector, itemSelector) {
  document.querySelectorAll(selector).forEach((container) => {
    new ScrollSnapCarousel(container, { itemSelector });
  });
}

/**
 * Initialize scroll snap carousel with MutationObserver
 * Useful when content is dynamically loaded
 * @param {string} selector - CSS selector for container elements
 * @param {string} itemSelector - CSS selector for items within the container
 */
function initWithObserver(selector, itemSelector) {
  document.querySelectorAll(selector).forEach((container) => {
    // Initialize immediately if items already exist
    if (container.querySelector(itemSelector)) {
      new ScrollSnapCarousel(container, { itemSelector });
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
              new ScrollSnapCarousel(container, { itemSelector });
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
 * @param {boolean} [options.useMutationObserver] - Whether to use mutation observer for deferred initialization
 * @returns {void}
 */
export default (selector, itemSelector, options = {}) => {
  if (options.useMutationObserver) {
    initWithObserver(selector, itemSelector);
  } else {
    init(selector, itemSelector);
  }
};
