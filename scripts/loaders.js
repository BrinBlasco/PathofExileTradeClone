// function load(elId) {
//   const dropdown = document.querySelector(`#${elId} ul`);
//   const item_category = JSON.parse(
//     localStorage.getItem(elId)
//   );

//   for (let el of item_category) {
//     dropdown.insertAdjacentHTML(
//       "beforeend",
//       `<li><span class="list-item" id=${el}>${el}</span></li>`
//     );
//   }
// }

function load_section(section_id) {
  const section_dropdowns = document.querySelector(`#${section_id} .dropdown`);
  console.log(section_dropdowns, section_id);
  return section_dropdowns;
}

async function getItems() {
  let outsideData = null;
  await fetch("./items.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      for (const section in data) {
        localStorage.setItem(section, JSON.stringify(data[section]));
      }
      outsideData = data;
    })
    .catch((error) => console.error("Error fetching items:", error));

  console.log(outsideData.sections);
  for (let section of outsideData.sections) {
    load_section(section);
  }
}

getItems();
