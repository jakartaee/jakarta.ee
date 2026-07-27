/*!
 * Copyright (c) 2026 Eclipse Foundation AISBL
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Olivier Goulet <olivier.goulet@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */

/**
 * Sidebar checkbox list that filters guides by category.
 *
 * Like `jee-learning-hub`, this is a state-only custom element — Hugo (or
 * static markup for now) owns the `<li>`/`<input>` tree, and the element just
 * listens for `change` events on descendant checkboxes and broadcasts a
 * consolidated `jee-filter-change` event. That keeps the markup easy to
 * convert to a `{{ range }}` later without touching the JS.
 *
 * @fires jee-filter-change - Bubbling `{ selected: string[] }` event.
 */
export class GuideFilters extends HTMLElement {
  constructor() {
    super();
    /** @type {string[]} */
    this._selected = [];
    this._handleChange = this._handleChange.bind(this);
  }

  connectedCallback() {
    this.addEventListener("change", this._handleChange);
  }

  disconnectedCallback() {
    this.removeEventListener("change", this._handleChange);
  }

  /** Snapshot of the currently checked category values. */
  get selected() {
    return [...this._selected];
  }

  /**
   * Recompute selection from the live DOM whenever a child checkbox toggles.
   * Reading the DOM (rather than tracking state in JS) keeps this resilient
   * to checkboxes being added/removed at runtime — which matters once Hugo
   * renders the list dynamically.
   * @param {Event} event
   */
  _handleChange(event) {
    const target = /** @type {HTMLInputElement} */ (event.target);
    if (target.type !== "checkbox") return;

    this._selected = Array.from(
      this.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((input) => input.value);

    this.dispatchEvent(
      new CustomEvent("jee-filter-change", {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Register this element under a tag name (default `jee-guide-filters`).
   * @param {string} [tagName]
   */
  static register(tagName = "jee-guide-filters") {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, GuideFilters);
    }
  }
}
