checkLogin()

function displayRequests(requests){
    const requestList = document.getElementById('friend-request-list');
    requestList.innerHTML = "";
    if (requests && requests.length == 0) {
        return
    }
    requests.forEach( (rqst) => {
        const div = document.createElement('div');

        let span = document.createElement('span');
        span.textContent = rqst['sender'];
        div.appendChild(span);

        acceptButton  = document.createElement('button');
        acceptButton.textContent = 'Accept';
        acceptButton.addEventListener('click', () => {
            acceptRequest(rqst['sender']);
        });


        div.appendChild(acceptButton);
        declineButton  = document.createElement('button');
        declineButton.textContent = 'Decline';
        acceptButton.addEventListener('click', () => {
            declineRequest(rqst['sender']);
        });

        div.appendChild(declineButton);
        requestList.appendChild(div);
    });

}


async function getFriendRequest(){
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('data')
    const username = JSON.parse(user)['data']['username'];
    const friendUrl = getFriendUrl();
    const response = await fetch(friendUrl + `/friend/request?username=${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
       
    });

    if (response.ok) {
        const requests = await response.json();
        displayRequests(requests);
        console.log(requests);
        return
    } else {
        console.log('get friend request fail');
    }
}



async function sendFriendRequest(){
    const input = document.getElementById('input_username');
    const receiver = input.value.trim();
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('data')
    const username = JSON.parse(user)['data']['username'];
    const friendUrl = getFriendUrl();
    const response = await fetch(friendUrl + '/friend/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
            "sender": username,
            "receiver": receiver
        })
       
    });

    if (response.ok) {
        console.log('success');
        showBanner("successfully sent friend request", 'SUCCESS')

        return
    } else {
        console.log('send friend request fail');
        showBanner("Failed to send friend request", 'FAIL')
    }
}



async function acceptRequest(sender){
    const token = sessionStorage.getItem('token');
    const friendUrl = getFriendUrl();
    const response = await fetch(friendUrl + `/friend/accept?sender=${sender}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
    });

    if (response.ok) {
        console.log('success');
        return
    } else {
        console.log('accept friend request failed');
    }
}



async function declineRequest(sender){
    const token = sessionStorage.getItem('token');
    const friendUrl = getFriendUrl();
    const response = await fetch(friendUrl + `/friend/decline?sender=${sender}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        },
       
    });

    if (response.ok) {
        console.log('success');
        return
    } else {
        console.log('decline friend request failed');
    }
}



getFriendRequest();