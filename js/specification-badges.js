/*!
 * Copyright (c) 2024 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import Mustache from 'mustache';

/**
  * Renders a single widget of specification badges.
  *
  * @param {HTMLElement | undefined} element - If provided an html element, render the widget into it.
  */
const render = async (element) => {
  // If an element was given, use it. Otherwise, query select.
  element = element ?? document.querySelector('.eclipsefdn-specification-badges');
  if (!element) return;
  
  const options = { ...element.dataset };
  if (!options.projectId) {
    console.error('Missing the project id data attribute for eclipsefdn-specification-badges');
    return;
  }
  
  try {
    // Fetch the project based on the given project id.
    const response = await fetch(`https://projects.eclipse.org/api/projects/${options.projectId}`);
    const project = (await response.json()).at(0);
  
    // Render the badges
    element.innerHTML = Mustache.render(`
      <span class="badge">
        <a class="link-unstyled" href="{{url}}">
          <i class="fa fa-archive" aria-hidden="true"></i>
          Project
        </a>
      </span>
      {{#website_url}}
        <span class="badge">
          <a class="link-unstyled" href="{{website_url}}">
            <i class="fa fa-globe" aria-hidden="true"></i>
            Website
          </a>
        </span>
      {{/website_url}}
      {{#video}}
        <span class="badge">
          <a class="link-unstyled" href="{{video}}">
            <i class="fa fa-youtube-play" aria-hidden="true"></i>
            Video Guide
          </a>
        </span>
      {{/video}}
    `, { ...project, video: options.video });
  } catch (error) {
    element.innerHTML = Mustache.render('<span class="badge badge-error">Could not load project</span>');
  }
};

/**
  * Renders all specification badges' widgets on the page.
  */
const renderAll = () => {
  const elements = Array.from(document.querySelectorAll('.eclipsefdn-specification-badges'));
  elements.forEach(render);
};

export default { render, renderAll };
