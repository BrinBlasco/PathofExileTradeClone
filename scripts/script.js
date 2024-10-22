function toggleFilters() {
  const filters = document.getElementsByClassName("filters")[0];
  filters.style.display = filters.style.display == "none" ? "block" : "none";
}

function resetForm() {
  const form = document.getElementById("main");
  form.reset();
}

document.getElementById("main").addEventListener("submit", (e) => {
  e.preventDefault();
});

document.querySelectorAll(".selection").forEach((selection) => {
  selection.addEventListener("click", (e) => {
    const input = selection.querySelector("input");
    console.log(e);
    if (input) {
      input.focus();
    }
  });
});

document.querySelectorAll(".filter-group").forEach((group) => {
  const toggleButton = group.querySelector(".toggle-btn");
  const filterBody = group.querySelector(".filter-body");
  const expandedDiv = group.querySelector(".expanded");
  const kvdratk = group.querySelector(".kvdratk");

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

  toggleButton.addEventListener("click", clickKvdratkorToggleBtn);
  filterBody.addEventListener("click", clickFilterBody);
});
