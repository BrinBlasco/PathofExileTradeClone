const defaultPlaceholders = [
  "Any",
  "Enter Account Name...",
  "Any Time",
  "Buyout or Fixed Price",
  "Chaos Orb Equivalent",
  "+ Add Stat Filter",
  "+ Add Stat Group",
];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#main-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const action = e.submitter && e.submitter.id;
    handleSubmitAction(action);
  });
  document.querySelectorAll(".filter-group").forEach((group) => {
    try {
      const toggleButton = group.querySelector(".toggle-btn");
      const filterBody = group.querySelector(".filter-body");
      const expandedDiv = group.querySelector(".expanded");
      const kvdratk = group.querySelector(".kvdratk");

      toggleButton.addEventListener("click", () => {
        kvdratk.classList.toggle("on");
        if (expandedDiv.classList.contains("off")) {
          expandedDiv.classList.remove("off");
        } else {
          expandedDiv.classList.toggle("off");
        }
      });
      filterBody.addEventListener("click", () => {
        kvdratk.classList.toggle("on");
        if (expandedDiv.classList.contains("off"))
          expandedDiv.classList.remove("off");
        else {
          expandedDiv.classList.toggle("off");
        }
      });
    } catch (error) {}
  });

  document.querySelectorAll(".min-max").forEach((el) => {
    el.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
      if (parseInt(e.target.value) > 99999) e.target.value = "99999";
    });
  });

  document.querySelectorAll(".selection").forEach((el) => {
    const inside_input = el.querySelector(".filter-tags");
    if (!inside_input) return;

    const checkPlaceholder = () => {
      const iip = inside_input.placeholder.trim();
      if (!defaultPlaceholders.includes(iip)) {
        el.classList.add("not-empty");
      } else {
        // ce je eden izmed default nazaj removej not-empty
        el.classList.remove("not-empty");
      }
    };
    checkPlaceholder();

    //gledmo za spremembe u placehodler attributeu, gpt dau ukop
    const observer = new MutationObserver(checkPlaceholder);
    observer.observe(inside_input, {
      attributes: true,
      attributeFilter: ["placeholder"],
    });
  });

  document.querySelectorAll(".expanded").forEach((container) => {
    const inputWrappers = container.querySelectorAll(".selection");

    inputWrappers.forEach((inputWrapper) => {
      const dropdown = inputWrapper.nextElementSibling; // Assumes dropdown is the next sibling

      if (!dropdown || dropdown.classList.contains("dropdown") === false) {
        return;
      }

      inputWrapper.addEventListener("click", (e_inputWrapper) => {
        e_inputWrapper.stopPropagation();

        const inputField = inputWrapper.querySelector("input");
        const options = dropdown.querySelectorAll("span.list-item");

        closeDropdowns();
        dropdown.classList.toggle("show");
        inputField.focus();

        document.addEventListener(
          "click",
          () => {
            dropdown.classList.remove("show");
            inputField.blur();
          },
          { once: true }
        );

        options.forEach((option) => {
          option.addEventListener("click", (event_option) => {
            event_option.stopPropagation();
            inputField.value = "";
            inputField.placeholder = option.innerText;
            dropdown.classList.remove("show");
            inputField.blur();
          });
        });
      });
    });
  });
  document.querySelectorAll(".search-right .dropdowns").forEach((container) => {
    const dropdown = container.querySelector(".dropdown");
    const arrow = container.querySelector(".arrow");
    const options = container.querySelectorAll(".dropdown span");

    container.addEventListener("click", (e_container) => {
      e_container.stopPropagation();
      closeDropdowns();
      dropdown.classList.toggle("show");
      arrow.classList.toggle("rotated");

      document.addEventListener(
        "click",
        () => {
          dropdown.classList.remove("show");
          arrow.classList.remove("rotated");
        },
        { once: true }
      );

      options.forEach((option) => {
        option.addEventListener("click", (e_option) => {
          e_option.stopPropagation();
          container.querySelector("span").innerText = option.innerText;
          dropdown.classList.remove("show");
          arrow.classList.remove("rotated");
        });
      });
    });
  });

  const leftDropdown = document.querySelector(".search-left .dropdowns");
  leftDropdown.addEventListener("click", (e_container) => {
    e_container.stopPropagation();
    const dropdown = leftDropdown.querySelector(".dropdown");
    const arrow = leftDropdown.querySelector(".arrow");
    const input = leftDropdown.querySelector("input");
    const options = dropdown.querySelectorAll("span");

    closeDropdowns();
    dropdown.classList.toggle("show");
    arrow.classList.toggle("rotated");
    input.focus();

    document.addEventListener(
      "click",
      () => {
        dropdown.classList.remove("show");
        dropdown.classList.remove("rotated");
        input.blur();
      },
      { once: true }
    );

    options.forEach((option) => {
      option.addEventListener("click", (e_option) => {
        e_option.stopPropagation();

        dropdown.classList.remove("show");
        arrow.classList.remove("rotated");
        input.blur();

        input.value = option.innerText;
      });
    });
  });
});

