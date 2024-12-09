

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const ucr = document.getElementById("user-created-response");
const uce = document.getElementById("user-created-error");
const ule = document.getElementById("user-login-error");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const formData = new FormData(signupForm);
        const formDataObj = Object.fromEntries(formData);

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch("/signup", {
            method: "post",
            body: JSON.stringify(formDataObj),
            headers: headers
        });

        
        let data = await response.json();
        console.log("response:", data);

        
        if(response.ok) {
            console.log('GOOD RESPONSE!');

            uce.style.visibility = "hidden";
            ucr.textContent = "Thanks for signing up! " +
            "Press the link above to log in.";
            ucr.style.display = "block";
            ucr.style.visibility = "visible";
        }
        else {
            console.log('BAD RESPONSE!');

            ucr.style.visibility = "hidden"
            uce.textContent = "Your email already exists.";
            uce.style.display = "block";
            uce.style.visibility = "visible";
        }
    }
    catch(error) {
        console.log("ERRORRR", error);
    }
});


loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    try {
        const formData = new FormData(loginForm);
        const formDataObj = Object.fromEntries(formData);

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        const response = await fetch("/login", {
            method: "post",
            body: JSON.stringify(formDataObj),
            headers: headers
        });

        
        let data = await response.json();
        console.log("response:", data);

        
        if(response.ok ) {
            console.log("ScriptJs at 75")
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('fullName', data.user.name);

            /*if(data.redirected) {
                console.log('GOOD RESPONSE!', data.redirect);
                window.location.href = data.redirect;
            }*/
        }
        else {
            console.log('BAD RESPONSE!');
            
            ule.textContent = "Your email is not valid." +
            "Please click the link above to sign in.";
            ule.style.display = "block";
            ule.style.visibility = "visible";
        }
    }
    catch(error) {
        console.log("ERRORRR", error);
    }
});

