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
    addAccount(name, email, password) {
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
}

// CONTROLADOR GLOBAL
const controller = Controller.getInstance();
controller.addAccount("Test User", "test@email.com", "1234");