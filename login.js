document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Replace this with your authentication logic
        if (username === "yourusername" && password === "yourpassword") {
            // Redirect to the home page (replace with your actual URL)
            window.location.href = "home.html";
        } else {
            errorMessage.innerText = "Invalid username or password. Please try again.";
        }
    });
});
