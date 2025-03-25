function JoinMatch() {


    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            if (this.status==200){
                window.location.href = "/mainMenu.html";
            }
            console.log(this.response)
            document.getElementById("success").innerHTML = this.responseText;
        }
    }

    xhttp.open("POST", "/mainMenu", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(player));
}