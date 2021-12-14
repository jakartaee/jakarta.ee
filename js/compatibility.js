/**
 * compare.js
 *
 * Copyright (c) 2015 Eclipse Foundation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Christopher Guindon (Eclipse Foundation)- initial API and implementation
 */
const jakartaEECompatibility = (function ($, document) {

    let certification_results = {};

    $('.jakarta-version').on("click", function() {

        // Reset the value of the certification results array 
        certification_results = {};

        // Reset the default values for all the other blocks on the page
        $('.certification-results').prop('disabled', true);
        $('.certification-results').html('<option class="selected" value="" selected="selected">Server Version</option>');
        $('.certification-link').attr('disabled', 'disabled');
        $('.certification-download').attr('disabled', 'disabled');

        const selected_version = $(this).val();
        const parent_name = $(this).parent().attr('id');
        const certification_results_select = $(this).parent().find('.certification-results');

        $.get("/js/compatible_products.json")
        .done(function(json) { 
            $(json.sets).each(function(index, version){
                if (selected_version == version.jakartaee_version) {
                    $(version.items).each(function(index, version_item){
                        $(version_item.items).each(function(index, item){
                            let name = item.name.toLowerCase().replace(/ /g, "-");
                            if (parent_name == name) {
                                certification_results = item.versions;
                                certification_results_select.removeAttr('disabled');
                                certification_results_select.html('<option class="selected" value="" selected="selected">Server Version</option>');
                                $(item.versions).each(function(index, version){
                                    let option = $('<option></option>');
                                    option.text(version.version);
                                    certification_results_select.append(option);
                                });
                            }
                        });
                    });
                }
            });
        }).fail(function() {
            console.log("File does not exist");
        });
    }); 

    $('.certification-results').on("click", function() {

        const certification_link = $(this).parent().find('.certification-link');
        const certification_download = $(this).parent().find('.certification-download');
        const certification_results_select = $(this).parent().find('.certification-results').val();

        $(certification_results).each(function(index, item){
            if (item.version == certification_results_select) {
                certification_link.attr('href', item.compatibility);
                certification_link.removeAttr('disabled');
                certification_download.attr('href', item.download_url);
                certification_download.removeAttr('disabled');
            }
        });
    });

})(jQuery, document);
  
export default jakartaEECompatibility;