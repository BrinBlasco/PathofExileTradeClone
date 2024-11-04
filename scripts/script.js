
function toggleDropdown(el){
  let dropdown = document.querySelector(`#${el.id} .dropdown`);
  dropdown.style.display = dropdown.style.display == "block" ? "none" : "block";
}

document.getElementById("main-form").addEventListener("submit", (e) => {
  e.preventDefault();
  form.reset();
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
  try {
    toggleButton.addEventListener("click", clickKvdratkorToggleBtn);
    filterBody.addEventListener("click", clickFilterBody);  
  } catch (error) {
    console.log(error); 
  }
});

document.querySelector("#toggle-filters").addEventListener('click', () => {
  const filters = document.querySelector(".filters");
  const buttonText = document.querySelector(
    ".controls-right .toggle-search span"
  );
  const buttonArrow = document.querySelector(
    ".controls-right .toggle-search i"
  );
  buttonText.textContent = buttonText.textContent != "Show Filters" ? "Show Filters" : "Hide Filters";
  buttonArrow.classList.toggle("rotated");
  filters.style.display = filters.style.display != "flex" ? "flex" : "none";
});


document.querySelectorAll('.min-max').forEach(el => {
  el.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      if (parseInt(e.target.value) > 999999) e.target.value = '999999';
  });
});

document.querySelectorAll('.min-max').forEach(el => {
  el.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
      if (parseInt(e.target.value) > 99999) e.target.value = '99999';
  });
});


document.querySelectorAll(".selection").forEach(el => {
  const inside_input = el.querySelector(".filter-tags");

  const defaultPlaceholders = [
    'Any', 
    'Enter Account Name...', 
    'Any Time', 
    'Buyout or Fixed Price', 
    'Chaos Orb Equivalent', 
    '+ Add Stat Filter', 
    '+ Add Stat Group'
  ];
  
  if (inside_input) {
    const checkPlaceholder = () => {
      const iip = inside_input.placeholder.trim();
      if (!defaultPlaceholders.includes(iip)) {
        el.classList.add("not-empty");
      } else { // ce je eden izmed default nazaj removej not-empty
        el.classList.remove("not-empty");
      }
    };
    checkPlaceholder();

    //gledmo za spremembe u placehodler attributeu, gpt dau ukop
    const observer = new MutationObserver(checkPlaceholder);
    observer.observe(inside_input, { attributes: true, attributeFilter: ['placeholder'] });
  }
});
