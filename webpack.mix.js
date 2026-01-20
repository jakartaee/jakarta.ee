/*!
 * Copyright (c) 2018 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Christopher Guindon <chris.guindon@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */

require('./node_modules/eclipsefdn-solstice-assets/webpack-solstice-assets.mix.js');
let mix = require('laravel-mix');
mix.EclipseFdnSolsticeAssets();

mix.setPublicPath('static');
mix.setResourceRoot('../');

// V2 Assets (redesign)
mix.less('./less/v2/styles.less', 'static/css/styles.v2.css');
mix.less('./less/v2/pages/about/why-jakarta-ee/styles.less', 'static/css/why-jakarta-ee-styles.v2.css');
mix.less('./less/v2/pages/learn.less', 'static/css/learn.v2.css');
mix.less('./less/v2/pages/sponsor.less', 'static/css/sponsor.v2.css');
mix.less('./less/v2/pages/contribute.less', 'static/css/contribute.v2.css');
mix.less('./less/v2/pages/mentorship.less', 'static/css/mentorship.v2.css');
mix.js('js/v2/main.js', './static/js/solstice.v2.js');
mix.js('./js/v2/contributor-cards/index.js', './static/js/release-page-cards.v2.js');

// V1 Assets (legacy)
mix.less('./less/v1/styles.less', 'static/css/styles.css');
mix.less('./less/v1/pages/about/why-jakarta-ee/styles.less', 'static/css/why-jakarta-ee-styles.css');
mix.less('./less/v1/pages/learn.less', 'static/css/learn.css');
mix.less('./less/v1/pages/sponsor.less', 'static/css/sponsor.css');
mix.less('./less/v1/pages/contribute.less', 'static/css/contribute.css');
mix.less('./less/v1/pages/mentorship.less', 'static/css/mentorship.css');
mix.js('js/v1/main.js', './static/js/solstice.js');
mix.js('./js/v1/contributor-cards/index.js', './static/js/release-page-cards.js');

