//----------------------HAMBURGER, OVERLAY, SIDEMENU-----------------------//

const hamburger = document.getElementById("hamburger");
const sidemenu = document.getElementById("nav__sidemenu");
const closeHamburger = document.getElementById("close__button");
const overlay = document.getElementById("overlay");

const carousel = document.querySelector(".carousel");

const toggleSidemenuOrCarousel = () => {
    //For width <= 639px we have to toggle sidemenu with overlay, but for the width > 639px, 
    //carousel needs to be toggled.
    if(window.innerWidth <= 639) {
        sidemenu.classList.toggle('active');
        sidemenu.classList.toggle('hide');
    } 
    else {
        carousel.classList.toggle("hide__for__desktop");
    }

    overlay.classList.toggle('active');
    overlay.classList.toggle('hide');
}

hamburger.addEventListener('click', toggleSidemenuOrCarousel);
closeHamburger.addEventListener('click', toggleSidemenuOrCarousel);
overlay.addEventListener('click', toggleSidemenuOrCarousel);

//----------------------DISPLAY THE SELECTED IMAGE-----------------------//

const selectedImage = document.querySelector(".hero__images__selected").firstElementChild;
const thumnailContainer = document.querySelector(".thumbnails");
const thumbnailImages = Array.from(thumnailContainer.children);
let activeThumbnail = thumbnailImages[0];

thumbnailImages.forEach(img => {
    img.addEventListener('click', (event) => {
        const newlySelectedImageSource = event.target.getAttribute('src').substring(0, 24) + ".jpg";
        selectedImage.setAttribute('src', newlySelectedImageSource);

        activeThumbnail = getNewActiveThumbnail(activeThumbnail, event.target);
    });
});

//----------------------RENDER THE SELECTED IMAGE ON OVERLAY-----------------------//

const overlayThumbnails = Array.from(document.getElementById("overlay-thumbnails").children);
let activeOverlayThumbnail = overlayThumbnails[0];

overlayThumbnails.forEach(img => {
    img.addEventListener('click', (event) => {
        let index = 0;
        for(index = 0; index < overlayThumbnails.length; index++) {
            if(overlayThumbnails[index] === event.target)
                break;
        }

        const currentSlide = track.querySelector(".current__slide");
        const targetSlide = slides[index];
        counter = index;
        moveToSlide(currentSlide, targetSlide, index);

        activeOverlayThumbnail = getNewActiveThumbnail(activeOverlayThumbnail, event.target);
    })
});

selectedImage.addEventListener('click', (event) => {
    overlay.classList.toggle("active");
    overlay.classList.toggle("hide");

    carousel.classList.toggle("hide__for__desktop");

    const carouselImages = carousel.querySelectorAll(".carousel__image");
    let indexOfImageToRenderInOverlay = 0;

    for (let i = 0; i < carouselImages.length; i++) {
        if (event.target.getAttribute('src') === carouselImages[i].getAttribute('src')) {
            indexOfImageToRenderInOverlay = i;
            break;
        }
    }

    const currentSlide = track.querySelector(".current__slide");
    const targetSlide = slides[indexOfImageToRenderInOverlay];
    counter = indexOfImageToRenderInOverlay;
    moveToSlide(currentSlide, targetSlide, indexOfImageToRenderInOverlay);

    for(let i = 0; i < overlayThumbnails.length; i++) {
        const correspondingThumbnail = event.target.getAttribute('src').substring(0, 24) + "-thumbnail.jpg";
        if(overlayThumbnails[i].getAttribute('src') === correspondingThumbnail) {
            activeOverlayThumbnail = getNewActiveThumbnail(activeOverlayThumbnail, overlayThumbnails[i]);
            break;
        }
    }
});

//----------------------CAROUSEL-----------------------//

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const prevButton = document.querySelector(".carousel__button--prev");
const nextButton = document.querySelector(".carousel__button--next");

const carouselCloseButton = carousel.querySelector(".carousel__close-button");
let counter = 0;

const moveToSlide = (currentSlide, targetSlide, slideIndex) => {
    track.style.transform = "translateX(-" + slideIndex * 100 + "%)";
    currentSlide.classList.remove("current__slide");
    targetSlide.classList.add("current__slide");
}

const getNewActiveThumbnail = (currentThumbnail, newThumbnail) => {
    currentThumbnail.classList.remove("active__thumbnail");
    newThumbnail.classList.add("active__thumbnail");

    return newThumbnail;
}

carouselCloseButton.addEventListener('click', (event) => {
    carousel.classList.toggle('hide__for__desktop');
    overlay.classList.toggle('active');
    overlay.classList.toggle('hide');
});

nextButton.addEventListener('click', (event) => {
    if(counter == slides.length - 1)
        return;
    const currentSlide = track.querySelector(".current__slide");
    const nextSlide = currentSlide.nextElementSibling;
    counter++;

    moveToSlide(currentSlide, nextSlide, counter);

    for(let i = 0; i < overlayThumbnails.length; i++) {
        const correspondingThumbnail = nextSlide.querySelector(".carousel__image").getAttribute('src').substring(0, 24) + "-thumbnail.jpg";
        if(overlayThumbnails[i].getAttribute('src') === correspondingThumbnail) {
            activeOverlayThumbnail = getNewActiveThumbnail(activeOverlayThumbnail, overlayThumbnails[i]);
            break;
        }
    }
});

prevButton.addEventListener('click', (e) => {
    if (counter == 0)
        return;

    const currentSlide = track.querySelector(".current__slide");
    const prevSlide = currentSlide.previousElementSibling;
    counter--;

    moveToSlide(currentSlide, prevSlide, counter);    

    for(let i = 0; i < overlayThumbnails.length; i++) {
        const correspondingThumbnail = prevSlide.querySelector(".carousel__image").getAttribute('src').substring(0, 24) + "-thumbnail.jpg";
        if(overlayThumbnails[i].getAttribute('src') === correspondingThumbnail) {
            activeOverlayThumbnail = getNewActiveThumbnail(activeOverlayThumbnail, overlayThumbnails[i]);
            break;
        }
    }
});

//----------------------CART-----------------------//
let quantityElement = document.querySelector(".quantity span strong");

const increaseQtyButton = document.querySelector(".quantity__increase");
const decreaseQtyButton = document.querySelector(".quantity__decrease");

const modiftyQuantity = (sign) => {
    if(sign === 'i')
        quantityElement.innerText = Number(quantityElement.innerText) + 1;       
    else if(sign === 'd') {
        if(quantityElement.innerText === '0')
            return;
        quantityElement.innerText = Number(quantityElement.innerText) - 1;       
    }
}

increaseQtyButton.addEventListener('click', () => {
    modiftyQuantity('i');
});

decreaseQtyButton.addEventListener('click', () => {
    modiftyQuantity('d');
});