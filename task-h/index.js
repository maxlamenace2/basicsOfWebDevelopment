// index.js
// Author: Maxence Gautier-Grall
// Date: 2025-10-31
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("addCourseForm");
  const tableBody = document.querySelector("#timetable tbody");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const timestamp = new Date().toLocaleString();
    
    document.getElementById("timestamp").value = timestamp;

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthDateString = document.getElementById("birthDate").value.trim();
    const accepted = form.querySelector('input[name="terms"]:checked') ? "✅" : "❌";

    let valid = true;

    //if (fullName.length < 2) {
      //showError("fullName", "Full name must be at least 2 characters.");
      //valid = false;
    //}

    //NAME
    if (fullName === "") 
    {
        showError("fullName", "Please enter your full name.");
        valid = false;
    } 
    else 
    {
        const nameParts = fullName.split(" ").filter(part => part.length >= 2);

        if (nameParts.length < 2) 
        {
            showError("fullName","Please enter your full name (first and last), each with at least 2 characters.");
            valid = false;
        }
    }

    //EMAIL
    if (email === "") {
    showError("email", "Please enter your email address.");
    valid = false;
    }
    else if (!(email.includes("@") && email.includes("."))) {
      showError("email", "Invalid email format.");
      valid = false;
    }
    
    //PHONE
    if (phone === "") {
      showError("phone", "Please enter your phone number.");
      valid = false;
    }
    else if (!/^[+0-9\s]+$/.test(phone)) {
      showError("phone", "Phone must contain only digits and optional '+' or spaces.");
      valid = false;
    } 
    else 
    {
      // Supprimer les espaces pour compter les chiffres
      const digitCount = phone.replace(/\D/g, "").length;
      if (digitCount <= 9) {
        showError("phone", "Phone number must contain at least 9 digits.");
        valid = false;
      }
    }
    //else if (!/^[+0-9\s]+$/.test(phone)) {
      //showError("phone", "Phone must contain digits.");
      //valid = false;
    //}

    
    //DATE
    if (birthDateString === "") 
    {
        showError("birthDate", "Please enter your birth date.");
        valid = false;
    } 
    else 
    {
        const parts = birthDateString.split("-");
        if (parts.length !== 3 || parts.some(p => p.trim().length === 0)) 
        {
            showError("birthDate", "Please fill the entire date field (dd/mm/yyyy).");
            valid = false;
        }
        else if (!checkAge(birthDateString, 13)) 
        {
            showError("birthDate", "You must be at least 13 years old.");
            valid = false;
        }
    }

    // Vérifier la checkbox "terms"
    const termsChecked = form.querySelector('input[name="terms"]:checked');
    if (!termsChecked) {
        showError("terms", "You must accept the terms to register.");
        valid = false;
    }

    if (!valid) return;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-3">${timestamp}</td> 
      <td class="py-3">${fullName}</td>
      <td class="py-3">${email}</td>
      <td class="py-3">${phone}</td>
      <td class="py-3">${birthDateString}</td>
      <td class="py-3">${accepted}</td>
    `;//py-3 pour en bah de la page faire du padding entre chaque ligne que je rajoute pour pas etre collé

    tableBody.appendChild(row);
    form.reset();
  });

    // Effacer les erreurs dès qu'on tape dans un champ
    form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", clearErrors);
    });

  
  function checkAge(dateString, minAge) {
  const birth = new Date(dateString); // type=date donne format YYYY-MM-DD
  if (isNaN(birth)) return false;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) age--;

  return age >= minAge;
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    const div = document.createElement("div");
    div.className = "error-message text-red-600 text-sm mt-1";
    //div.className = "error-message"; // avant d'utiliser Tailwind
    //div.style.color = "red";
    div.textContent = msg;
    el.insertAdjacentElement("afterend", div);
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.remove());
  }
});


