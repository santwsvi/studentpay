package com.studentpay.controller;

import com.studentpay.dto.CadastroVantagemRequest;
import com.studentpay.service.VantagemService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import java.util.Map;
import java.util.UUID;

@Path("/api/vantagens")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class VantagemController {

    @Inject VantagemService vantagemService;
    @Inject JsonWebToken jwt;

    @GET
    public Response listarAtivas() {
        return Response.ok(vantagemService.listarAtivas()).build();
    }

    @GET
    @Path("/empresa")
    @RolesAllowed("empresa")
    public Response listarPorEmpresa() {
        UUID empresaId = UUID.fromString(jwt.getClaim("userId"));
        return Response.ok(vantagemService.listarPorEmpresa(empresaId)).build();
    }

    @POST
    @RolesAllowed("empresa")
    public Response cadastrar(@Valid CadastroVantagemRequest req) {
        UUID empresaId = UUID.fromString(jwt.getClaim("userId"));
        return Response.status(Response.Status.CREATED)
                .entity(vantagemService.cadastrar(empresaId, req)).build();
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed("empresa")
    public Response atualizar(@PathParam("id") UUID id, @Valid CadastroVantagemRequest req) {
        return Response.ok(vantagemService.atualizar(id, req)).build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed("empresa")
    public Response inativar(@PathParam("id") UUID id) {
        vantagemService.inativar(id);
        return Response.noContent().build();
    }

    @POST
    @Path("/{id}/resgatar")
    @RolesAllowed("aluno")
    public Response resgatar(@PathParam("id") UUID vantagemId) {
        UUID alunoId = UUID.fromString(jwt.getClaim("userId"));
        var resgate = vantagemService.resgatar(alunoId, vantagemId);
        return Response.ok(Map.of("codigo", resgate.getCodigo(), "message", "Resgate realizado com sucesso")).build();
    }

    @GET
    @Path("/extrato")
    @RolesAllowed("aluno")
    public Response extratoAluno() {
        UUID alunoId = UUID.fromString(jwt.getClaim("userId"));
        return Response.ok(vantagemService.consultarExtratoAluno(alunoId)).build();
    }
}
