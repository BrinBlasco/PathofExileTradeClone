const filterGroups = document.querySelectorAll(".filter-group");

filterGroups.forEach((group) => {
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

function load(elId) {
  const dropdown = document.querySelector(`#${elId} ul`);
  const item_category = JSON.parse(
    localStorage.getItem("type_filters")
  ).item_category;

  for (let el of item_category) {
    dropdown.insertAdjacentHTML(
      "beforeend",
      `<li><span class="list-item">${el}</span></li>`
    );
  }
}

async function getItems() {
  let outsideData = null;
  await fetch("/items.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      for (const section in data) {
        if (data.hasOwnProperty(section)) {
          localStorage.setItem(section, JSON.stringify(data[section]));
        }
      }
      outsideData = data;
    })
    .catch((error) => console.error("Error fetching items:", error));

  load("item_category");
}

function toggleFilters() {
  const filters = document.getElementsByClassName("filters")[0];
  filters.style.display = filters.style.display == "none" ? "block" : "none";
}

getItems();
