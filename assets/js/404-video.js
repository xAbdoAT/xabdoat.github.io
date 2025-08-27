// 404 Page Video Handling
// Enhanced video handling for mobile compatibility

document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('.video-background');
    
    if (video) {
        // Function to play the video
        function playVideo() {
            if (video.paused) {
                video.play().catch(function(error) {
                    console.log('Video autoplay prevented:', error);
                });
            }
        }
        
        // Add event listeners for mobile compatibility
        document.addEventListener('click', playVideo);
        document.addEventListener('touchstart', playVideo, { once: true });
        
        // Try to play on page load (works on desktop)
        playVideo();
    }
});