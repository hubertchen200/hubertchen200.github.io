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

    let currentFriend = '';
    const user = sessionStorage.getItem('data')
    const loginId = JSON.parse(user)['data']['username'];

    const myInterval = setInterval(() => {
        console.log('hi');
        if (currentFriend && loginId){
            getMessages(currentFriend,loginId);  
        }
        
    }, 5000);


    async function getFriends(){
        const token = sessionStorage.getItem('token')
        const user = sessionStorage.getItem('data')
        const username = JSON.parse(user)['data']['username'];
        const api_url = getFriendUrl()
        const response = await fetch(api_url + `/friends?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
           
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayFriends(data, username)
            return data;
        } else {
            console.log('get friend fail');
        }
        };
    
    
        function displayFriends(friends, selfName) {
            const friendList = document.getElementById('friendList');
            friendList.innerHTML = '';
    
            friends['data'].forEach(friend => {
                const li = document.createElement('li');
                const friendName = (friend['user1'] == selfName) ? friend['user2'] : friend['user1'];
    
                li.textContent = friendName;
                li.id = `id_${friendName}`;
                li.addEventListener('click', async () => {
                    currentFriend = friendName;
                    await getMessages(friendName, selfName); 
                    
                    console.log(`Clicked on ${friendName}`);
                });
                friendList.appendChild(li);
    
            });
        } 
    function displayMessages(messages, selfName){
        const messageList = document.getElementById('chatMessages');
        messageList.innerHTML = "";
        if (messages && messages.length == 0) {
            return
        }
        messages.forEach( (message) => {
            const div = document.createElement('div');
            let senderClass = 'other';
            if (message['sender'] === selfName) {
                senderClass = 'self';
            }
    
            div.classList.add('message', senderClass);
    
            // Create and append the sender and timestamp
            const senderTs = document.createElement('div');
            senderTs.classList.add('sender-timestamp');
            senderTs.innerHTML = `<span>${message.sender}</span><span class="timestamp">${message.ts}</span>`;
    
            // Create and append the message content
            const content = document.createElement('div');
            content.classList.add('content');
            content.textContent = message.content;
    
            div.appendChild(senderTs);
            div.appendChild(content);
    
            messageList.appendChild(div);
        });
    }
    
    
    async function getMessages(friend, selfName){
        const token = sessionStorage.getItem('token');
        const messageUrl = getMessageUrl();
        const response = await fetch(messageUrl + `/message?receiver=${friend}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
           
        });
    
        if (response.ok) {
            const messages = await response.json();
            displayMessages(messages, selfName)
            console.log(messages);
            return messages;
        } else {
            console.log('get message fail');
        }

        const messageList = document.getElementById('chatMessages');

        messageList.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message

    };
    
    function sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const text = chatInput.value.trim();
        if (text !== '') {
            sendApiMessage(currentFriend, text, false);
            chatInput.value = '';
            // chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
        }
    }
    
        
    async function sendApiMessage(receiver, content, is_group) {
        const token = sessionStorage.getItem('token');
        const messageUrl = getMessageUrl();
        const response = await fetch(messageUrl + '/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
                "receiver": receiver,
                "content": content,
                "is_group": is_group
            })
           
        });
    
    }
    
    