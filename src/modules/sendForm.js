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
export default sendForm;
