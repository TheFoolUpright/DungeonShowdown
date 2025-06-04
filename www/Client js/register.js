function RegisterRequest() {
    console.log("button pressed")

    // get variables from document
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password1 = document.getElementById("password1").value
    var password2 = document.getElementById("password2").value
    var IsValidRequest = false

    IsValidRequest = ValidateInputs(username, email, password1, password2)

    if(IsValidRequest){

        //Create a JSON object with the registration data
        var dataToSend = {  
            "username": username,
            "email": email,
            "password1": password1,
            "password2": password2
        }

        var xhttp = new XMLHttpRequest();
    
        xhttp.onreadystatechange = function () {
            console.log(this.readyState)

            if (this.readyState == 4) {

                if (this.status == 200) {

                    console.log("Go to login")
                    window.location.href = "/login.html"
                    return;
                }
            }
        }

        xhttp.open("POST", "/register/register", true);

        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send(JSON.stringify(dataToSend));
        
    }
};

function ValidateInputs(username, email, password1, password2) {
    //username should be more then 4 charaters
    if (username.length < 4) {
        document.getElementById("usernamemessage").innerHTML = "* Username must be more then 4 charaters"
        return false
    }else {
        document.getElementById("usernamemessage").innerHTML = ""
    }
    //email??
    if (email.length < 2) {
        document.getElementById("emailmessage").innerHTML = "* Email must be vaild"
        return false
    }else {
        document.getElementById("emailmessage").innerHTML = ""
    }

    //Passwords need to have a lowercase, uppercase, number, symbol, and length of 4
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{4,}$/.test(password1)) {
        document.getElementById("password1message").innerHTML = "* Password must have a lowercase, uppercase, number, symbol and be more then 4 charaters"
        return false
    }else {
        document.getElementById("password1message").innerHTML = ""
    }
    //the second password needs to match
    if (password1 != password2) {
        document.getElementById("password2message").innerHTML = "* Password doesn't match"
        return false
    }else {
        document.getElementById("password2message").innerHTML = ""
    }

    return true
}