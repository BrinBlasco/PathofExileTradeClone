
function load_section(section_id) {
  const section_data = JSON.parse(localStorage.getItem(section_id));

  for(let section in section_data){
    const section_dropdown = document.querySelector(`#${section_id} #${section}.dropdown ul`);
    const section_items = section_data[section];
    console.log(section_items);

    for (let element of section_items) {
      section_dropdown.insertAdjacentHTML(
        "beforeend",
        `<li><span class="list-item" id=${element}>${element}</span></li>`
      );
    }
  }
}


async function getItems() {
  let outsideData = null;
  await fetch("scripts/items.json")
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

  // console.log(outsideData.sections);
  // for (let section of outsideData.sections) {
  //   load_section(section);
  // }

  load_section("type_filters");
  load_section("requirements");
  load_section("map_filters");
  load_section("heist_filters");
  load_section("ultimatum_filters");
  load_section("miscellaneous_filters");
  load_section("map_completion_reward");
}

getItems();
