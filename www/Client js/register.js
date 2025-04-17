function RegisterRequest() {
    // get variables from document
    var username = document.getElementById("username").value
    var email = document.getElementById("email").value
    var password1 = document.getElementById("password1").value
    var password2 = document.getElementById("password2").value

    ValidateInputs(username, email, password1, password2)

    //Create a JSON object with the registration data
    var dataToSend = {  
        "username": username,
        "email": email,
        "password1": password1,
        "password2": password2
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (this.readyState == 4) {
            console.log(this.request)
            // When the request is done, parse the response to JSON.
            //var data = JSON.parse(this.request);
            
            // Log the response to the console of the browser.
            console.log(data);

            if (this.status == 200) {
                // If status is 200, redirect to the login page
                window.location.href = "/login.html"
            }else{
                //report problem to the message areas
            }
        }
    }
    
    // Open the request with POST method and URL /login
    request.open("PUT", "/register", true)

    // Set the request header to JSON
    request.setRequestHeader("Content-Type", "application/json");

    // Send the request with the data. Stringify will convert the JSON object to a string.
    request.send(JSON.stringify(dataToSend));
};

function ValidateInputs(username, email, password1, password2) {
    //username should be more then 4 charaters
    if (username.length < 4) {
        document.getElementById("usernamemessage").innerHTML = "* Username must be more then 4 charaters"
        return
    }else {
        document.getElementById("usernamemessage").innerHTML = ""
    }
    //email??
    if (email.length < 2) {
        document.getElementById("emailmessage").innerHTML = "* Email must be vaild"
        return
    }else {
        document.getElementById("emailmessage").innerHTML = ""
    }

    //Passwords need to have a lowercase, uppercase, number, symbol, and length of 4
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{4,}$/.test(password1)) {
        document.getElementById("password1message").innerHTML = "* Password must have a lowercase, uppercase, number, symbol and be more then 4 charaters"
        return
    }else {
        document.getElementById("password1message").innerHTML = ""
    }
    //the second password needs to match
    if (password1 != password2) {
        document.getElementById("password2message").innerHTML = "* Password doesn't match"
        return
    }else {
        document.getElementById("password2message").innerHTML = ""
    }
}