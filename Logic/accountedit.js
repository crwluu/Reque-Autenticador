document.addEventListener("DOMContentLoaded", () => {

    // usuario actualmente loggeado (para probar)
    const currentUser = controller.getAccountByEmail("test@email.com");

    // rellenar los campos con la info actual
    document.getElementById("fullname").value = currentUser.getName();
    document.getElementById("email").value = currentUser.getEmail();
    // si quieres mostrar username también
    // document.getElementById("username").value = currentUser.getUsername();

    const applyButton = document.getElementById("applyChangesButton");
    if (!applyButton) return;

    applyButton.addEventListener("click", (event) => {
        event.preventDefault(); // evitar que <a> haga navegación

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        try {
            // validaciones
            if (!name) throw new FieldIsEmptyException("Full name");
            if (!email) throw new FieldIsEmptyException("Email");

            if (password || confirmPassword) { // si se quiere cambiar la contraseña
                if (!password) throw new FieldIsEmptyException("Password");
                if (!confirmPassword) throw new FieldIsEmptyException("Confirm password");
                if (password !== confirmPassword) throw new PasswordIncorrectException("Error: password and confirmation do not match.");
            }

            // verificar si el email ya está en uso por otro usuario
            if (email !== currentUser.getEmail() && controller.accountExists(email)) {
                throw new AccountExistsException();
            }

            // aplicar cambios
            currentUser.setName(name);
            currentUser.setEmail(email);
            if (password) currentUser.setPassword(password);

            alert("Account updated successfully.");
            window.location.href = "landingpage.html";

        } catch (error) {
            alert(error.message);
        }

    });

});