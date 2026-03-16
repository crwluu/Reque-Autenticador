
document.addEventListener("DOMContentLoaded", () => {
    // buscar boton
    const registerButton = document.getElementById("registerButton");
    if (!registerButton) return;

    // listener del boton
    registerButton.addEventListener("click", () => {
        // input
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const name = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // validacioes
            if (!name) throw new FieldIsEmptyException("Full name");
            if (!email) throw new FieldIsEmptyException("Email");
            if (!password) throw new FieldIsEmptyException("Password");
            if (!emailRegex.test(email)) throw new InvalidEmailException();
            if (!passwordRegex.test(password)) throw new InvalidPasswordException();
            // intentar crear cuenta
            controller.addAccount(name, email, password);

            alert("Account created. You can now log in.");

            window.location.href = "../index.html";

        } catch (error) {alert(error.message);}
    });
});