package Exceptions;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Exception.java to edit this template
 */

/**
 *
 * @author lito
 */
public class AccountExistsException extends Exception {

    /**
     * Creates a new instance of <code>UserExistsException</code> without detail
     * message.
     */
    public AccountExistsException() {
    }

    /**
     * Constructs an instance of <code>UserExistsException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public AccountExistsException(String msg) {
        super(msg);
    }
}
