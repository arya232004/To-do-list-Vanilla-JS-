//Registration up page
//Registration page
let taskarr = [];
let combine = [taskarr, []];
let regarr = [];
var signupusername;
var signuppassword;
var exisistingentries = exisistingentries = JSON.parse(localStorage.getItem("regarray"));
var loadedtask = JSON.parse(localStorage.getItem("taskarr"));

function registration() {

    if (exisistingentries === null) {
        regarr = [];
    } else {
        alert("You have successfully signed up");
        signupusername = document.getElementById("username").value;
        signuppassword = document.getElementById("password").value;

        var data = {
            username: signupusername,
            password: signuppassword,
        };

        localStorage.setItem("data", JSON.stringify(data));

        exisistingentries.push(data);

        alert(signupusername + " " + signuppassword);
        //regarr.push(signupusername, signuppassword);
        // localStorage.setItem("username", signupusername);
        localStorage.setItem("regarray", JSON.stringify(exisistingentries));
        // localStorage.setItem("password", signuppassword);
        //  console.log(localStorage.getItem("username"));
        // console.log(localStorage.getItem("password"));

        //  console.log(JSON.parse(localStorage["regarray"]));
        // window.location.href = "index.html";
        for (i = 0; i < exisistingentries; i++) {
            if (signupusername === exisistingentries[i].username && signuppassword === exisistingentries[i].password) {
                alert("You have successfully signed up");
                // window.location.href = "login.html";
            } {
                alert("Username already exists");
            }
        }
    }
}

document.getElementById("signupsubmit").addEventListener("click", registration);
document.getElementById("login").addEventListener("click", login);

//Login page
function login() {
    // console.log(JSON.parse(localStorage["regarray"]));
    var loginusername = document.getElementById("userclient").value;
    var loginpassword = document.getElementById("passclient").value;
    var verificationtoken = true;

    for (i = 0; i < exisistingentries.length; i++) {

        if (loginusername === exisistingentries[i].username && loginpassword === exisistingentries[i].password) {
            alert("You have successfully logged in");
            if (loadedtask === null) {
                // taskarr = [];
            } else {
                combine[1] = i;
                console.log(combine);
                localStorage.setItem("main", JSON.stringify(combine));
            }
            //  console.log(combine);
            console.log(loadedtask);

            window.location.href = "index.html";


        } else {
            if (verificationtoken === true) {
                alert("Username or password is incorrect");
                verificationtoken = false
            }

        }
    }

}