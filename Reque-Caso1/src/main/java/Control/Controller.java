/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Control;
import Exceptions.AccountExistsException;
import Exceptions.AccountNotFoundException;
import Logic.Account;
import java.util.ArrayList;
import java.util.Arrays;

/**
 *
 * @author crwlu
 */
public class Controller {
    private static Controller instance;
    private ArrayList<Account> accounts;

    private Controller() {
        this.accounts = new ArrayList<Account>();
    }
    
    private Account getAccountByUsername(String username) throws AccountNotFoundException {
        for (Account a : accounts) {
            if (a.getUsername().equals(username)) {
                return a;
            }
        }
        throw new AccountNotFoundException();
    }
    
    public static Controller getInstance() {
        if (instance == null) {
            instance = new Controller();
        }
        return instance;
    }

    public ArrayList<Account> getAccounts() {
        return accounts;
    }
    
    public void addAccount(String username, char[] password) throws AccountExistsException {
        if (accountExists(username)) {
            throw new AccountExistsException();
        }
        accounts.add(new Account(username, password));
    }
    
    public boolean accountExists(String username) {
        for (Account a : accounts) {
            if (a.getUsername().equals(username)) {
                return true;
            }
        }
        return false;
    }
    
    public boolean isAccountInformationCorrect(String username, char[] password) throws AccountNotFoundException {
        Account a = getAccountByUsername(username);
        return Arrays.equals(a.getPassword(), password);
    }
}
