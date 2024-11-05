
const defaultPlaceholders = [
  'Any', 
  'Enter Account Name...', 
  'Any Time', 
  'Buyout or Fixed Price', 
  'Chaos Orb Equivalent', 
  '+ Add Stat Filter', 
  '+ Add Stat Group'
];

function toggleDropdown(el){
  let dropdown = document.querySelector(`#${el.id} .dropdown`);
  dropdown.style.display = dropdown.style.display == "block" ? "none" : "block";
}


document.addEventListener("DOMContentLoaded", () => {
  
  //expand the filter section
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
    } catch (error) {}
  });
  
  document.querySelector("#toggle-filters").addEventListener('click', (e) => {
    e.preventDefault();

    const filters = document.querySelector(".filters");
    const buttonText = document.querySelector(
      ".controls-right .toggle-search span"
    );
    const buttonArrow = document.querySelector(
      ".controls-right .toggle-search i"
    );
    console.log(buttonText.textContent);
    buttonText.textContent = buttonText.textContent != "Show Filters" ? "Show Filters" : "Hide Filters";
    buttonArrow.classList.toggle("rotated");
    filters.classList.toggle("off");
  });

  document.querySelectorAll('.min-max').forEach(el => {
    el.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, ''); 
        if (parseInt(e.target.value) > 99999) e.target.value = '99999';
    });
  });
  
  
  document.querySelectorAll(".selection").forEach(el => {
    const inside_input = el.querySelector(".filter-tags");
    
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

  const dropdownContainers = document.querySelectorAll(".expanded");
  dropdownContainers.forEach(container => {

    const inputs = container.querySelectorAll(".selection");
    const dropdowns = container.querySelectorAll(".dropdown");

    inputs.forEach((input, index) => {
        const dropdown = dropdowns[index];

        if (dropdown) {
          dropdown.classList.remove("show");

          input.addEventListener("click", (event_input) => {
            event_input.stopPropagation();
            dropdown.classList.toggle("show");

            const options = dropdown.querySelectorAll("span.list-item");

            document.addEventListener("click", () => {
                dropdown.classList.remove("show");
            }, { once: true });

            options.forEach(option => {
              option.addEventListener("click", (event_option) => {
                event_option.stopPropagation();
                input.querySelector("input").placeholder = option.innerText;
                dropdown.classList.remove("show");
              });
            });
          });
        }
    });
  });

  

});

