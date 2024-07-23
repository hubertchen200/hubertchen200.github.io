function getUserUrl() {
    const cur_url =window.location.href;
    try {
        const urlObj = new URL(cur_url);
        const hostname = urlObj.hostname;
        let api_url = 'https://user.hubertchen200.site';
        let friend_url = "https://friend.hubertchen200.site";
        if (hostname === "127.0.0.1") {
            // api_url = 'http://127.0.0.1:8081';
        }
        return api_url;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

function friend_url() {
    const cur_url =window.location.href;
    try {
        const urlObj = new URL(cur_url);
        const hostname = urlObj.hostname;
        let friend_url = "https://friend.hubertchen200.site";
        if (hostname === "127.0.0.1") {
            // api_url = 'http://127.0.0.1:8081';
        }
        return friend_url;
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


async function get_friends(){
    const token = sessionStorage.getItem('token')
    const user = sessionStorage.getItem('data')
    const username = JSON.parse(user)['data']['username'];
    const api_url = friend_url()
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
        displayFriends(data)
        return data;
    } else {
        console.log('get friend fail');
    }
    };


    function displayFriends(friends) {
        const friendList = document.getElementById('friendList');
        friendList.innerHTML = '';

        friends['data'].forEach(friend => {
            const li = document.createElement('li');
            li.textContent = friend['user2']
            friendList.appendChild(li);
        });
    } 














