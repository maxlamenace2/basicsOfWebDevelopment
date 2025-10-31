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

    

    const nameParts = fullName.split(" ").filter(part => part.length >= 2);

    if (nameParts.length < 2) {
    showError("fullName", "Please enter your full name (first and last), each with at least 2 characters.");
    valid = false;
    }

    

    if (!(email.includes("@") && email.includes("."))) {
      showError("email", "Invalid email format.");
      valid = false;
    }

    if (!/^[+0-9\s]+$/.test(phone)) {
      showError("phone", "Phone must contain digits.");
      valid = false;
    }

    // Vérifier la checkbox "terms"
    const termsChecked = form.querySelector('input[name="terms"]:checked');
    if (!termsChecked) {
        showError("terms", "You must accept the terms to register.");
        valid = false;
    }

    if (!checkAge(birthDateString, 13)) {
      showError("birthDate", "You must be at least 13 years old.");
      valid = false;
    }



    


    if (!valid) return;

    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${birthDateString}</td>
      <td>${accepted}</td>
    `;

    tableBody.appendChild(row);
    form.reset();
  });

  
  function checkAge(dateString, minAge) {
    const p = dateString.split("/");
    if (p.length !== 3) return false;
    const birth = new Date(p[2], p[1] - 1, p[0]);
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
    div.className = "error-message";
    div.style.color = "red";
    div.textContent = msg;
    el.insertAdjacentElement("afterend", div);
  }

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach(e => e.remove());
  }
});
