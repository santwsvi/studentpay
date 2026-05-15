package com.studentpay.controller;

import com.studentpay.dto.EnvioMoedasRequest;
import com.studentpay.service.ProfessorService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import java.util.Map;
import java.util.UUID;

@Path("/api/professores")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProfessorController {

    @Inject ProfessorService professorService;
    @Inject JsonWebToken jwt;

    @GET
    public Response listar() {
        return Response.ok(professorService.listarTodos()).build();
    }

    @POST
    @Path("/enviar-moedas")
    @RolesAllowed("professor")
    public Response enviarMoedas(@Valid EnvioMoedasRequest req) {
        UUID professorId = UUID.fromString(jwt.getClaim("userId"));
        professorService.enviarMoedas(professorId, req);
        return Response.ok(Map.of("message", "Moedas enviadas com sucesso")).build();
    }

    @GET
    @Path("/extrato")
    @RolesAllowed("professor")
    public Response extrato() {
        UUID professorId = UUID.fromString(jwt.getClaim("userId"));
        return Response.ok(professorService.consultarExtrato(professorId)).build();
    }
}
