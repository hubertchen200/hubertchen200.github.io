
const user=sessionStorage.getItem('data');
if (user){
    window.location.href = '/chat/chat.html';  
}
const userApiUrl = getUserUrl();


document.getElementById('signin-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(userApiUrl + '/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"email": username, "password": password })
    });

   

    if (response.ok) {
        const data = await response.json();
        if ("status" in data) {
            console.log(data);
            await getToken(username) 
            sessionStorage.setItem('data', JSON.stringify(data));
            window.location.href = '/chat/chat.html';
        } else {
            alert('email and password not matched!');
        }
    } else {
        alert('Sign-in failed: ' + data.message);
    }
});