function handleSubmitAction(action) {
  const form = document.querySelector("#main-form");
  switch (action) {
    case "clear-form":
      form.reset();
      location.reload();
      break;
    case "toggle-filters":
      const filters = document.querySelector(".filters");
      const buttonText = document.querySelector(
        ".controls-right .toggle-search span"
      );
      const buttonArrow = document.querySelector(
        ".controls-right .toggle-search i"
      );
      buttonText.textContent =
        buttonText.textContent != "Show Filters"
          ? "Show Filters"
          : "Hide Filters";
      buttonArrow.classList.toggle("rotated");
      filters.classList.toggle("off");
      break;
    case "search":
      const platform = document.querySelector("#platform").innerText;
      const league = document.querySelector("#league").innerText;
      const status = document.querySelector("#status").innerText;

      const formData = new FormData(form);
      const jsonData = {};

      try {
        function processInput(input, value, key) {
          const isMinMax = input.classList.contains("min-max");
          const isSock = input.classList.contains("sockets");
          const isPlaceholderExcluded = defaultPlaceholders.includes(
            input.placeholder
          );

          if (isMinMax || isSock) {
            if (value !== "" && !isPlaceholderExcluded) {
              jsonData[key] = value;
            }
          } else {
            const finalValue = value !== "" ? value : input.placeholder;
            if (finalValue && !isPlaceholderExcluded) {
              jsonData[key] = finalValue;
            }
          }
        }

        formData.forEach((value, key) => {
          const inputElement = form.querySelector(`[name='${key}']`);

          if (inputElement) {
            processInput(inputElement, value, key);
          }
        });

        let baseItem =
          jsonData["base-item"] === "" ||
          jsonData["base-item"] == "Search Items..." ||
          !jsonData["base-item"]
            ? ""
            : `<h3 style="font-size: 18px;">${jsonData["base-item"]}</h3><br />`;

        delete jsonData["base-item"];

        let obj = {
          "seller-account": jsonData["seller-account"],
          "collapse-listings-by-account":
            jsonData["collapse-listings-by-account"],
          listed: jsonData["listed"],
          "sale-type": jsonData["sale-type"],
          "buyout-price": jsonData["buyout-price"],
        };

        let tradeFilters = ``;
        for (let [key, value] of Object.entries(obj)) {
          if (value) {
            formattedKey = key.split("-").join(" ");
            formattedKey =
              formattedKey[0].toUpperCase() + formattedKey.slice(1);

            tradeFilters += `${formattedKey}: ${value} <br />`;
          }
        }
        let tradeFiltersString = `<br/><hr><br/><h3>Trade Filters:</h3><p>${tradeFilters}</p>`;

        delete jsonData["seller-account"];
        delete jsonData["collapse-listings-by-account"];
        delete jsonData["listed"];
        delete jsonData["sale-type"];
        delete jsonData["buyout-price"];

        let jsonString = JSON.stringify(jsonData, null, 4).substring(
          1,
          JSON.stringify(jsonData, null, 4).length - 1
        );
        jsonString = jsonString == "" ? "None" : jsonString;

        Swal.fire({
          title: "Search:",
          html: `   
            <p>
              Platform: ${platform} <br />
              League: ${league} <br />
              Status: ${status} <br />
            </p>
            <br />
            <hr>
            <br />
            ${baseItem}
            <h3>Filters:</h3>
            <pre style="text-align: let; font-familiy: monospace; white-space: pre-wrap;">${jsonString}</pre>
            ${tradeFiltersString}
          `,
          confirmButtonText: "Cool",
          background: "#000",
          color: "#e2e2e2",
          width: "auto",
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.style.backgroundColor = "#1e2124";
            confirmButton.style.borderRadius = "0";
            confirmButton.style.color = "white";

            const popup = Swal.getPopup();
            popup.style.border = "1px solid #634928";
            popup.style.borderRadius = "0";
          },
        });
      } catch (error) {
        console.log("Error processing the form data:", error);
      }
      break;
    default:
  }
}

