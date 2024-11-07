document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  });
  console.log(document.querySelectorAll("#create-account, #sign-in"));
  document.querySelectorAll("#create-account, #sign-in").forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const registerPage = document.querySelector(".main.register");
      const loginPage = document.querySelector(".main.login");

      registerPage.classList.toggle("hidden");
      loginPage.classList.toggle("hidden");
    });
  });
});
