var video = document.getElementById('vidx');
var target = document.getElementById("enter");

// Smart video source selection based on device capabilities
function selectOptimalVideoSource() {
    if (video) {
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        var isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');
        var isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
        
        // Use mobile version for mobile devices, slow connections, or low-end devices
        if (isMobile || isSlowConnection || isLowEndDevice) {
            var mobileSource = video.querySelector('source[media="(max-width: 768px)"]');
            if (mobileSource) {
                video.src = mobileSource.src;
            }
        }
    }
}

// Enhanced video handling for mobile compatibility
function playVideo() {
    if (video && video.paused) {
        video.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
            // For mobile fallback - hide video if it fails
            if (video) {
                video.style.display = 'none';
            }
        });
    }
}

// Check video support and format compatibility
function checkVideoSupport() {
    if (video && video.canPlayType) {
        var canPlay = video.canPlayType('video/mp4; codecs="avc1.42E01E"');
        if (canPlay === '' || canPlay === 'no') {
            console.log('MP4 format not supported, hiding video');
            video.style.display = 'none';
        }
    }
}

function playMedia() {
    target.style.opacity = '0';
    target.addEventListener('transitionend', () => target.remove());
    playVideo();
}

// Initialize video optimization
document.addEventListener('DOMContentLoaded', function() {
    selectOptimalVideoSource();
    checkVideoSupport();
    // Attempt autoplay for desktop
    setTimeout(playVideo, 100);
});

// Add event listeners for video autoplay
document.addEventListener('click', playVideo);
document.addEventListener('touchstart', playVideo, { once: true });
