package com.studentpay.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class CadastroVantagemRequest {

    @NotBlank public String descricao;
    public String fotoUrl;
    @Min(1) public int custoMoedas;
}
