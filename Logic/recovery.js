document.addEventListener("DOMContentLoaded", () => {

    // buscar boton
    const recoveryButton = document.getElementById("recoveryButton");
    if (!recoveryButton) return;

    //listener del boton
    recoveryButton.addEventListener("click", () => {
        //input
        const email = document.getElementById("email").value.trim();
        try {
            if (!email) throw new FieldIsEmptyException("email");

            //buscar cuenta
            if (!controller.accountExists(email)) throw new AccountNotFoundException();

            alert("Recovery email sent to " + email + ".");

        } catch (error) {alert(error.message);}
    });
});