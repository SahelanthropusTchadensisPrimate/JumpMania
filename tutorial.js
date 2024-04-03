// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Carousel functionality for Skyhop
    let skyhopSlideIndex = 0;
    const skyhopSlides = document.querySelectorAll('.skyhop_slide');
    const skyhopTotalSlides = skyhopSlides.length;
  
    function showSkyhopSlide(index) {
      if (index < 0) {
        skyhopSlideIndex = skyhopTotalSlides - 1;
      } else if (index >= skyhopTotalSlides) {
        skyhopSlideIndex = 0;
      } else {
        skyhopSlideIndex = index;
      }
  
      const skyhopOffset = -skyhopSlideIndex * 300;
  
      document.querySelector('.skyhop_slides').style.transform = `translateX(${skyhopOffset}px)`;
    }
  
    setInterval(() => {
      showSkyhopSlide(skyhopSlideIndex + 1);
    }, 3000);

    // Carousel functionality for Trail Dash
    const trailDashCarousels = document.querySelectorAll('.trail_dash_carousel');

    trailDashCarousels.forEach(carousel => {
        let trailDashSlideIndex = 0;
        const trailDashSlides = carousel.querySelectorAll('.trail_dash_slide');
        const trailDashTotalSlides = trailDashSlides.length;
    
        function showTrailDashSlide(index) {
          if (index < 0) {
            trailDashSlideIndex = trailDashTotalSlides - 1;
          } else if (index >= trailDashTotalSlides) {
            trailDashSlideIndex = 0;
          } else {
            trailDashSlideIndex = index;
          }

          const trailDashOffset = -trailDashSlideIndex * 300;

          carousel.querySelector('.trail_dash_slides').style.transform = `translateX(${trailDashOffset}px)`;
        }
      
        setInterval(() => {
          showTrailDashSlide(trailDashSlideIndex + 1);
        }, 3000);
    });

    // Carousel functionality for Tower Climber
    let towerClimberSlideIndex = 0;
    const towerClimberSlides = document.querySelectorAll('.tower_climber_slide');
    const towerClimberTotalSlides = towerClimberSlides.length;
  
    function showTowerClimberSlide(index) {
      if (index < 0) {
        towerClimberSlideIndex = towerClimberTotalSlides - 1;
      } else if (index >= towerClimberTotalSlides) {
        towerClimberSlideIndex = 0;
      } else {
        towerClimberSlideIndex = index;
      }

      const towerClimberOffset = -towerClimberSlideIndex * 300;
  
      document.querySelector('.tower_climber_slides').style.transform = `translateX(${towerClimberOffset}px)`;
    }
  
    setInterval(() => {
      showTowerClimberSlide(towerClimberSlideIndex + 1);
    }, 3000);
});
