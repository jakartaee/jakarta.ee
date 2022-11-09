export const VideoModal = (() => {
    const videoModal = document.querySelector('.video-modal');

    const pauseVideo = (videoElem) => {
        videoElem
            .querySelector('iframe')
            .contentWindow
            .postMessage(
                JSON.stringify({
                    event: "command",
                    func: "pauseVideo",
                }), 
            '*');
    }

    $(videoModal).on('hidden.bs.modal', () => {
        const videoElem = videoModal.querySelector('.eclipsefdn-video-with-js');

        if (!videoElem) return;

        pauseVideo(videoElem);
    });
})();