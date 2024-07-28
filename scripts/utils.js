

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


