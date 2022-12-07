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

/**
 * Sets the video state of a YouTube embed
 * @param {HTMLElement} videoElem 
 * @param {'play' | 'pause' | 'stop' } state 
 */
const setVideoState = (videoElem, state) => {
    const videoPlayer = videoElem.querySelector('iframe');

    if (!videoPlayer) return;

    let func;

    switch (state) {
        case 'play':
            func = 'playVideo';
            break;
        case 'pause':
            func = 'pauseVideo';
            break;
        case 'stop':
            func = 'stopVideo';
            break;
        default:
            return;
    };

    videoPlayer.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func,
        }), 
    '*');

    return;
};

export const VideoModal = (() => {
    const videoModal = document.querySelector('.video-modal');

    $(videoModal).on('hidden.bs.modal', () => {
        const videoElem = videoModal.querySelector('.eclipsefdn-video');

        if (!videoElem) return;

        setVideoState(videoElem, 'pause');
    });

    $(videoModal).on('shown.bs.modal', () => {
        const videoElem = videoModal.querySelector('.eclipsefdn-video');
        videoElem.focus();

        if (!videoElem) return;

        setVideoState(videoElem, 'play');
    });

    return;
})();