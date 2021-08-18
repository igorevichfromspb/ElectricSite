"use strict";
// ModalMenu
const toggleMenu = () => {
  const styleAdd = () => {
    let style = document.createElement("style");
    style.textContent = `
      .active-menu {
        display: block;
      }
      `;
    document.head.append(style);
  };
  styleAdd();

  const handlerMenu = () => {
    document.querySelector("#callback").classList.toggle("active-menu");
    document.querySelector(".modal-overlay").classList.toggle("active-menu");
  };

  document.addEventListener("click", (event) => {
    let currentClick = event.target;
    if (
      currentClick.matches(".callback-btn, .modal-overlay, .button-services") ||
      currentClick.closest(".modal-close")
    ) {
      handlerMenu();
    }
  });
};

toggleMenu();

// Slider
const slider = () => {
  const items = document.querySelectorAll(".item"),
    topSlider = document.querySelector(".top-slider"),
    table = document.querySelectorAll(".table");

  let currentSlide = 0,
    interval;

  table[0].classList.add("active");

  const ul = document.createElement("ul");
  ul.className = "slick-dots";
  topSlider.append(ul);

  for (let i = 0; i < items.length; i++) {
    const dots = document.createElement("li");
    dots.className = "dot";
    ul.append(dots);
  }

  const dot = document.querySelectorAll(".dot");
  dot[0].classList.add("slick-active");

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };
  const addStyle = () => {
    const style = document.createElement("style");
    style.textContent = `
      .item-active {
        position: absolute !important;
        background-size: cover;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
      }
      .dot {
        z-index: 15;
      }
      `;
    document.head.append(style);
  };
  addStyle();

  const autoPlaySlide = () => {
    prevSlide(items, currentSlide, "item-active");
    prevSlide(table, currentSlide, "active");
    prevSlide(dot, currentSlide, "slick-active");
    currentSlide++;
    if (currentSlide >= items.length) {
      currentSlide = 0;
    }
    nextSlide(items, currentSlide, "item-active");
    nextSlide(table, currentSlide, "active");
    nextSlide(dot, currentSlide, "slick-active");
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  topSlider.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;

    if (!target.matches(".dot")) {
      return;
    }
    prevSlide(items, currentSlide, "item-active");
    prevSlide(table, currentSlide, "active");
    prevSlide(dot, currentSlide, "slick-active");
    if (target.matches(".dot")) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }
    if (currentSlide >= items.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = items.length - 1;
    }
    nextSlide(items, currentSlide, "item-active");
    nextSlide(table, currentSlide, "active");
    nextSlide(dot, currentSlide, "slick-active");
  });

  topSlider.addEventListener("mouseover", (event) => {
    if (event.target.matches(".dot")) {
      stopSlide();
    }
  });

  topSlider.addEventListener("mouseout", (event) => {
    if (event.target.matches(".dot")) {
      startSlide();
    }
  });

  startSlide();
};
slider();

// Scroll
const scroll = () => {
  const up = document.querySelector(".up");

  const addStyle = () => {
    const style = document.createElement("style");
    style.textContent = `
      .up {
        display: none;
      }  
      .up-active {
        display: block !important;
      }
      `;
    document.head.append(style);
  };
  addStyle();

  const addClass = () => {
    const scroll = window.pageYOffset;
    if (scroll >= 503) {
      up.classList.add("up-active");
    }
    if (scroll === 0) {
      up.classList.remove("up-active");
    }
  };
  addClass();

  const goUp = () => {
    if (window.pageYOffset > 0) {
      window.scrollTo(window.pageYOffset, 0);
    }
  };

  up.addEventListener("click", goUp);
  document.addEventListener("scroll", addClass);
};
scroll();
