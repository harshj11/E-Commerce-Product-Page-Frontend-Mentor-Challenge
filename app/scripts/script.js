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