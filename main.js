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
