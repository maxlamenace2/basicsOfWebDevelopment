document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('form');
    
    // 1. Gestion de la date minimale (Aujourd'hui)
    const dateInput = document.getElementById('start-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // 2. Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        // On empêche l'envoi par défaut pour vérifier les données
        e.preventDefault();
        
        // On nettoie les anciennes erreurs
        clearAllErrors();

        // Variable pour suivre l'état de validation
        let isValid = true;

        // --- VALIDATION DES CHAMPS ---

        // A. Nom complet
        const fullName = document.getElementById('full-name');
        const nameParts = fullName.value.trim().split(/\s+/);
        if (fullName.value.trim() === '') {
            showError(fullName, "Please enter your full name.'");
            isValid = false;
        }
        else if (nameParts.length <= 1) {
            showError(fullName, "Full name must contain more than one word.");
            isValid = false;
        }
        

        // B. Email (Format simple)
        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // C. Téléphone (Au moins 8 chiffres/caractères)
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
        

        // D. Modèle de vélo
        const bikeModel = document.getElementById('bike-model');
        if (bikeModel.value === "") {
            showError(bikeModel, "Please select a bike.");
            isValid = false;
        }

        // E. Date de début
        if (dateInput.value === "") {
            showError(dateInput, "The withdrawal date is required.");
            isValid = false;
        } else {
            // Vérification supplémentaire pour être sûr que ce n'est pas dans le passé
            const selectedDate = new Date(dateInput.value);
            const todayDate = new Date();
            todayDate.setHours(0,0,0,0);
            if(selectedDate < todayDate) {
                showError(dateInput, "The date cannot be in the past.");
                isValid = false;
            }
        }

        // F. Durée
        const duration = document.getElementById('duration');
        if (duration.value < 1 || duration.value > 30) {
            showError(duration, "The duration must be between 1 and 30 days.");
            isValid = false;
        }

        // G. Conditions générales (Checkbox)
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            // Pour la checkbox, on affiche l'erreur sur le parent pour l'alignement
            showError(terms.parentElement, "You must accept the terms and conditions.");
            isValid = false;
        }

        // --- RÉSULTAT ---
        
        if (isValid) {
            // Ici, tout est bon. On peut envoyer le formulaire.
            // Pour l'exercice, on affiche une alerte de succès.
            alert("Order successfully confirmed! Thank you for your reservation.");
            
            // Si tu avais un backend, tu ferais : form.submit();
            form.reset(); // On vide le formulaire
        }
    });

    // --- FONCTIONS UTILITAIRES ---

    // Fonction pour afficher une erreur
    function showError(inputElement, message) {
        // 1. Ajouter la classe d'erreur à l'input (bordure rouge)
        // Si c'est une checkbox, on ne met pas de bordure rouge sur la case elle-même
        if (inputElement.type !== 'checkbox') {
            inputElement.classList.add('input-error');
        }

        // 2. Créer le message d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = message;

        // 3. Insérer le message après l'élément parent de l'input (pour garder la mise en page)
        // Note: Dans ta structure HTML, l'input est dans une div (ou checkbox-group div)
        // On essaie de trouver le meilleur endroit
        const parent = inputElement.closest('div'); 
        if(parent) {
            parent.appendChild(errorDiv);
        }
        
        // Petit effet : si l'utilisateur modifie le champ, on enlève l'erreur
        inputElement.addEventListener('input', function() {
            clearError(inputElement);
        }, { once: true });
    }

    // Fonction pour retirer l'erreur d'un champ spécifique
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

    // Fonction pour nettoyer toutes les erreurs (au début de la soumission)
    function clearAllErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(el => el.remove());
        
        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(el => el.classList.remove('input-error'));
    }
});