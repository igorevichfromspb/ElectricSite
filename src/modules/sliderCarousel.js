class sliderCarousel {
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
export default sliderCarousel;
