function getUserUrl() {
    const cur_url =window.location.href;
    try {
        const urlObj = new URL(cur_url);
        const hostname = urlObj.hostname;
        let api_url = 'https://user.hubertchen200.site';
        let getFriendUrl = "https://friend.hubertchen200.site";
        if (hostname === "127.0.0.1") {
            // api_url = 'http://127.0.0.1:8081';
        }
        return api_url;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

function getFriendUrl() {
    const cur_url =window.location.href;
    try {
        const urlObj = new URL(cur_url);
        const hostname = urlObj.hostname;
        let getFriendUrl = "https://friend.hubertchen200.site";
        if (hostname === "127.0.0.1") {
            // api_url = 'http://127.0.0.1:8081';
        }
        return getFriendUrl;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

function getMessageUrl() {
    const cur_url =window.location.href;
    try {
        const urlObj = new URL(cur_url);
        const hostname = urlObj.hostname;
        let messageUrl = "https://api.hubertchen200.site";
        if (hostname === "127.0.0.1") {
            // api_url = 'http://127.0.0.1:8081';
        }
        return messageUrl;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

async function getToken(username){
    const api_url = getUserUrl();
    const response = await fetch(api_url + "/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({"user_id": username, "username": username })
    });

    if (response.ok) {
        const data = await response.json();
        if ("token" in data) {
            console.log(data);
            sessionStorage.setItem('token', data['token']);
        } else {
            console.log('get token failed');
        }
    } else {
        console.log('token api failed');
    }
};


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
                await getMessages(friendName, selfName); 
                
                console.log(`Clicked on ${friendName}`);
            });
            friendList.appendChild(li);

        });
    } 
function displayMessages(messages, selfName){
    const messageList = document.getElementById('chatMessages');
    messageList.innerHTML = "";
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
};

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const text = chatInput.value.trim();
    if (text !== '') {
        messages.push({ text, sender: 'self' });
        chatInput.value = '';
        displayMessages();
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the latest message
    }
}

    














