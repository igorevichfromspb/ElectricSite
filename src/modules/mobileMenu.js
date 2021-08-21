const mobileMenu = () => {
  const addClass = () => {
    document.querySelector(".mobile-menu").classList.toggle("open");
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mob-menu-btn")) {
      addClass();
    }
    if (event.target.closest(".mobile-menu-close, li>a")) {
      addClass();
    }
    if (event.target.closest(".overlay")) {
      document.querySelector(".mobile-menu").classList.remove("open");
    }
  });
};
export default mobileMenu;
