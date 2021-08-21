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
export default toggleMenu;
