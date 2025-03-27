function JoinMatch() {


    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                if (data.state == "MATCH_FOUND") {
                    window.location.href = "/game.html";
                }
            }
            
        }
    }

    xhttp.open("PUT", "/joinMatch", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}

function SearchMatch() {


    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText)
            console.log(data)

            if (this.status == 200){
                if (data.state == "MATCH_FOUND") { // ask cesar
                    window.location.href = "/game.html";
                }
            }
        }
    }

    xhttp.open("GET", "/searchMatch", true);

    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send();
}

setInterval(SearchMatch, 3000)
