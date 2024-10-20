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
  console.log(dropdown);
  print(dropdown);
  const item_category = JSON.parse(
    localStorage.getItem("type_filters")
  ).item_category;
  console.log(item_category);

  // Loop through item_category to create new list items
  for (let el of item_category) {
    const newListItem = document.createElement("li");
    const newSpan = document.createElement("span");

    newSpan.className = "list-item";
    newSpan.textContent = el;

    newListItem.appendChild(newSpan);
    dropdown.appendChild(newListItem);
  }
}

async function getItems() {
  if (localStorage.length != 0) {
    fetch("/items.json")
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
        console.log(data);
        load("item_category");
      })
      .catch((error) => console.error("Error fetching items:", error));
  }
}

getItems();
