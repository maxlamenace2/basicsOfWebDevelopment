document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('form');
    
    // Configuration de la date minimale (aujourd'hui)
    const dateInput = document.getElementById('start-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // --- MISE À JOUR : Gestion du menu hamburger unifié ---
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
      
    // Gestion de la soumission du formulaire
    if (form) {
        form.addEventListener('submit', function(e) {
        
            e.preventDefault();
            
            // Nettoyer les erreurs précédentes
            clearAllErrors();

            let isValid = true;

            // 1. Validation Nom Complet
            const fullName = document.getElementById('full-name');
            const nameParts = fullName.value.trim().split(/\s+/);
            if (fullName.value.trim() === '') {
                showError(fullName, "Please enter your full name.");
                isValid = false;
            }
            else if (nameParts.length <= 1) {
                showError(fullName, "Full name must contain more than one word.");
                isValid = false;
            }
            
            // 2. Validation Email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                showError(email, "Please enter a valid email address.");
                isValid = false;
            }

            // 3. Validation Téléphone
            const phone = document.getElementById('phone');
            const phoneValue = phone.value.trim();
            const phonePattern = /^[\d\+\-\s]{8,}$/;
            if (/[a-zA-Z]/.test(phoneValue)) {
                showError(phone, "Phone number must not contain letters.");
                isValid = false;
            }
            else if (!phonePattern.test(phone.value.trim())) {
                showError(phone, "Invalid phone number (minimum 8 characters).");
                isValid = false;
            }
            
            // 4. Validation Modèle de vélo
            const bikeModel = document.getElementById('bike-model');
            if (bikeModel.value === "") {
                showError(bikeModel, "Please select a bike.");
                isValid = false;
            }

            // 5. Validation Date
            if (dateInput.value === "") {
                showError(dateInput, "The withdrawal date is required.");
                isValid = false;
            } else {
                const selectedDate = new Date(dateInput.value);
                const todayDate = new Date();
                todayDate.setHours(0,0,0,0);
                if(selectedDate < todayDate) {
                    showError(dateInput, "The date cannot be in the past.");
                    isValid = false;
                }
            }

            // 6. Validation Durée
            const duration = document.getElementById('duration');
            if (duration.value < 1 || duration.value > 30) {
                showError(duration, "The duration must be between 1 and 30 days.");
                isValid = false;
            }

            // 7. Validation Terms & Conditions
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                showError(terms.parentElement, "You must accept the terms and conditions.");
                isValid = false;
            }

            // Si tout est valide
            if (isValid) {
                alert("Order successfully confirmed! Thank you for your reservation.");
                form.reset(); 
            }
        });
    }

    // --- Fonctions utilitaires ---

    function showError(inputElement, message) {
        
        if (inputElement.type !== 'checkbox') {
            inputElement.classList.add('input-error');
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;

        const parent = inputElement.closest('div'); 
        if(parent) {
            parent.appendChild(errorDiv);
        }
        
        // Efface l'erreur dès que l'utilisateur commence à corriger
        inputElement.addEventListener('input', function() {
            clearError(inputElement);
        }, { once: true });
    }

    function clearError(inputElement) {
        inputElement.classList.remove('input-error');
        const parent = inputElement.closest('div');
        if (parent) {
            const errorMsg = parent.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    }

    function clearAllErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(el => el.remove());
        
        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(el => el.classList.remove('input-error'));
    }
});