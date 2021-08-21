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
  const smoothScroll = (event) => {
    const target = event.target;
    if (target.tagName === "A" && target.parentNode.tagName === "LI") {
      const id = target.getAttribute("href");
      event.preventDefault();
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  document.addEventListener("click", smoothScroll);
  up.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("body").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  document.addEventListener("scroll", addClass);
};
export default scroll;
