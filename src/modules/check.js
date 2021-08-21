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
export default check;
