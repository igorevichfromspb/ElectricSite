"use strict";
import accordeon from "./modules/accordeon";
import check from "./modules/check";
import mobileMenu from "./modules/mobileMenu";
import scroll from "./modules/scroll";
import sendForm from "./modules/sendForm";
import slider from "./modules/slider";
import sliderCarousel from "./modules/sliderCarousel";
import toggleMenu from "./modules/toggleMenu";

// ModalMenu
toggleMenu();

// mobileMenu
mobileMenu();

// Slider
slider();

// Scroll
scroll();

// SliderCarousel
const carousel = new sliderCarousel({
  main: ".services-elements",
  wrap: ".services-carousel",
  next: ".arrow-right",
  prev: ".arrow-left",
  slidesToShow: 3,
  infinity: true,
  responsive: [
    {
      breakpoint: 1024,
      slidesToShow: 3,
    },
    {
      breakpoint: 768,
      slidesToShow: 2,
    },
    {
      breakpoint: 576,
      slidesToShow: 1,
    },
  ],
});
carousel.init();

// Accordeon
accordeon();

// sendForm
sendForm();

// Check
check();
