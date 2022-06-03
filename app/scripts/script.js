//----------------------HAMBURGER, OVERLAY, SIDEMENU-----------------------//

const hamburger = document.getElementById("hamburger");
const sidemenu = document.getElementById("nav__sidemenu");
const closeHamburger = document.getElementById("close__button");
const overlay = document.getElementById("overlay");

const toggleSidemenu = () => {
    sidemenu.classList.toggle('active');
    sidemenu.classList.toggle('hide');
    overlay.classList.toggle('active');
    overlay.classList.toggle('hide');
}

hamburger.addEventListener('click', toggleSidemenu);
closeHamburger.addEventListener('click', toggleSidemenu);
overlay.addEventListener('click', toggleSidemenu);

//----------------------CAROUSEL-----------------------//

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".carousel__button--prev");
const nextButton = document.querySelector(".carousel__button--next");
let counter = 0;

const moveToSlide = (currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + counter * 100 + "%)";
    currentSlide.classList.remove("current__slide");
    targetSlide.classList.add("current__slide");
}

nextButton.addEventListener('click', (event) => {
    if(counter == slides.length - 1)
        return;
    const currentSlide = track.querySelector(".current__slide");
    const nextSlide = currentSlide.nextElementSibling;
    counter++;

    moveToSlide(currentSlide, nextSlide);
});

prevButton.addEventListener('click', (e) => {
    if (counter == 0)
        return;

    const currentSlide = track.querySelector(".current__slide");
    const prevSlide = currentSlide.previousElementSibling;
    counter--;

    moveToSlide(currentSlide, prevSlide);    
});