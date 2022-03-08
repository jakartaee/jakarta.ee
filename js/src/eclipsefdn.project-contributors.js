/*!
 * community.js by Christopher Guindon - @chrisguindon
 * Copyright 2013 Eclipse Foundation
 * projects.js by Yi Liu - @yiliu
 * Copyright 2020 Eclipse Foundation
 * http://www.eclipse.org/org/documents/epl-v10.php
 */

import template from '../templates/contributors.mustache';
import Mustache from 'mustache';

const EclipseFdnProjectContributors = (function ($) {

    function getUserProfile(contributor) {
        return $.ajax({
            type: 'GET',
            url: 'https://api.eclipse.org/account/profile/' + contributor.username,
            dataType: 'json',
            cache: true,
            success: function (profile) {}
        });
    }

    $('.eclipsefdn-project-contributors').each(function(index, project_block){
        const project_id = $(this).attr('data-project-id');

        const options = {
            limit: 9999,
            urls: '',
            templateId: '',
            ...$(project_block).data(),
        };
      
        $.ajax({
            type: 'GET',
            url: 'https://projects.eclipse.org/api/projects/' + project_id,
            dataType: 'json',
            cache: true,
            success: function (project) {

                let contributors = [];
                $.each(project[0].committers, function( key, value ) {
                    contributors.push(value);
                });

                $.each(project[0].contributors, function( key, value ) {
                    contributors.push(contributor);
                });

                const promises = [];
                contributors.forEach((element) => promises.push(getUserProfile(element)));

                let results = [];
                Promise.allSettled(promises).then(function (responses) {

                    responses.forEach((el) => {
                        results.push(el.value);
                    });

                    const data = {
                        items: results
                    };
    console.log(results);
                    // Render component
                    let html = '';
                    if (options.templateId !== '' && document.getElementById(options.templateId)) {
                        const theme = document.getElementById(options.templateId).innerHTML;
                        html = Mustache.render(theme, data);
                    } else {
                        html = template(data);
                    }
                    project_block.innerHTML = html;
                });

            },
        });
    });

})(jQuery);
// The global jQuery object is passed as a parameter

export default EclipseFdnProjectContributors;
