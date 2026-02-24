package Exceptions;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Exception.java to edit this template
 */

/**
 *
 * @author lito
 */
public class AccountNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>UserNotFoundException</code> without
     * detail message.
     */
    public AccountNotFoundException() {
    }

    /**
     * Constructs an instance of <code>UserNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public AccountNotFoundException(String msg) {
        super("Error: the given user was not found.");
    }
}
