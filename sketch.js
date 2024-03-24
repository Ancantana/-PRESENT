document.addEventListener('DOMContentLoaded', function() {
    const captureVideo = document.getElementById('captureVideo');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let isPlaying = false;

    function captureFrame() {
        if (isPlaying) {
            canvas.width = captureVideo.videoWidth;
            canvas.height = captureVideo.videoHeight;
            context.drawImage(captureVideo, 0, 0, canvas.width, canvas.height);
            captureVideo.pause();  // Pause the video after capturing the frame
            isPlaying = false;
        }
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            captureVideo.srcObject = stream;
            captureVideo.addEventListener('play', () => {
                isPlaying = true;
                captureFrame();  // Capture the initial frame
            });
        })
        .catch(function(error) {
            console.error("Error accessing the webcam: ", error);
        });

    const textInput = document.getElementById('textInput');
    textInput.addEventListener('input', function() {
        if (!isPlaying) {
            captureVideo.play();  // Play the video to get the latest frame
            isPlaying = true;
        }
    });
});

