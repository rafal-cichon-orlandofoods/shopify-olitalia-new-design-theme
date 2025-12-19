document.addEventListener('DOMContentLoaded', function () {
  const videoContainers = document.querySelectorAll('.product-item__video-container');

  videoContainers.forEach(container => {
    const video = container.querySelector('.product-item__video');

    if (video) {
      // Ensure video is ready to play
      video.load();

      container.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Video play failed:', error);
          });
        }
      });

      container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });
});