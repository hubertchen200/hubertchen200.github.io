document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const token = sessionStorage.getItem('token');

    const response = await fetch('https://user.hubertchen200.site/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({"email": email, "password": password, "username": username, "firstname": firstname, "lastname": lastname })
    });

    const data = await response.json();

    if (response.ok) {
        window.location.href = '/signin/signin.html';
 
    } else {
        showBanner(data['error'], 'FAILED');
    }
});