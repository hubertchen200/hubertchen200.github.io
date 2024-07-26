    document.getElementById("signOutLink").addEventListener("click", function(event) {
    event.preventDefault(); 
    sessionStorage.removeItem('data')
    window.location.href = "/";

    });

    let sign_data = sessionStorage.getItem('data')
    if (sign_data) {

        sign_json = JSON.parse(sign_data);
        document.getElementById("welcome_username").textContent = "Welcome " + sign_json['data']['username']
    } else {
        window.location.href = 'signin.html'
    }
    

    friends = getFriends()
    console.log(friends)



    // const messages = [
    //     { text: "Hi there!", sender: "other" },
    //     { text: "Hello!", sender: "self" },
    //     { text: "How are you?", sender: "other" },
    //     { text: "I'm good, thanks!", sender: "self" }
    // ];

    // function displayMessages() {
    //     const chatMessages = document.getElementById('chatMessages');
    //     chatMessages.innerHTML = '';

    //     messages.forEach(message => {
    //         const div = document.createElement('div');
    //         div.classList.add('message', message.sender);
    //         div.textContent = message.text;
    //         chatMessages.appendChild(div);
    //     });
    // }

    // function sendMessage() {
    //     const chatInput = document.getElementById('chatInput');
    //     const text = chatInput.value.trim();
    //     if (text !== '') {
    //         messages.push({ text, sender: 'self' });
    //         chatInput.value = '';
    //         displayMessages();
    //         chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
    //     }
    // }

    // window.onload = () => {
    //     displayMessages();
    // };