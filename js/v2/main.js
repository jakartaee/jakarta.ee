/*!
 * Copyright (c) 2021 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Eric Poirier <eric.poirier@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import "eclipsefdn-solstice-assets";
import List from "list.js";
import "./video-modal";
import "./components/jee-popover";
import eclipsefdnSpecificationBadges from "./specification-badges";
import { setupTopIntersection } from "./top-intersection";
import setupMobileMegaMenu from "./mobile-mega-menu";
import scrollSnapCarousel from "./scroll-snap-carousel";
import { setupRotatingText } from "./rotating-text";
import { FeaturedStoryPopup } from "@eclipsefdn/solstice-components";
import fadeGroup from 'eclipsefdn-solstice-assets/js/animations/fade-group';
import "./learning-hub";

FeaturedStoryPopup.register();

document.addEventListener("DOMContentLoaded", function () {
  (function ($, document) {
    eclipsefdnSpecificationBadges.renderAll();

    fadeGroup.init();

    setupTopIntersection();
    setupRotatingText();

    // Initialize scroll snap carousels for home
    scrollSnapCarousel(
      ".testimonial-container:not(.join-us-page-testimonials)",
      ".testimonial-item",
    );
    scrollSnapCarousel(".news-container", "article", {
      useMutationObserver: true,
    });
    scrollSnapCarousel(
      ".testimonial-container.join-us-page-testimonials",
      ".testimonial-item",
      {
        autoRotate: true,
        autoRotateInterval: 3000,
      },
    );
    scrollSnapCarousel(".scroll-image-carousel", ".scroll-image", {
      autoRotate: true,
      autoRotateInterval: 2000,
      controls: false,
    });

    // Initialize Mobile Mega Menu
    setupMobileMegaMenu();

    const matchHeightDropdownMenuItems = () => {
      $(".match-height-dropdown-menu-item").matchHeight({
        byRow: false,
      });
    };

    const removeMatchHeightDropdownMenuItems = () => {
      $(".match-height-dropdown-menu-item").matchHeight({
        remove: true,
      });
    };

    $(window).on("load", function () {
      if ($(window).width() > 768) {
        matchHeightDropdownMenuItems();
      }
    });

    $(window).on("resize", function () {
      if ($(window).width() > 768) {
        matchHeightDropdownMenuItems();
      } else {
        removeMatchHeightDropdownMenuItems();
      }
    });

    var owlSolsticeSlider = $(".solstice-slider");
    owlSolsticeSlider.owlCarousel({
      items: 1,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      autoplaySpeed: 2000,
      loop: true,
    });

    $(document).ready(function () {
      $(".features-and-benefits-btn").on("click", function () {
        const parent = $(this).parent().parent();
        $(parent)
          .find(".features-and-benefits-text")
          .slideToggle(300, function () {
            if ($(this).is(":hidden")) {
              $(parent)
                .removeClass("match-height-item-active")
                .addClass("match-height-item-closed");
            } else {
              $(parent)
                .removeClass("match-height-item-closed")
                .addClass("match-height-item-active");
            }
            // Update match height if all items are active
            if ($(".feature-box.match-height-item-active").length > 1) {
              $.fn.matchHeight._apply(".match-height-item-active");
            }
            if ($(".feature-box.match-height-item-closed").length > 1) {
              $.fn.matchHeight._apply(".match-height-item-closed");
            }
            if (
              $(".feature-box.match-height-item-active").length === 0 ||
              $(".feature-box.match-height-item-active").length ==
                $(".feature-box").length
            ) {
              $.fn.matchHeight._update();
            }
          });
        if ($(parent).is("[style]")) {
          $(parent).removeAttr("style");
        }
        if ($(this).text().toLowerCase() === "learn more") {
          $(this).text("Close");
        } else {
          $(this).text("Learn more");
        }
      });
    });

    $("#viewSpecificationSidebar").on("change", function () {
      window.location.href = $("#viewSpecificationSelect").val();
    });

    // Initiate List.js for videos
    const videosList = new List("videos-list", {
      valueNames: ["category"],
      page: 5,
      pagination: true,
      paginationClass: "pagination-videos",
    });

    let updateList = function () {
      const category = $("#video-categories").val();
      if (category == "none") {
        videosList.filter();
      } else {
        videosList.filter(function (item) {
          return category.includes(item.values().category) || !category;
        });
      }

      // Replace youtube videos
      eclipseFdnVideos.replace();
    };

    // Update list after using the filter
    $("#video-categories").on("change", updateList);

    // Replace youtube videos when pagination is clicked
    $(document).on("click", "a.page", function () {
      eclipseFdnVideos.replace();
    });
  })(jQuery, document);
});
