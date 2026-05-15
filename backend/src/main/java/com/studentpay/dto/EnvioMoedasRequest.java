package com.studentpay.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class EnvioMoedasRequest {

    @NotNull public UUID alunoId;
    @Min(1) public int quantidade;
    @NotBlank public String motivo;
}
