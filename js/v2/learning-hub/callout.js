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
 * Small CTA callout card — atom icon, short message, outlined orange button.
 *
 * Used in the Learning Hub sidebar under the filter list to point readers
 * toward https://start.jakarta.ee/. Light DOM so the surrounding BS3/site
 * styles apply.
 *
 * Source: Figma node `7927:3`. The icon is served from
 * `content/learn/images/icon-atom.svg`.
 *
 * @attr {string} message - The body text.
 * @attr {string} cta - Button label.
 * @attr {string} href - Button target URL.
 */
export class Callout extends LitElement {
  static properties = {
    message: { type: String },
    cta: { type: String },
    href: { type: String },
  };

  constructor() {
    super();
    this.message = "";
    this.cta = "";
    this.href = "";
  }

  /** Render into light DOM. */
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <img class="jee-callout-icon" src="/learn/images/icon-atom.svg" alt="" aria-hidden="true" />
      <p class="jee-callout-message">${this.message}</p>
      <a class="btn btn-outline-secondary jee-callout-cta" href=${this.href}>
        <span>${this.cta}</span>
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </a>
    `;
  }

  /**
   * Register this element under a tag name (default `jee-callout`).
   * @param {string} [tagName]
   */
  static register(tagName = "jee-callout") {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, Callout);
    }
  }
}
