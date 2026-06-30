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
 * Root container for the Learning Hub app.
 *
 * State-only custom element — Hugo renders the cards into the light DOM,
 * the host element listens for `jee-search` and `jee-filter-change` events
 * bubbled from descendant search bars / filter checkboxes and filters the
 * cards in place.
 */
export class LearningHub extends HTMLElement {
  constructor() {
    super();
    this._query = "";
    /** @type {string[]} */
    this._selectedTags = [];
  }

  connectedCallback() {
    // Arrow functions — capture `this` lexically, no constructor bind dance.
    this._onSearch = (event) => {
      const detail = event && event.detail;
      this._query = detail && detail.value != null ? String(detail.value) : "";
      this._applyFilters();
    };
    this._onFilter = (event) => {
      const detail = event && event.detail;
      this._selectedTags =
        detail && Array.isArray(detail.selected) ? detail.selected : [];
      this._applyFilters();
    };
    this.addEventListener("jee-search", this._onSearch);
    this.addEventListener("jee-filter-change", this._onFilter);
    this._applyFilters();
  }

  disconnectedCallback() {
    this.removeEventListener("jee-search", this._onSearch);
    this.removeEventListener("jee-filter-change", this._onFilter);
  }

  get query() {
    return this._query;
  }

  get selectedTags() {
    return [...this._selectedTags];
  }

  _applyFilters() {
    const query = this._query.trim().toLowerCase();
    const selected = this._selectedTags;
    const cards = this.querySelectorAll(".learn-guide-card");
    let visibleCount = 0;
    cards.forEach((card) => {
      const matchesQuery =
        query === "" || (card.textContent || "").toLowerCase().includes(query);
      // Tags are emitted by the Hugo template as a space-separated slug list
      // on `data-tags`. Selected filters match if any is present (OR).
      const cardTags = (card.dataset.tags || "").split(/\s+/).filter(Boolean);
      const matchesFilter =
        selected.length === 0 || selected.some((tag) => cardTags.includes(tag));
      const visible = matchesQuery && matchesFilter;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    const empty = this.querySelector(".learn-hub-empty");
    if (empty) empty.hidden = visibleCount > 0;
  }

  static register(tagName = "jee-learning-hub") {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, LearningHub);
    }
  }
}
