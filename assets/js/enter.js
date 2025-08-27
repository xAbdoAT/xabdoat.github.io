var video = document.getElementById('vidx');
var target = document.getElementById("enter");

// Enhanced video handling for mobile compatibility
function playVideo() {
    if (video && video.paused) {
        video.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
        });
    }
}

function playMedia() {
    target.style.opacity = '0';
    target.addEventListener('transitionend', () => target.remove());
    playVideo();
}

// Add event listeners for video autoplay
document.addEventListener('click', playVideo);
document.addEventListener('DOMContentLoaded', playVideo);
document.addEventListener('touchstart', playVideo, { once: true });
