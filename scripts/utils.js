function getApiUrl() {
    const cur_url =window.location.href;
    try {
        const urlObj = new URL(cur_url);
        const hostname = urlObj.hostname;
        let api_url = 'https://user.hubertchen200.site';
        if (hostname === "127.0.0.1") {
            api_url = 'http://127.0.0.1:8081';
        }
        return api_url;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

async function getToken(user_id, username){
    const api_url = getApiUrl();
    const response = await fetch(api_url + "/token", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({"user_id": user_id, "username": username })
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












