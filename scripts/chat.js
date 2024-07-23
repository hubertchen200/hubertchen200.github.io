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
    

    friends = get_friends()
    console.log(friends)
    // friends = ['a', 'b', 'c']

    // function displayFriends(friends) {
    //     const friendList = document.getElementById('friendList');
    //     friendList.innerHTML = '';

    //     friends.forEach(friend => {
    //         const li = document.createElement('li');
    //         li.textContent = friend;
    //         friendList.appendChild(li);
    //     });
    // }

    // window.onload = get_friends();

    // displayFriends(friends);
