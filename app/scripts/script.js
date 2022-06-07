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

//----------------------INCREASE OR DECREASE QUANTITY-----------------------//

let quantityElement = document.querySelector(".quantity span strong");
let noOfItems = Number(quantityElement.innerText);

const increaseQtyButton = document.querySelector(".quantity__increase");
const decreaseQtyButton = document.querySelector(".quantity__decrease");

const cartLabel = document.querySelector(".nav__right__cart__label");

const modifyCart = () => {
    let cartQty = quantityElement.innerText;
    cartLabel.innerText = cartQty;
}

const modiftyQuantity = (sign) => {
    if(sign === 'i') {
        quantityElement.innerText = noOfItems + 1;       
        noOfItems++;
    } else if(sign === 'd') {
        if(quantityElement.innerText === '0')
            return;
        quantityElement.innerText = noOfItems - 1;       
        noOfItems--;
    }
}

increaseQtyButton.addEventListener('click', () => {
    modiftyQuantity('i');
});

decreaseQtyButton.addEventListener('click', () => {
    modiftyQuantity('d');
});

//----------------------CART-DETAILS-HEADER-CARD-----------------------//

const cartDetailsCard = document.querySelector(".nav__right__cart__cart-details");
const emptyCart = document.querySelector(".cart-details-empty");
const cartQuantity = cartDetailsCard.querySelector(".cart__quantity");
const totalPrice = cartDetailsCard.querySelector(".total-price");

const cartCardElements = Array.from(cartDetailsCard.children);

const cartIcon = document.querySelector(".nav__right__cart");

const removeIcon = document.querySelector(".remove-icon");

const displayCartContent = (isVisible) => {
    if(noOfItems == 0) {
        for(let i = 1; i < cartCardElements.length - 1; i++) {
            cartCardElements[i].classList.remove("flex");
            cartCardElements[i].classList.add("d-none");
        }    
        cartCardElements[cartCardElements.length - 1].classList.remove("d-none");
        isVisible = false;
    } else if(!isVisible) {
        for(let i = 1; i < cartCardElements.length - 1; i++) {
            cartCardElements[i].classList.add("flex");
            cartCardElements[i].classList.remove("d-none");
        }
        cartCardElements[cartCardElements.length - 1].classList.add("d-none");
        isVisible = true;
    }

    return isVisible;
}

displayCartContent(false);

cartIcon.addEventListener('click', (event) => {
    cartDetailsCard.classList.toggle("hide");
    cartDetailsCard.classList.toggle("active");
});

removeIcon.addEventListener('click', (event) => {
    noOfItems = 0;
    displayCartContent(false);
    quantityElement.innerText = 0;
    cartLabel.innerText = quantityElement.innerText;
})

//----------------------ADD TO CART BUTTON-----------------------//

const addToCartButton = document.querySelector(".add-to-cart-button");

addToCartButton.addEventListener('click', (event) => {
    modifyCart(); 
    cartQuantity.innerText = noOfItems;
    totalPrice.innerText = "$" + (noOfItems * 125);

    let isVisible = false;
    isVisible = displayCartContent(isVisible);
});