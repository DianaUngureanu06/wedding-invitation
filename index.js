document.addEventListener("DOMContentLoaded", function () {
    //read html form element
    const form = document.querySelector("form");

    //select the message class element
    const confirmationMessage = form.querySelector(".message");
    confirmationMessage.style.visibility = "hidden";

    //select buttons by id
    const confirmPresenceSelect = document.getElementById("confirmPresence");
    const cantParticipateSelect = document.getElementById("cantParticipate");

    confirmPresenceSelect.style.display = "none";
    cantParticipateSelect.style.display = "none";

    // Hide name fields
    const firstPersonNameInput = form.querySelector("input[name='firstPersonName']");
    const secondPersonNameInput = form.querySelector("input[name='secondPersonName']");
    firstPersonNameInput.style.display = "none";
    secondPersonNameInput.style.display = "none";

    // Show/hide name fields based on the choice of numberOfPersons
    const numberOfPersonsSelect = form.querySelector("select[name='numberOfPersons']");
  
    numberOfPersonsSelect.addEventListener("change", function () {
      if (this.value === "1") {
        firstPersonNameInput.style.display = "block";
        secondPersonNameInput.style.display = "none";
        cantParticipateSelect.style.display = "block";    
        confirmPresenceSelect.style.display = "block";
      } else if (this.value === "2") {
        firstPersonNameInput.style.display = "block";
        secondPersonNameInput.style.display = "block";
        cantParticipateSelect.style.display = "block";    
        confirmPresenceSelect.style.display = "block";
      } else {
        firstPersonNameInput.style.display = "none";
        secondPersonNameInput.style.display = "none";
      }     
    });
   
    // select navigation buttons and open the map in a new tab
    const church = document.querySelector("#churchNavigationButton");
   
    //Listen for event click on church button
    church.addEventListener("click", function () {
      //select iframe by id 
      const mapURL = document.getElementById("map-church").querySelector("iframe").src;

      //open URL in new window tab
      window.open(mapURL, "_blank");
    });

    const restaurant = document.querySelector("#restaurantNavigationButton");
    restaurant.addEventListener("click", function () {
      const mapURL = document.getElementById("map-restaurant").querySelector("iframe").src;
      window.open(mapURL, "_blank");
    });
    
    // Function to get the non-empty names and return the formText
    function getFormText(formData) {
        let formText = "";
        for (const [name, value] of formData.entries()) {
          if (value.trim() !== "") {
              formText += `${name}: ${value}\n`;
          }
        }
        return formText;
    }
  
    // Event listener for the "Nu pot participa" button
    const cantParticipate = document.getElementById("cantParticipate");
    cantParticipate.addEventListener("click", function () {
        const firstPersonNameInput = form.querySelector("input[name='firstPersonName']");
        if (firstPersonNameInput.value === "") {
            alert("Te rog completeaza numele.");
            return;
        }
    
        const formData = new FormData(form);
        let formText = getFormText(formData);
    
        formText += "Nu pot participa";
    
        saveFormDataAndShowConfirmation(formText);
    });

    // Event listener for "Da confirm" button
    const confirmPresence = document.getElementById("confirmPresence");
    confirmPresence.addEventListener("click", function (event) {
        event.preventDefault();

        const firstPersonNameInput = form.querySelector("input[name='firstPersonName']");
        if (firstPersonNameInput.value === "") {
            alert("Te rog completeaza numele.");
            return;
        }
    
        const formData = new FormData(form);
        let formText = getFormText(formData);
        formText += "Da, Confirm prezenta";
    
        saveFormDataAndShowConfirmation(formText);
    });

    // Function to save form data to a .txt file and show confirmation message
    function saveFormDataAndShowConfirmation(formText) {
        const filename = "form_data.txt";
        const file = new Blob([formText], { type: "text/plain" });
    
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);

        clearForm();

        // Show confirmation message
        confirmationMessage.style.visibility = "visible";
    }  

    function clearForm() {
      form.reset();
      
      firstPersonNameInput.style.display = "none";
      secondPersonNameInput.style.display = "none";

      confirmPresenceSelect.style.display = "none";
      cantParticipateSelect.style.display = "none";
    }
});
  