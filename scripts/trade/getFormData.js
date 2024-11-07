const form = document.querySelector("#main-form");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", (e) => {
    const formData = new FormData(form);
    const jsonData = {};

    try {
        formData.forEach((value, key) => {
            const inputElements = form.querySelectorAll(`[name='${key}']`);
            
            if (inputElements.length > 1) {
                const values = [];
                inputElements.forEach(input => {
                    if (value !== "" && !defaultPlaceholders.includes(input.placeholder)) {
                        values.push(value);
                    }
                });
                if (values.length > 0) {
                    jsonData[key] = values;
                }
            } else {
                const inputElement = inputElements[0];
                
                if (inputElement) {
                    const isMinMax = inputElement.classList.contains('min-max');
                    const isPlaceholderExcluded = defaultPlaceholders.includes(inputElement.placeholder);
                    
                    if (isMinMax) {
                        if (value !== "" && !isPlaceholderExcluded) {
                            jsonData[key] = value;
                        }
                    } else {
                        const finalValue = value !== "" ? value : inputElement.placeholder;
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
        title: 'Searched For:',
        html: `<pre style="text-align: left; font-familiy: monospace; white-space: pre-wrap;">${jsonString}</pre>`,  
        confirmButtonText: 'Cool',
        background: '#000',
        color: '#e2e2e2',
        width: 'auto',
        didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            confirmButton.style.backgroundColor = '#1e2124';
            confirmButton.style.borderRadius = '0';
            confirmButton.style.color = 'white';

            const popup = Swal.getPopup();
            popup.style.border = '1px solid #634928';
        }
        })
});
