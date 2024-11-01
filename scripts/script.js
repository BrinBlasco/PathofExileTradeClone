
function toggleFilters() {
  const filters = document.querySelector(".filters");
  const buttonText = document.querySelector(
    ".controls-right .toggle-search span"
  );
  const buttonArrow = document.querySelector(
    ".controls-right .toggle-search i"
  );
  buttonText.textContent =
    buttonText.textContent == "Show Filters" ? "Hide Filters" : "Show Filters";
  buttonArrow.classList.toggle("rotated");
  filters.style.display = filters.style.display != "flex" ? "flex" : "none";
}
function toggleDropdown(el){
  let dropdown = document.querySelector(`#${el.id} .dropdown`);
  dropdown.style.display = dropdown.style.display == "block" ? "none" : "block";
}

function resetForm() {
  const form = document.getElementById("main-form");
  form.reset();
}

document.getElementById("main-form").addEventListener("submit", (e) => {
  e.preventDefault();
});

document.querySelectorAll(".filter-group").forEach((group) => {
  const toggleButton = group.querySelector(".toggle-btn");
  const filterBody = group.querySelector(".filter-body");
  const expandedDiv = group.querySelector(".expanded");
  const kvdratk = group.querySelector(".kvdratk");

  function clickKvdratkorToggleBtn() {
    kvdratk.classList.toggle("on");
    if (expandedDiv.classList.contains("off")){
      expandedDiv.classList.remove("off");
    }
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

  toggleButton.addEventListener("click", clickKvdratkorToggleBtn);
  filterBody.addEventListener("click", clickFilterBody);
});

document.querySelectorAll(".min-max").forEach((input) => {
  input.addEventListener("input", (e) => {
    this.value = this.value.replace(/[^0-9]/g, ""); 
  });
});
