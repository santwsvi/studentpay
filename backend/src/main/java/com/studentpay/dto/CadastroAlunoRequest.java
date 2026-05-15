package com.studentpay.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class CadastroAlunoRequest {

    @NotBlank public String nome;
    @NotBlank public String email;
    @NotBlank public String login;
    @NotBlank public String senha;
    @NotBlank public String cpf;
    public String rg;
    public String matricula;
    @NotNull public UUID instituicaoId;
    @NotNull public UUID cursoId;
    public EnderecoRequest endereco;

    public static class EnderecoRequest {
        public String logradouro;
        public String numero;
        public String complemento;
        public String bairro;
        public String cidade;
        public String estado;
        public String cep;
    }
}
