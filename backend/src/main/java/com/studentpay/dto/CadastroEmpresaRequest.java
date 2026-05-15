package com.studentpay.dto;

import jakarta.validation.constraints.NotBlank;

public class CadastroEmpresaRequest {

    @NotBlank public String nome;
    @NotBlank public String email;
    @NotBlank public String login;
    @NotBlank public String senha;
    @NotBlank public String cnpj;
    public String nomeFantasia;
    public String site;
}
