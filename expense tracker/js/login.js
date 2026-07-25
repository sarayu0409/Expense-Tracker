 document.getElementById("loginForm").addEventListener("submit", function(event){

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if(email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    const username = email.split("@")[0];

    localStorage.setItem("currentUser", username);

    alert("Login Successful!");

    window.location.href = "dashboard.html";

});