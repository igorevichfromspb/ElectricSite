const mobileMenu = () => {
  const openClass = () => {
    document.querySelector(".mobile-menu").classList.toggle("open");
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mob-menu-btn")) {
      openClass();
    }
    if (event.target.closest(".mobile-menu-close, li>a")) {
      openClass();
    }
    if (event.target.closest(".overlay")) {
      document.querySelector(".mobile-menu").classList.remove("open");
    }
  });
};
export default mobileMenu;
