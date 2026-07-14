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

import { LitElement } from "lit";

/**
 * Root container for the Learning Hub app.
 *
 * Hugo renders the guide cards and the empty-state block into the light DOM
 * of this element. The component listens for bubbled `jee-search` and
 * `jee-filter-change` events and reapplies the filter imperatively.
 *
 * No template — state lives in plain instance fields, not reactive
 * properties, because we don't render our own DOM. LitElement's default
 * `render()` returns `noChange`, so the light-DOM children stay intact.
 */
export class LearningHub extends LitElement {
  constructor() {
    super();
    this._query = "";
    /** @type {string[]} */
    this._selectedTags = [];
  }

  // Skip shadow DOM: Hugo owns the light-DOM children we filter.
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("jee-search", this._onSearch);
    this.addEventListener("jee-filter-change", this._onFilter);
    this._applyFilters();
  }

  disconnectedCallback() {
    this.removeEventListener("jee-search", this._onSearch);
    this.removeEventListener("jee-filter-change", this._onFilter);
    super.disconnectedCallback();
  }

  get query() {
    return this._query;
  }

  get selectedTags() {
    return [...this._selectedTags];
  }

  _onSearch = (event) => {
    const detail = event && event.detail;
    this._query = detail && detail.value != null ? String(detail.value) : "";
    this._applyFilters();
  };

  _onFilter = (event) => {
    const detail = event && event.detail;
    this._selectedTags =
      detail && Array.isArray(detail.selected) ? detail.selected : [];
    this._applyFilters();
  };

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
