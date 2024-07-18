

const api_url = getApiUrl();


document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const token = sessionStorage.getItem('token')
    const response = await fetch(api_url + '/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({"email": username, "password": password })
    });

   

    if (response.ok) {
        const data = await response.json();
        if ("status" in data) {
            console.log(data);
            sessionStorage.setItem('data', JSON.stringify(data))
            window.location.href = '/chat/chat.html';
        } else {
            alert('email and password not matched!');
        }
    } else {
        alert('Sign-in failed: ' + data.message);
    }
});
