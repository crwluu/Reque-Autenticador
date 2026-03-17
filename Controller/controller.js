// excepciones
class AccountExistsException extends Error {
    constructor(msg = "Error: the user already exists.") {
        super(msg);
        this.name = "AccountExistsException";
    }
}

class PasswordIncorrectException extends Error {
    constructor(msg = "Error: Invalid email or password.") {
        super(msg);
        this.name = "PasswordIncorrectException";
    }
}

class AccountNotFoundException extends Error {
    constructor(msg = "Error: Invalid email or password.") {
        super(msg);
        this.name = "AccountNotFoundException";
    }
}

class FieldIsEmptyException extends Error {
    constructor(field) {
        super(`Error: the ${field} field cannot be empty.`); 
        this.name = "FieldIsEmptyException";
        this.field = field;
    }
}

class InvalidEmailException extends Error {
    constructor(msg = "Error: invalid e-mail address.") {
        super(msg);
        this.name = "InvalidEmailException";
    }
}

class InvalidPasswordException extends Error {
    constructor(msg = "Error: the password must consist of at least one upper-case letter, one lower-case letter, one number, and one special character. It should be between 8 and 16 characters long.") {
        super(msg);
        this.name = "InvalidPasswordException";
    }
}


// clase Account
class Account {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password; 
    }

    // getters
    getName() { return this.name; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }

    // setters
    setName(name) { this.name = name; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
}


// controller
class Controller {
    constructor() {
        if (Controller.instance) return Controller.instance;
        this.accounts = [];
        this.loadAccounts(); // cargar datos
        Controller.instance = this;
    }

    // singleton
    static getInstance() {
        if (!Controller.instance) Controller.instance = new Controller();
        return Controller.instance;
    }

    // guardar sesion
    setCurrentUser(email) {
        localStorage.setItem("currentUser", email);
    }

    // cerrar sesion
    logout() {
        localStorage.removeItem("currentUser");
    }

    // obtener usuario activo
    getCurrentUser() {
        const email = localStorage.getItem("currentUser");
        if (!email) return null;
        if (this.accountExists(email)) {
            return this.getAccountByEmail(email);
        } else {
            return null;
        }
    }

    // devuelve todas las cuentas
    getAccounts() { return this.accounts; }

    // buscar cuenta por email
    getAccountByEmail(email) {
        const account = this.accounts.find(a => a.getEmail() === email);
        if (!account) throw new AccountNotFoundException();
        return account;
    }

    // agregar cuenta nueva
    addAccount(name, email, password) {
        if (this.accountExists(email)) throw new AccountExistsException();
        const account = new Account(name, email, password);
        this.accounts.push(account);
        this.saveAccounts(); // guardar
    }

    // comprobar que existe el email
    accountExists(email) {
        return this.accounts.some(a => a.getEmail() === email);
    }

    // validar login
    isPasswordCorrect(email, password) {
        const account = this.getAccountByEmail(email);
        return account.getPassword() === password;
    }

    // para login
    login(email, password) {

        if (!email) throw new FieldIsEmptyException("email");
        if (!password) throw new FieldIsEmptyException("password");

        const account = this.getAccountByEmail(email);

        if (account.getPassword() !== password)
            throw new PasswordIncorrectException();

        return account;
    }

    // convierte el array con cuentas a un string que se guarda en local storage
    saveAccounts() {
        const data = this.accounts.map(a => ({
            name: a.getName(),
            email: a.getEmail(),
            password: a.getPassword()
        }));
        localStorage.setItem("accounts", JSON.stringify(data));
    }

    // cargar desde localStorage
    loadAccounts() {
        const data = JSON.parse(localStorage.getItem("accounts") || "[]");
        this.accounts = data.map(a => new Account(a.name, a.email, a.password));
    }

    
}

// CONTROLADOR GLOBAL
const controller = Controller.getInstance();
if (!controller.accountExists("test@email.com")) {
    controller.addAccount("User", "test@email.com", "1234");
}
