


function addBannerStyle(status){
    // Create a <style> element
    const style = document.createElement('style');
    if (status == 'SUCCESS'){
        color = 'green';
    } else {
        color = 'red';
    }
    // Add the CSS code to the style element
    style.textContent = `
        .banner {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${color};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
        }

        .close-btn:hover {
            color: #f1f1f1;
        }

        #banner button {
            width: 50px;
        }
    `;

    // Append the style element to the head of the document
    document.head.appendChild(style);
}

function createBanner(content, status){
    const banner = document.createElement('div');
    banner.id = 'banner';
    banner.className = 'banner';

    // Create the span for the message
    const message = document.createElement('span');
    message.id = 'message-id';
    message.textContent = content;
    banner.appendChild(message);

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-banner';
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    banner.appendChild(closeButton);

    // Append the banner to the body
    document.body.appendChild(banner);
    addBannerStyle(status);
    // Add event listener to close the banner when the button is clicked
    closeButton.addEventListener('click', function() {
        banner.style.display = 'none';
    });
}

function showBanner(content, status){
    const banner = document.getElementById('banner');
    if (!banner){
        createBanner(content, status);
    } else {
        const message = document.getElementById('message-id');
        message.textContent = content;
        if (status == 'SUCCESS'){
            banner.style.backgroundColor = "green";
        } else {
            banner.style.backgroundColor = "red";
        }
        banner.style.display = 'block';
    }

}




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

function signOut() {
    sessionStorage.removeItem('data')
    window.location.href = "/";    
}

function checkLogin(){
    let sign_data = sessionStorage.getItem('data')
    if (sign_data) {

        sign_json = JSON.parse(sign_data);
        document.getElementById("welcome_username").textContent = "Welcome " + sign_json['data']['username']
    } else {
        window.location.href = '/signin/signin.html'
    }
    
}

function handleKeyDown(event) { 
    console.log(event);
    if (event.key == 'Enter'){ 
        sendMessage();
    }
  }


