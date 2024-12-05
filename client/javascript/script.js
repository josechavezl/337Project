const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

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
    }
    catch(error) {
        console.log("ERRORRR", error);
    }
});