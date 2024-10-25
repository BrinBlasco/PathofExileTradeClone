
function print(args){
  console.log(args);
}

function toggleFilters() {
  const filters = document.getElementsByClassName("filters")[0];
  const buttonText = document.querySelector(
    ".controls-right .toggle-search span"
  );
  const buttonArrow = document.querySelector(
    ".controls-right .toggle-search i"
  );
  buttonText.textContent =
    buttonText.textContent == "Show Filters" ? "Hide Filters" : "Show Filters";
  buttonArrow.classList.toggle("rotated");
  filters.style.display = filters.style.display == "none" ? "block" : "none";
}

function resetForm() {
  const form = document.getElementById("mainForm");
  form.reset();
}

document.getElementById("mainForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

document.querySelectorAll(".selection").forEach((selection) => {
  selection.addEventListener("click", () => {
    const input = selection.querySelector("input");
    const dropdown = selection.querySelector('.dropdown');
    print(dropdown);
    if (input) {
      input.focus();
      dropdown.classList.toggle("on");
    }
  });
});

document.querySelectorAll(".filter-group").forEach((group) => {
  const toggleButton = group.querySelector(".toggle-btn");
  const filterBody = group.querySelector(".filter-body");
  const expandedDiv = group.querySelector(".expanded");
  const kvdratk = group.querySelector(".kvdratk");
  const selection = group.querySelector(".selection");
  const dropdown = group.querySelector(".selection + .dropdown");
  print(dropdown);

  function clickKvdratkorToggleBtn() {
    kvdratk.classList.toggle("on");
    if (expandedDiv.classList.contains("off"))
      expandedDiv.classList.remove("off");
    else {
      expandedDiv.classList.toggle("off");
    }
  }
  function clickFilterBody() {
    kvdratk.classList.toggle("on");
    if (expandedDiv.classList.contains("off"))
      expandedDiv.classList.remove("off");
    else {
      expandedDiv.classList.toggle("off");
    }
  }
  function clickSelection(){
    dropdown.classList.toggle("on");
  }

  toggleButton.addEventListener("click", clickKvdratkorToggleBtn);
  filterBody.addEventListener("click", clickFilterBody);
  selection.addEventListener("click", clickSelection);
});

document.querySelectorAll(".min-max").forEach((input) => {
  input.addEventListener("input", (e) => {
    this.value = this.value.replace(/[^0-9]/g, ""); 
  });
});
