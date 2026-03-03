
document.addEventListener("DOMContentLoaded", () => {
    // buscar boton
    const registerButton = document.getElementById("registerButton");
    if (!registerButton) return;

    // listener del boton
    registerButton.addEventListener("click", () => {
        // input
        const name = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // validacioes
            if (!name) throw new FieldIsEmptyException("Full name");
            if (!email) throw new FieldIsEmptyException("Email");
            if (!password) throw new FieldIsEmptyException("Password");

            // intentar crear cuenta
            controller.addAccount(name, email, password);

            alert("Account created. You can now log in.");

            window.location.href = "index.html";

        } catch (error) {alert(error.message);}
    });
});