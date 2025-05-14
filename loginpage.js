document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".login-btn");
    const errorMessage = document.getElementById("error-message");

    loginButton.disabled = true;

    usernameInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);

    function validateForm() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const isUsernameValid = username.length > 0;
        const isPasswordValid = password.length >= 4;

        loginButton.disabled = !(isUsernameValid && isPasswordValid);

        if (password.length > 0 && password.length < 4) {
            errorMessage.textContent = "Password must be at least 4 characters!";
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
        }
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "admin" && password === "1234") {
            window.location.href = "admin.html";
        } else if (username === "root" && password === "1234") {
            window.location.href = "user.html";
        } else {
            errorMessage.textContent = "Invalid username or password!";
            errorMessage.style.display = "block";
        }
    });
});