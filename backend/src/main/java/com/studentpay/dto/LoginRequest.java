package com.studentpay.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank public String login;
    @NotBlank public String senha;
}
