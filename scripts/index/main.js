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
  const repoRoot = `${location.origin}${location.pathname
    .split("/")
    .slice(0, 2)
    .join("/")}/`;

  switch (action) {
    case "login-continue":
      location.href = `${repoRoot}trade.html`; // Navigates to the "trade.html" page in the repo
      break;
    case "register-continue":
      location.href = repoRoot; // Navigates to the root (index) of your repository
      break;
  }
}
