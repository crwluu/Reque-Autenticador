/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.lenguajes.caso1;
import java.util.ArrayList;

/**
 *
 * @author crwlu
 */
public class Controller {
    private ArrayList<User> users;

    public Controller() {
        this.users = new ArrayList<User>();
    }

    public ArrayList<User> getUsers() {
        return users;
    }
    
    public void addUser(String username, String password) {
        users.add(new User(username, password));
    }
    
    public int userExists(String username) {
        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return 1;
            }
        }
        return 0;
    } 
    
}
