document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        let pseudo = document.getElementById("pseudo").value.trim();
        let age = parseInt(document.getElementById("age").value);
        let message = document.getElementById("message");

        if (!pseudo || isNaN(age)) {
            message.innerHTML = "Veuillez entrer un pseudo et un âge valide.";
            message.style.color = "red";
            return;
        }

        if (age < 10 || age > 100) {
            message.innerHTML = "L'âge doit être entre 10 et 100 ans.";
            message.style.color = "red";
            return;
        }

        // ✅ Stockage dans localStorage
        localStorage.setItem("pseudo", pseudo);
        localStorage.setItem("age", age);

        // ✅ Redirection vers la deuxième page
        window.location.href = "testcss.html";
    });
});

