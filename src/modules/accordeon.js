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
export default accordeon;
