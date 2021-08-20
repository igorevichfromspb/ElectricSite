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
      currentClick.matches(
        ".callback-btn, .modal-overlay, .button-services, .before"
      ) ||
      currentClick.closest(".modal-close")
    ) {
      handlerMenu();
    }
  });

  const imgWrapper = document.querySelectorAll(".img-wrapper");
  for (let i = 0; i < imgWrapper.length; i++) {
    if (imgWrapper[i].closest(".col-sm-6")) {
      const before = document.createElement("div");
      before.className = "before";
      before.textContent = "Оформить заявку";
      imgWrapper[i].append(before);
    }
  }
  const style = document.createElement("style");
  document.head.appendChild(style);
  style.textContent = `
    .before {
      display: block !important;
      position: absolute !important;
      width: 200px !important;
      height: 48px !important;
      top: 50% !important;
      left: 50% !important;
      margin-left: -100px !important;
      -webkit-transition: all 200ms ease-out !important;
      -moz-transition: all 200ms ease-out !important;
      -o-transition: all 200ms ease-out !important;
      transition: all 200ms ease-out !important;
      margin-top: -24px !important;
      z-index: 10 !important;
      opacity: 0 !important;
      color: #fff !important;
      padding: 10px 0 !important;
      text-align: center !important;
      text-transform: uppercase !important;
      border: 2px solid #fff !important;
      cursor: pointer;
    }
  `;
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

// SliderCarousel
class SliderCarousel {
  constructor({
    main,
    wrap,
    next,
    prev,
    infinity = false,
    position = 0,
    slidesToShow = 3,
    responsive = [],
  }) {
    this.main = document.querySelector(main);
    this.wrap = document.querySelector(wrap);
    this.slides = document.querySelector(wrap).children;
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.slides.length - this.slidesToShow,
    };
    this.responsive = responsive;
  }
  init() {
    this.addGloClass();
    this.addStyle();
    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }
    if (this.responsive) {
      this.responseInit();
    }
  }
  addGloClass() {
    this.main.classList.add("glo-slider");
    this.wrap.classList.add("glo-slider__wrap");
    for (const item of this.slides) {
      item.classList.add("glo-slider__item");
    }
  }
  addStyle() {
    let style = document.getElementById("sliderCarousel-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "sliderCarousel-style";
    }
    style.textContent = `
      .glo-slider {
        overflow: hidden !important;
      }
      .glo-slider__wrap {
        display: flex !important;
        transition: transform 0.5s !important;
        will-change: transform !important;
      }
      .glo-slider__item {
        display: flex !important;
        align-items: center;
        justify-content: center;
        flex: 0 0 ${this.options.widthSlide}% !important;
        margin: auto 0 !important;
      }
      `;
    document.head.append(style);
  }
  controlSlider() {
    this.prev.addEventListener("click", this.prevSlider.bind(this));
    this.next.addEventListener("click", this.nextSlider.bind(this));
  }
  prevSlider() {
    if (this.options.infinity || this.options.position > 0) {
      --this.options.position;
      if (this.options.position < 0) {
        this.options.position = this.options.maxPosition;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  nextSlider() {
    if (
      this.options.infinity ||
      this.options.position < this.options.maxPosition
    ) {
      ++this.options.position;
      if (this.options.position > this.options.maxPosition) {
        this.options.position = 0;
      }
      this.wrap.style.transform = `translateX(-${
        this.options.position * this.options.widthSlide
      }%)`;
    }
  }
  addArrow() {
    this.prev = document.createElement("button");
    this.next = document.createElement("button");
    this.prev.className = "glo-slider__prev";
    this.next.className = "glo-slider__next";
    this.main.append(this.prev);
    this.main.append(this.next);
    const style = document.createElement("style");
    style.textContent = `
      .glo-slider__prev,
      .glo-slider__next {
        margin: 10px 10px;
        border: 20px solid transparent;
        background: transparent;
      }
      .glo-slider__next {
        border-left-color: #19b5fe
      }
      .glo-slider__prev {
        border-right-color: #19b5fe
      }
      .glo-slider__next:hover,
      .glo-slider__next:focus,
      .glo-slider__prev:hover,
      .glo-slider__prev:focus {
        background: transparent;
        outline: transparent;
      }
      `;
    document.head.append(style);
  }
  responseInit() {
    const slidesToShowDefault = this.slidesToShow,
      allResponse = this.responsive.map((item) => item.breakpoint),
      maxResponse = Math.max(...allResponse);
    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
        this.addStyle();
      }
    };
    checkResponse();
    window.addEventListener("resize", checkResponse);
  }
}
const carousel = new SliderCarousel({
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
const accordeon = () => {
  const accordeon = document.querySelector(".accordeon"),
    element = accordeon.querySelectorAll(".element");

  const addStyle = () => {
    let style = document.createElement("style");
    style.textContent = `
      .accordeon .element.active .element-content {
        display: block !important;
      }
      .accordeon .element-content {
        display: none !important;
      }
    `;
    document.head.append(style);
  };
  addStyle();

  for (let item of element) {
    item.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        for (let elem of element) {
          elem.classList.remove("active");
        }
        this.classList.add("active");
      }
    });
  }
};
accordeon();

// sendForm
const sendForm = () => {
  const errorMessage = "Что-то пошло не так...",
    loadMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с вами свяжемся!";
  const statusMessage = document.createElement("div");
  statusMessage.style.cssText = `
    font-size: 2rem;
    color: black;
    text-align: center;
  `;
  document.addEventListener("submit", (event) => {
    const target = event.target;
    event.preventDefault();
    target.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(target);
    const body = {};
    for (let val of formData.entries()) {
      body[val[0]] = val[1];
    }
    target.reset();

    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    };

    const reset = () => {
      statusMessage.textContent = "";
    };
    postData(body)
      .then((response) => {
        setTimeout(reset, 5000);
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        setTimeout(reset, 5000);
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
  });
};
sendForm();

// Check
const check = () => {
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.name === "fio") {
      target.value = target.value.replace(/[^а-яё\s]/gi, "");
    } else if (target.name === "tel") {
      target.value = target.value.replace(/[^0-9+]/, "");
    }
  });
  document.addEventListener(
    "blur",
    (event) => {
      if (event.target.name === "fio") {
        event.target.value = event.target.value
          .split(" ")
          .map(
            (elem) => elem[0].toUpperCase() + elem.toLowerCase().substring(1)
          )
          .join(" ");
      } else if (event.target.name === "tel") {
        const phoneOne = new RegExp(/^\+7\d{10}$/);
        const phoneTwo = new RegExp(/^[78]{1}\d{10}$/);
        if (
          !phoneOne.test(event.target.value) &&
          !phoneTwo.test(event.target.value)
        ) {
          event.target.value = "";
        }
      }
    },
    true
  );
};
check();
