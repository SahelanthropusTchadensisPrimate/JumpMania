let slideIndex = 0;
const slides = document.querySelectorAll('.skyhop_slide');
const totalSlides = slides.length;

function showSlide(index) {
  if (index < 0) {
    slideIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    slideIndex = 0;
  } else {
    slideIndex = index;
  }

  const offset = -slideIndex * 300;
  document.querySelector('.skyhop_slides').style.transform = `translateX(${offset}px)`;
}

setInterval(() => {
  showSlide(slideIndex + 1);
}, 3000);
