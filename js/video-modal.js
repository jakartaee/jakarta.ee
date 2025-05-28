/*!
 * Copyright (c) 2022 Eclipse Foundation, Inc.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * Contributors:
 *   Olivier Goulet <olivier.goulet@eclipse-foundation.org>
 *
 * SPDX-License-Identifier: EPL-2.0
 */

import $ from 'jquery';
window.$ = window.jQuery = $;

/**
 * Sets the video state of a YouTube embed
 * @param {HTMLElement} videoElem
 * @param {'play' | 'pause' | 'stop'} state
 */
const setVideoState = (videoElem, state) => {
  const playerWindow = videoElem.querySelector('iframe')?.contentWindow;

  if (!playerWindow) return;

  const commands = {
    play: 'playVideo',
    pause: 'pauseVideo',
    stop: 'stopVideo',
  };

  const func = commands[state];

  if (!func) return;

  playerWindow.postMessage(
    JSON.stringify({ event: 'command', func, args: [] }),
    '*'
  );
};

export const VideoModal = (() => {
  const videoModal = document.querySelector('.video-modal');
  if (!videoModal) return;

  $(videoModal).on('hidden.bs.modal', () => {
    const videoElem = videoModal.querySelector('.eclipsefdn-video');
    if (videoElem) setVideoState(videoElem, 'pause');
  });

  $(videoModal).on('shown.bs.modal', () => {
    const videoElem = videoModal.querySelector('.eclipsefdn-video');
    if (!videoElem) return;

    videoElem.focus();
    setVideoState(videoElem, 'play');
  });
})();
