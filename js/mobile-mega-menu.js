/*!
 * Copyright (c) 2025 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 */

/**
 * Mobile Mega Menu Handler
 * Manages mobile menu navigation including main menu and subpages
 */

const isMobile = () => window.innerWidth <= 768;

/**
 * Shows a mobile menu page (either main menu or subpage)
 */
const showPage = (page) => {
  page.classList.add('active');
  document.body.style.overflow = 'hidden';
};

/**
 * Hides a mobile menu page
 */
const hidePage = (page) => {
  page.classList.remove('active');
  document.body.style.overflow = '';
};

/**
 * Closes all mobile menu pages and resets state
 */
const closeAllPages = () => {
  document.querySelectorAll('.mobile-main-menu-page, .mega-menu-mobile-page').forEach(hidePage);
};

const setupEventListeners = () => {
  // Hamburger button - opens main mobile menu
  const navbarToggle = document.querySelector('.navbar-toggle');
  const mobileMainMenu = document.querySelector('.mobile-main-menu-page');
  
  navbarToggle?.addEventListener('click', (e) => {
    if (isMobile()) {
      e.preventDefault();
      showPage(mobileMainMenu);
    }
  });

  // Main menu close button - closes everything
  document.querySelector('.mobile-menu-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeAllPages();
  });

  // Menu item clicks in main menu - opens corresponding subpage
  document.querySelectorAll('.mobile-menu-items .menu-item > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (!isMobile()) return;
      
      e.preventDefault();
      const subpage = link.parentElement.querySelector('.mega-menu-mobile-page');
      
      if (subpage) showPage(subpage);
    });
  });

  // Back button in subpages - returns to main menu
  document.querySelectorAll('.mega-menu-back-to-main').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const subpage = button.closest('.mega-menu-mobile-page');
      if (subpage) hidePage(subpage);
    });
  });

  // Close button in subpages - closes everything
  document.querySelectorAll('.mega-menu-mobile-page .mega-menu-close').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllPages();
    });
  });
};

/**
 * Handles window resize - cleans up mobile menu state on desktop
 */
const setupResizeHandler = () => {
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isMobile()) closeAllPages();
    }, 250);
  });
};

export default function setupMobileMegaMenu() {
  setupEventListeners();
  setupResizeHandler();
  
  // Ensure clean state on load
  if (isMobile()) closeAllPages();
}
