package com.studentpay.controller;

import com.studentpay.dto.LoginRequest;
import com.studentpay.dto.LoginResponse;
import com.studentpay.service.AuthService;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthController {

    @Inject AuthService authService;

    @POST
    @PermitAll
    @Path("/login")
    public Response login(@Valid LoginRequest req) {
        LoginResponse response = authService.autenticar(req);
        return Response.ok(response).build();
    }
}
