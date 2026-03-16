
document.addEventListener("DOMContentLoaded", () => {

    // datos
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const applyButton = document.getElementById("applyChangesButton");

    if (!applyButton) return;

    // cargar datos del usuario
    const currentUser = controller.getCurrentUser();
    if (currentUser) {
        fullnameInput.value = currentUser.getName();
        emailInput.value = currentUser.getEmail();
    } else {
        alert("No current user");
        window.location.href = "../index.html";
    }

    // listener del boton
    applyButton.addEventListener("click", () => {
        try {
    
            const newName = fullnameInput.value.trim();
            const newEmail = emailInput.value.trim();
            const newPassword = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            // validaciones
            if (!newName) throw new FieldIsEmptyException("Full name");
            if (!newEmail) throw new FieldIsEmptyException("Email");
            if (newPassword || confirmPassword) {
                if (!newPassword) throw new FieldIsEmptyException("New password");
                if (!confirmPassword) throw new FieldIsEmptyException("Confirm new password");
                if (newPassword !== confirmPassword)
                    throw new PasswordIncorrectException("Passwords do not match");
            }

            // actualizar datos de current user
            if (!currentUser) throw new AccountNotFoundException("No user is logged in");

            currentUser.setName(newName);
            currentUser.setEmail(newEmail);
            if (newPassword) currentUser.setPassword(newPassword);

            // guardar cambios
            controller.saveAccounts();

            alert("Account updated successfully.");
            window.location.href = "../UI/landingpage.html";

        } catch (error) {
            alert(error.message);
        }
    });
});