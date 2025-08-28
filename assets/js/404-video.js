// 404 Page Video Handling
// Enhanced video handling for mobile compatibility

document.addEventListener('DOMContentLoaded', function() {
    var video = document.querySelector('.video-background');
    
    if (video) {
        // Smart video source selection based on device capabilities
        function selectOptimalVideoSource() {
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
        
        // Check video support and format compatibility
        function checkVideoSupport() {
            if (video.canPlayType) {
                var canPlay = video.canPlayType('video/mp4; codecs="avc1.42E01E"');
                if (canPlay === '' || canPlay === 'no') {
                    console.log('MP4 format not supported, hiding video');
                    video.style.display = 'none';
                }
            }
        }
        
        // Function to play the video
        function playVideo() {
            if (video.paused) {
                video.play().catch(function(error) {
                    console.log('Video autoplay prevented:', error);
                    // For mobile fallback - hide video if it fails
                    video.style.display = 'none';
                });
            }
        }
        
        // Initialize video optimization
        selectOptimalVideoSource();
        checkVideoSupport();
        
        // Add event listeners for mobile compatibility
        document.addEventListener('click', playVideo);
        document.addEventListener('touchstart', playVideo, { once: true });
        
        // Try to play on page load (works on desktop)
        setTimeout(playVideo, 100);
    }
});