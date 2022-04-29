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

import 'eclipsefdn-solstice-assets'
import List from 'list.js';

document.addEventListener("DOMContentLoaded", function(event) {
    (function($, document) {

      const matchHeightDropdownMenuItems = () => {
        $('.match-height-dropdown-menu-item').matchHeight({
          byRow: false
        });
      }

      const removeMatchHeightDropdownMenuItems = () => {
        $('.match-height-dropdown-menu-item').matchHeight({
          remove: true
        });
      }

      $(window).on("load", function() {
        if ($(window).width() > 768) {
          matchHeightDropdownMenuItems();
        }
      });

      $(window).on('resize', function () {
        if ($(window).width() > 768) {
          matchHeightDropdownMenuItems();
        }
        else {
          removeMatchHeightDropdownMenuItems();
        }
      });

      var owlSolsticeSlider = $('.solstice-slider');
      owlSolsticeSlider.owlCarousel({
          items:1,
          autoplay:true,
          autoplayTimeout:6000,
          autoplayHoverPause:true,
          autoplaySpeed: 2000,
          loop:true,
      });

      const solsticeSliderHome = () => {
        var owlSolsticeFeaturedStorySlider = $('.solstice-featured-story-slider');
        owlSolsticeFeaturedStorySlider.owlCarousel({
            items:1,
            autoplay:true,
            autoplayTimeout:6000,
            autoplayHoverPause:true,
            autoplaySpeed: 2000,
            loop:true,
        });
      }

      $(window).on("load", function() {
          solsticeSliderHome();
      });

      $(document).ready(function() {
        $('.testimonial-container').html(
          $(".testimonial-item").sort(function(){
            return .5 - Math.random()
          }).slice(0,3).slideDown("slow")
        );

        $('.features-and-benefits-btn').on('click', function(){
          const parent = $(this).parent().parent();
          $(parent).find('.features-and-benefits-text').slideToggle(300, function(){
            if ($(this).is(":hidden")) {
              $.fn.matchHeight._update();
            }
          });
          if ($(parent).is('[style]')) {
            $(parent).removeAttr('style');
          }
          if ($(this).text().toLowerCase() === "learn more") {
            $(this).text('Close');
          }
          else {
            $(this).text('Learn more');
          }
        });
      });


      $('#viewSpecificationSidebar').on('change', function() {
        window.location.href = $('#viewSpecificationSelect').val();
      });

      // Initiate List.js for videos
      const videosList = new List('videos-list', {
        valueNames: ['category'],
        page: 5,
        pagination: true,
        paginationClass: "pagination-videos"
      });

      let updateList = function(){
        const category = $("#video-categories").val();
        if (category == 'none') {
          videosList.filter();
        }
        else {
          videosList.filter(function(item) {
            return (category.includes(item.values().category) || !category);
          });
        }

        // Replace youtube videos
        eclipseFdnVideos.replace();
      }

      // Update list after using the filter
      $("#video-categories").on("change", updateList);

      // Replace youtube videos when pagination is clicked
      $(document).on('click', 'a.page', function() {
        eclipseFdnVideos.replace();
      });

    })(jQuery, document);
});
