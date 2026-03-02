// auth.js

// clase Account
class Account {

    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password; // encriptar
    }

    // getters
    getName() { return this.name; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }

    // setters
    setName(name) { this.name = name; }
    setEmail(Email) { this.Email = Email; }
    setPassword(password) { this.password = password; }
}

// excepciones
class AccountExistsException extends Error {
    constructor(msg = "Error: the user already exists.") {
        super(msg);
        this.name = "AccountExistsException";
    }
}

class PasswordIncorrectException extends Error {
    constructor(msg = "Error: the password is incorrect.") {
        super(msg);
        this.name = "PasswordIncorrectException";
    }
}

class FieldIsEmptyException extends Error {
    constructor(field) {
        super(`Error: the ${field} field cannot be empty.`); 
        this.name = "FieldIsEmptyException";
        this.field = field;
    }
}

class AccountNotFoundException extends Error {
    constructor(msg = "Error: the given user was not found.") {
        super(msg);
        this.name = "AccountNotFoundException";
    }
}


// controller
class Controller {
    constructor() {
        if (Controller.instance) return Controller.instance;
        this.accounts = [];
        Controller.instance = this;
    }

    // singleton
    static getInstance() {
        if (!Controller.instance) Controller.instance = new Controller();
        return Controller.instance;
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
    addAccount(email, password) {
        if (this.accountExists(email)) throw new AccountExistsException();
        const account = new Account(name, email, password);
        this.accounts.push(account);
    }

    // comprobar que existe el email
    accountExists(email) {
        return this.accounts.some(a => a.getEmail() === email);
    }

    // validar login
    isPasswordCorrect(email, password) {
        const account = this.getAccountByEmail(Email);
        return account.getPassword() === password;
    }
}

// instancia global
const controller = Controller.getInstance();