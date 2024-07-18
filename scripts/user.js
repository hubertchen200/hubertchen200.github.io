document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
  
    const response = await fetch('https://user.hubertchen200.site/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaGkiLCJ1c2VybmFtZSI6ImhpIiwiZXhwIjoxNzIxMTU4MzUyfQ.P9mPpdd2KQtD_eBiLZ1SRBxMwSxfx9XM6B7VvOkWsU0'
        },
        body: JSON.stringify({"email": email, "password": password, "username": username, "firstname": firstname, "lastname": lastname })
    });

    const data = await response.json();

    if (response.ok) {
        // if ("status" in data) {
            alert('Sign-up successful');

    //     } else {
    //         alert('sign up failed!');
    //     }
    }
            
    else {
        alert('Sign-up failed: ' + data.message);
    }
});