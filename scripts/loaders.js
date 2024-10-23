function load(elId) {
  const dropdown = document.querySelector(`#${elId} ul`);
  const item_category = JSON.parse(
    localStorage.getItem(elId)
  );

  for (let el of item_category) {
    dropdown.insertAdjacentHTML(
      "beforeend",
      `<li><span class="list-item" id=${el}>${el}</span></li>`
    );
  }
}

function load_section(section_id) {
  const section_data = JSON.parse(localStorage.getItem(section_id));
  console.log(section_data);

  for(let section in section_data){
    const section_dropdown = document.querySelector(`#${section_id} #${section}.dropdown ul`);
    const section_data = JSON.parse(localStorage.getItem(section));

    for (let element of section_data) {
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
  load_section("character_class");
  load_section("type_filters");
  load_section("blighted_map");
  load_section("blight_ravaged_map");
  load_section("map_completion_reward");
}

getItems();
