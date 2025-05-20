function JoinMatch() {


    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                if(data.state == "MATCH_FOUND") {
                    window.location.href = "/game.html";
                }
            }
        }
    }

    xhttp.open("PUT", "/joinMatch", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}

function GetMatchState() {

    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            console.log("here2")
            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){

                if(data.state == "MATCH_FOUND") {
                    window.location.href = "/game.html";
                }
            }
        }
    }

    xhttp.open("GET", "/getMatchState", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}
GetMatchState()
setInterval(GetMatchState, 3000)