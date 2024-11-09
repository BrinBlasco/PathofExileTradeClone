const defaultPlaceholders = [
  "Any",
  "Search Items...",
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
    const inputs = container.querySelectorAll(".selection");
    const dropdowns = container.querySelectorAll(".dropdown");

    inputs.forEach((input, index) => {
      const dropdown = dropdowns[index];

      if (!dropdown) return;
      dropdown.classList.remove("show");

      input.addEventListener("click", (event_input) => {
        event_input.stopPropagation();
        closeDropdowns();
        dropdown.classList.toggle("show");

        const options = dropdown.querySelectorAll("span.list-item");

        document.addEventListener(
          "click",
          () => {
            dropdown.classList.remove("show");
          },
          { once: true }
        );

        options.forEach((option) => {
          option.addEventListener("click", (event_option) => {
            event_option.stopPropagation();
            input.querySelector("input").placeholder = option.innerText;
            dropdown.classList.remove("show");
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

  document
    .querySelector(".search-left .dropdowns")
    .addEventListener("click", (e_container) => {
      const dropdown = document.querySelector(".search-left .dropdown");
      const arrow = document.querySelector(".search-left .dropdowns .arrow");
      const options = dropdown.querySelectorAll("span");

      document
        .querySelector(".search-left .dropdowns")
        .addEventListener("click", (e_inner) => {
          e_inner.stopPropagation();
          dropdown.classList.toggle("show");
          arrow.classList.toggle("rotated");
          document.addEventListener(
            "click",
            () => {
              dropdown.classList.remove("show");
              dropdown.classList.remove("rotated");
            },
            { once: true }
          );

          options.forEach((option) => {
            option.addEventListener("click", (e_option) => {
              e_option.stopPropagation();

              dropdown.classList.remove("show");
              arrow.classList.remove("rotated");

              e_container.target.placeholder = option.innerText;
            });
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
      const formData = new FormData(form);
      const jsonData = {};

      try {
        formData.forEach((value, key) => {
          const inputElements = form.querySelectorAll(`[name='${key}']`);

          if (inputElements.length > 1) {
            const values = [];
            inputElements.forEach((input) => {
              if (
                value !== "" &&
                !defaultPlaceholders.includes(input.placeholder)
              ) {
                values.push(value);
              }
            });
            if (values.length > 0) {
              jsonData[key] = values;
            }
          } else {
            const inputElement = inputElements[0];

            if (inputElement) {
              const isMinMax = inputElement.classList.contains("min-max");
              const isPlaceholderExcluded = defaultPlaceholders.includes(
                inputElement.placeholder
              );

              if (isMinMax) {
                if (value !== "" && !isPlaceholderExcluded) {
                  jsonData[key] = value;
                }
              } else {
                const finalValue =
                  value !== "" ? value : inputElement.placeholder;
                if (finalValue && !isPlaceholderExcluded) {
                  jsonData[key] = finalValue;
                }
              }
            }
          }
        });
      } catch (error) {
        console.log("Error processing the form data:", error);
      }

      const jsonString = JSON.stringify(jsonData, null, 4);

      Swal.fire({
        title: "Searched For:",
        html: `<pre style="text-align: left; font-familiy: monospace; white-space: pre-wrap;">${jsonString}</pre>`,
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
        },
      });
      break;
    default:
      break;
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
