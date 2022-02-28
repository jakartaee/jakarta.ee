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

      var owl = $('.solstice-slider');
      owl.owlCarousel({
          items:1,
          autoplay:true,
          autoplayTimeout:6000,
          autoplayHoverPause:true,
          autoplaySpeed: 2000,
          loop:true,
      });

      $(document).ready(function() {
        $('.testimonial-container').html(
          $(".testimonial-item").sort(function(){
            return .5 - Math.random()
          }).slice(0,3).slideDown("slow")
        );
      });


      $('#viewSpecificationSidebar').on('change', function() {
        window.location.href = $('#viewSpecificationSelect').val();
      });

      const options = {
        valueNames: ['category'],
        page: 5,
        pagination: true
      };
      
      const videosList = new List('videos-list', options);
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
      }
      $("#video-categories").on("change", updateList);
    })(jQuery, document);
});