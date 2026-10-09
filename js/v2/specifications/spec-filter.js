/*!
 * Copyright (c) 2026 Eclipse Foundation AISBL
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import { LitElement } from "lit";

/**
 * Filters the specification cards on the specifications overview.
 *
 * Hugo renders the cards, the profile `<select>`, a `<jee-search-bar>` and
 * the empty state into the light DOM of this element, so all cards are
 * visible without JavaScript. Like `jee-learning-hub`, this component has no
 * template and only toggles `hidden` on the rendered markup.
 *
 * Each card is a `[data-spec-card]` element with:
 *   - `data-profiles`: space-separated profiles, e.g. "platform webprofile",
 *     or "standalone"
 *   - `data-search`: lowercase text matched against the search query
 *
 * @attr {string} status-template - Screen reader status, `{count}` is
 *   replaced with the number of visible cards.
 */
export class SpecFilter extends LitElement {
  static properties = {
    statusTemplate: { type: String, attribute: "status-template" },
  };

  constructor() {
    super();
    this.statusTemplate = "";
    this._query = "";
    this._profile = "";
  }

  // Skip shadow DOM: Hugo owns the light-DOM children we filter.
  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("jee-search", this._onSearch);
    this.addEventListener("change", this._onChange);
  }

  disconnectedCallback() {
    this.removeEventListener("jee-search", this._onSearch);
    this.removeEventListener("change", this._onChange);
    super.disconnectedCallback();
  }

  _onSearch = (event) => {
    this._query = String(event.detail?.value ?? "");
    this._applyFilters();
  };

  _onChange = (event) => {
    if (!event.target.matches("[data-spec-profile-filter]")) return;
    this._profile = event.target.value;
    this._applyFilters();
  };

  _applyFilters() {
    const query = this._query.trim().toLowerCase();
    let visibleCount = 0;

    this.querySelectorAll("[data-spec-card]").forEach((card) => {
      const profiles = (card.dataset.profiles || "").split(" ");
      const matchesProfile =
        this._profile === "" || profiles.includes(this._profile);
      const matchesQuery =
        query === "" || (card.dataset.search || "").includes(query);
      const visible = matchesProfile && matchesQuery;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });

    const empty = this.querySelector(".spec-filter-empty");
    if (empty) empty.hidden = visibleCount > 0;

    const status = this.querySelector("[data-spec-filter-status]");
    if (status) {
      status.textContent = this.statusTemplate.replace("{count}", visibleCount);
    }
  }

  static register(tagName = "jee-spec-filter") {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, SpecFilter);
    }
  }
}
