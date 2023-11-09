function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Prepare data for the API request
    var data = {
        username: username,
        password: password
    };

    // Make an AJAX request to the login API using fetch
    fetch(`https://hubertchen200.pythonanywhere.com/api/users?email=${username}&password=${password}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Invalid username or password. Please try again.");
        }
        return response.json();
    })
    .then(data => {
        // Successful login response
        alert("Login successful!");
    })
    .catch(error => {
        // Failed login response
        alert(error.message);
    });
}
