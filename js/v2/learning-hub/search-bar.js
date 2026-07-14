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

import { LitElement, html } from "lit";

/**
 * Search bar built on Bootstrap 3's `.form-control` input.
 *
 * Light-DOM Lit element — renders into itself so the global BS3 stylesheet
 * applies. Dispatches a bubbling `jee-search` CustomEvent on every `input`
 * with the current value in `detail.value`. The hosting `jee-learning-hub`
 * (or any other parent) consumes that event.
 *
 * @fires jee-search - Bubbling `{ value: string }` event on every keystroke.
 *
 * @attr {string} placeholder - Placeholder text for the input.
 * @attr {string} label - Accessible label for the input (visually hidden).
 * @attr {string} value - Current value (reflected).
 */
export class SearchBar extends LitElement {
  static properties = {
    placeholder: { type: String },
    label: { type: String },
    value: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.placeholder = "";
    this.label = "";
    this.value = "";
    // Bind explicitly so `this` is the host regardless of how lit-html
    // wires up the listener under the hood.
    this._handleInput = this._handleInput.bind(this);
  }

  /** Render into light DOM so BS3 styles apply. */
  createRenderRoot() {
    return this;
  }

  render() {
    // `for`/`id` pair tie the visually-hidden label to the input. Generating
    // a unique id per instance avoids collisions if multiple bars co-exist.
    const inputId = this._inputId ??= `jee-search-bar-${++SearchBar._idSeq}`;
    return html`
      <label class="sr-only" for=${inputId}>${this.label}</label>
      <div class="input-group glow">
        <input
          id=${inputId}
          type="search"
          class="form-control border-transparent"
          placeholder=${this.placeholder}
          .value=${this.value}
          @input=${this._handleInput}
          autocomplete="off"
        />
        <span class="input-group-addon" aria-hidden="true">
          <i class="fa fa-search"></i>
        </span>
      </div>
    `;
  }

  /**
   * Handle native input events, push the value into state, and notify
   * ancestors.
   * @param {InputEvent} event
   */
  _handleInput(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent("jee-search", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Register this element under a tag name (default `jee-search-bar`).
   * @param {string} [tagName]
   */
  static register(tagName = "jee-search-bar") {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, SearchBar);
    }
  }
}

SearchBar._idSeq = 0;
