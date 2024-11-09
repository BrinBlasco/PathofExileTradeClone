document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const action = e.submitter.id;
      console.log(action);
      handleSubmitAction(action);
    });
  });
  document.querySelectorAll("#create-account, #sign-in").forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const registerPage = document.querySelector(".main.register");
      const loginPage = document.querySelector(".main.login");
      document.querySelectorAll(".main form").forEach((form) => {
        console.log(form);
        form.reset();
      });
      registerPage.classList.toggle("hidden");
      loginPage.classList.toggle("hidden");
    });
  });
});

function handleSubmitAction(action) {
  switch (action) {
    case "login-continue":
      location.href = "/trade.html";
      break;
    case "register-continue":
      location.href = "/";
    default:
      break;
  }
}
