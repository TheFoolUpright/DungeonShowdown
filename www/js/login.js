function login() {
    
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    console.log("try to login with " + username + " and " + password)

    var player = {
        "username": username,
        "password": password
    }

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status==200){
                window.location.href = "/game.html";
            }
            console.log(this.response)
            document.getElementById("success").innerHTML = this.responseText;
        }
    }

    xhttp.open("POST", "/login", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(player));
}