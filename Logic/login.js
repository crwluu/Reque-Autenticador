document.addEventListener("DOMContentLoaded", () => {

    // buscar boton
    const loginButton = document.getElementById("loginButton");
    if (!loginButton) return;

    // listener del boton
    loginButton.addEventListener("click", () => {

        // input
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const account = controller.login(email, password);
            controller.setCurrentUser(account.getEmail());
            //redirigir
            window.location.href = "UI/landingpage.html";

        } catch (error) {alert(error.message);}
    });
});