
'use strict';



/* PRELOAD */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

// Selecting both navbar and aboutnav
const navbar = document.querySelector("[data-navbar]");
const aboutNav = document.querySelector("[data-aboutnav]");

// Select nav togglers and the overlay
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

// Function to toggle both navbars and the overlay
const toggleNavbar = function () {
  navbar.classList.toggle("active");     // Toggles main navbar
  aboutNav.classList.toggle("active");   // Toggles about nav
  overlay.classList.toggle("active");    // Toggles the overlay
  document.body.classList.toggle("nav-active");  // Toggles body class
}

// Adding event listener to all toggler buttons
addEventOnElements(navTogglers, "click", toggleNavbar);






/**
 * HEADER & BACK TOP BTN
 */

// Target all headers with the same attribute
const headers = document.querySelectorAll("[data-header]");

headers.forEach(header => {
  let lastScrollPos = 0;

  const hideHeader = function () {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }
    lastScrollPos = window.scrollY;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
      header.classList.add("active");
      hideHeader();
    } else {
      header.classList.remove("active");
    }
  });
});


function showPage(pageId) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('about').style.display = 'none';
  document.getElementById('redirect').style.display = 'none';
  document.getElementById(pageId).style.display = 'block';
}


document.addEventListener("DOMContentLoaded", function() {
  showPage('home');
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});