function closeDropdowns() {
  document.querySelectorAll(".dropdown").forEach((dropdown) => {
    if (dropdown.classList.contains("show")) dropdown.classList.remove("show");
  });
  document.querySelectorAll(".arrow").forEach((arrow) => {
    if (arrow.classList.contains("rotated")) arrow.classList.remove("rotated");
  });
}

function showAbout() {
  Swal.fire({
    title: "About",
    html: `
      <h1> Made by Brin Blasco </h1>
      <br />
      <style>
        a {
        color: #9999FF;
        }
      </style>
      <span>Github: <a href="https://github.com/BrinBlasco">github.com/BrinBlasco</a></span> <br />
      <span>Original Page: <a href="https://pathofexile.com/trade">pathofexile.com/trade</a></span> <br />
      <span>Hosted with: <a href="https://pages.github.com/">Github Pages</a></span> <br />
      

    `,
    confirmButtonText: "Cool",
    background: "#000",
    color: "#e2e2e2",
    didOpen: () => {
      const confirmButton = Swal.getConfirmButton();
      confirmButton.style.backgroundColor = "#1e2124";
      confirmButton.style.borderRadius = "0";
      confirmButton.style.color = "white";

      const popup = Swal.getPopup();
      popup.style.border = "1px solid #634928";
      popup.style.borderRadius = "0";
    },
  });
}

function showBulk() {
  Swal.fire({
    title: "Bulk",
    icon: "warning",
    html: `
      <h1 style="font-size: 24px;">Not implemented</h1>
    `,
    confirmButtonText: "Alright",
    background: "#000",
    color: "#e2e2e2",
    didOpen: () => {
      const confirmButton = Swal.getConfirmButton();
      confirmButton.style.backgroundColor = "#1e2124";
      confirmButton.style.borderRadius = "0";
      confirmButton.style.color = "white";

      const popup = Swal.getPopup();
      popup.style.border = "1px solid #634928";
      popup.style.borderRadius = "0";
    },
  });
}

function showSettings() {
  Swal.fire({
    title: "Settings",
    icon: "warning",
    html: `
      <h1 style="font-size: 24px;">Not implemented</h1>
    `,
    confirmButtonText: "Alright",
    background: "#000",
    color: "#e2e2e2",
    didOpen: () => {
      const confirmButton = Swal.getConfirmButton();
      confirmButton.style.backgroundColor = "#1e2124";
      confirmButton.style.borderRadius = "0";
      confirmButton.style.color = "white";

      const popup = Swal.getPopup();
      popup.style.border = "1px solid #634928";
      popup.style.borderRadius = "0";
    },
  });
}
