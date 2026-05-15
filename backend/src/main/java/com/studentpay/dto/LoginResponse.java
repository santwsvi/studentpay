package com.studentpay.dto;

public class LoginResponse {
    public String token;
    public String tipoUsuario;
    public String nome;

    public LoginResponse(String token, String tipoUsuario, String nome) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
        this.nome = nome;
    }
}
