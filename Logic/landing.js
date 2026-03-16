document.addEventListener("DOMContentLoaded", () => {

    const welcomeHeading = document.querySelector(".card h1"); // seleccionar heading
    const signOutLink = document.querySelector('a[href="../index.html"]'); // cambiar texto

    const currentUser = controller.getCurrentUser();

    if (!currentUser) {
        alert("No current user. Redirecting to login.");
        window.location.href = "../index.html";
        return;
    }

    // mostrar nombre del usuario
    welcomeHeading.textContent = `Welcome, ${currentUser.getName()}`;

    // listener de logout
    signOutLink.addEventListener("click", (event) => {
        event.preventDefault();
        controller.logout();
        window.location.href = "../index.html";
    });

});