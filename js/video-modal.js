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