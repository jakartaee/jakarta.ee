/**
 * Copyright (c) 2026 Eclipse Foundation AISBL
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import { LitElement, html, css } from "lit";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const PLACEMENTS = new Set([
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
]);

export class Popover extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    [part="popover"] {
      position: fixed;
      top: 0;
      left: 0;
      margin: 0;
      z-index: 1000;
    }

    [part="popover"][hidden] {
      display: none;
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
    placement: { type: String, reflect: true },
    offset: { type: Number },
    htmlFor: { type: String, reflect: true, attribute: "for" },
  };

  constructor() {
    super();
    this.open = false;
    this.placement = "bottom-start";
    this.offset = 8;
    this.htmlFor = null;

    this._triggerElement = null;
    this._previouslyFocused = null;

    this._onTriggerClick = this._onTriggerClick.bind(this);
    this._onDocumentPointerDown = this._onDocumentPointerDown.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onViewportChange = this._onViewportChange.bind(this);
    this._onFocusOut = this._onFocusOut.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._resolveTrigger();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._detachTrigger();
    this._removeGlobalListeners();
  }

  updated(changed) {
    if (changed.has("htmlFor")) {
      this._resolveTrigger();
    }
    if (changed.has("open")) {
      if (this.open) {
        this._onOpen();
      } else {
        this._onClose(changed.get("open"));
      }
    }
    if (this.open && (changed.has("placement") || changed.has("offset"))) {
      this._reposition();
    }
  }

  render() {
    return html`
      <div
        part="popover"
        role="dialog"
        ?hidden=${!this.open}
        @keydown=${this._onKeyDown}
        @click=${this._onContentClick}
      >
        <slot></slot>
      </div>
    `;
  }

  _onContentClick(event) {
    const closer = event.composedPath().find(
      (node) => node.nodeType === 1 && node.hasAttribute && node.hasAttribute("data-popover-close"),
    );
    if (closer) {
      event.preventDefault();
      this.hide();
    }
  }

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  toggle() {
    this.open = !this.open;
  }

  /**
   * Resolved trigger element. Set programmatically to override the `for` lookup;
   * pass `null` to fall back to `for`.
   */
  get triggerElement() {
    return this._triggerElement;
  }

  set triggerElement(element) {
    this._detachTrigger();
    this._triggerElement = element || null;
    if (this._triggerElement) {
      this._attachTrigger();
    } else {
      this._resolveTrigger();
    }
  }

  _resolveTrigger() {
    this._detachTrigger();
    this._triggerElement = null;
    if (this.htmlFor) {
      const root = this.getRootNode();
      const scope =
        root instanceof Document || root instanceof ShadowRoot ? root : document;
      this._triggerElement = scope.getElementById(this.htmlFor);
    }
    this._attachTrigger();
  }

  _attachTrigger() {
    const trigger = this._triggerElement;
    if (!trigger) return;
    trigger.addEventListener("click", this._onTriggerClick);
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", String(this.open));
    if (this.id) {
      trigger.setAttribute("aria-controls", this.id);
    }
  }

  _detachTrigger() {
    const trigger = this._triggerElement;
    if (!trigger) return;
    trigger.removeEventListener("click", this._onTriggerClick);
    trigger.removeAttribute("aria-haspopup");
    trigger.removeAttribute("aria-expanded");
    trigger.removeAttribute("aria-controls");
  }

  _onTriggerClick(event) {
    event.preventDefault();
    // `event.detail === 0` means the click came from a keyboard activation
    // (Enter/Space). Anything else is a pointer click — in that case we leave
    // focus on the trigger so the user isn't yanked into the popover.
    this._skipInitialFocus = event.detail > 0;
    this.toggle();
  }

  _onOpen() {
    this._previouslyFocused = this._getActiveElement();
    if (this._triggerElement) {
      this._triggerElement.setAttribute("aria-expanded", "true");
    }
    this._addGlobalListeners();
    this.updateComplete.then(() => {
      this._reposition();
      if (!this._skipInitialFocus) {
        this._focusInitial();
      }
      this._skipInitialFocus = false;
      this.dispatchEvent(
        new CustomEvent("popover-open", { bubbles: true, composed: true }),
      );
    });
  }

  _onClose(wasOpen) {
    if (this._triggerElement) {
      this._triggerElement.setAttribute("aria-expanded", "false");
    }
    this._removeGlobalListeners();
    if (wasOpen) {
      this._restoreFocus();
      this.dispatchEvent(
        new CustomEvent("popover-close", { bubbles: true, composed: true }),
      );
    }
  }

  _addGlobalListeners() {
    document.addEventListener("pointerdown", this._onDocumentPointerDown, true);
    document.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("resize", this._onViewportChange);
    window.addEventListener("scroll", this._onViewportChange, true);
    this.addEventListener("focusout", this._onFocusOut);
  }

  _removeGlobalListeners() {
    document.removeEventListener("pointerdown", this._onDocumentPointerDown, true);
    document.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("resize", this._onViewportChange);
    window.removeEventListener("scroll", this._onViewportChange, true);
    this.removeEventListener("focusout", this._onFocusOut);
  }

  _onFocusOut(event) {
    if (!this.open) return;
    const next = event.relatedTarget;
    if (!next) return; // window blur / focus lost — leave popover alone
    if (next === this._triggerElement) return;
    if (this.contains(next)) return;
    this.hide();
  }

  _onDocumentPointerDown(event) {
    if (!this.open) return;
    const path = event.composedPath();
    if (path.includes(this) || path.includes(this._triggerElement)) {
      return;
    }
    this.hide();
  }

  _onKeyDown(event) {
    if (!this.open) return;
    if (event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }

  _onViewportChange() {
    if (this.open) {
      this._reposition();
    }
  }

  _getPopoverElement() {
    return this.renderRoot && this.renderRoot.querySelector('[part="popover"]');
  }

  _getFocusableElements() {
    const slot = this.renderRoot && this.renderRoot.querySelector("slot");
    const assigned = slot ? slot.assignedElements({ flatten: true }) : [];
    const focusable = [];
    for (const node of assigned) {
      if (node.matches && node.matches(FOCUSABLE_SELECTOR)) {
        focusable.push(node);
      }
      if (node.querySelectorAll) {
        focusable.push(...node.querySelectorAll(FOCUSABLE_SELECTOR));
      }
    }
    return focusable.filter(
      (el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0,
    );
  }

  _focusInitial() {
    const focusable = this._getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
      return;
    }
    const popover = this._getPopoverElement();
    if (popover) {
      popover.setAttribute("tabindex", "-1");
      popover.focus();
    }
  }

  _restoreFocus() {
    const target = this._previouslyFocused;
    this._previouslyFocused = null;
    // Only return focus when nothing else has grabbed it (e.g., a closing
    // X-button or Escape leaves the active element on <body>). If the user
    // tabbed or clicked away, leave focus wherever it already moved to.
    const active = this._getActiveElement();
    if (active && active !== document.body && active !== document.documentElement) {
      return;
    }
    if (target && typeof target.focus === "function" && target.isConnected) {
      target.focus();
    } else if (this._triggerElement) {
      this._triggerElement.focus();
    }
  }

  _getActiveElement() {
    let active = document.activeElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) {
      active = active.shadowRoot.activeElement;
    }
    return active;
  }

  _reposition() {
    const popover = this._getPopoverElement();
    const trigger = this._triggerElement;
    if (!popover || !trigger || !this.open) return;

    const placement = PLACEMENTS.has(this.placement) ? this.placement : "bottom-start";
    const triggerRect = trigger.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const offset = Number.isFinite(this.offset) ? this.offset : 0;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const edgePadding = 8;

    let [side, alignment = "center"] = placement.split("-");

    // Flip to the opposite side when the preferred one doesn't fit and the
    // opposite has more room.
    if (side === "bottom" || side === "top") {
      const spaceBelow = viewportHeight - triggerRect.bottom - offset;
      const spaceAbove = triggerRect.top - offset;
      if (side === "bottom" && spaceBelow < popoverRect.height && spaceAbove > spaceBelow) {
        side = "top";
      } else if (side === "top" && spaceAbove < popoverRect.height && spaceBelow > spaceAbove) {
        side = "bottom";
      }
    } else {
      const spaceRight = viewportWidth - triggerRect.right - offset;
      const spaceLeft = triggerRect.left - offset;
      if (side === "right" && spaceRight < popoverRect.width && spaceLeft > spaceRight) {
        side = "left";
      } else if (side === "left" && spaceLeft < popoverRect.width && spaceRight > spaceLeft) {
        side = "right";
      }
    }

    let top = 0;
    let left = 0;

    switch (side) {
      case "top":
        top = triggerRect.top - popoverRect.height - offset;
        left = this._alignHorizontal(triggerRect, popoverRect, alignment);
        break;
      case "bottom":
        top = triggerRect.bottom + offset;
        left = this._alignHorizontal(triggerRect, popoverRect, alignment);
        break;
      case "left":
        left = triggerRect.left - popoverRect.width - offset;
        top = this._alignVertical(triggerRect, popoverRect, alignment);
        break;
      case "right":
        left = triggerRect.right + offset;
        top = this._alignVertical(triggerRect, popoverRect, alignment);
        break;
    }

    // Clamp inside the viewport so the popover never spills past the edges.
    const maxLeft = Math.max(edgePadding, viewportWidth - popoverRect.width - edgePadding);
    const maxTop = Math.max(edgePadding, viewportHeight - popoverRect.height - edgePadding);
    left = Math.max(edgePadding, Math.min(left, maxLeft));
    top = Math.max(edgePadding, Math.min(top, maxTop));

    popover.style.top = `${Math.round(top)}px`;
    popover.style.left = `${Math.round(left)}px`;
  }

  _alignHorizontal(triggerRect, popoverRect, alignment) {
    if (alignment === "start") return triggerRect.left;
    if (alignment === "end") return triggerRect.right - popoverRect.width;
    return triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
  }

  _alignVertical(triggerRect, popoverRect, alignment) {
    if (alignment === "start") return triggerRect.top;
    if (alignment === "end") return triggerRect.bottom - popoverRect.height;
    return triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
  }
}

if (!customElements.get("jee-popover")) {
  customElements.define("jee-popover", Popover);
}
