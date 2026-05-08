package com.studentpay.controller;

import com.studentpay.dto.CadastroAlunoRequest;
import com.studentpay.model.Aluno;
import com.studentpay.service.AlunoService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/alunos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AlunoController {

    @Inject AlunoService alunoService;

    @POST
    public Response cadastrar(@Valid CadastroAlunoRequest req) {
        Aluno aluno = alunoService.cadastrar(req);
        return Response.status(Response.Status.CREATED).entity(aluno).build();
    }

    @GET
    public Response listar() {
        return Response.ok(alunoService.listarTodos()).build();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") UUID id) {
        return Response.ok(alunoService.buscarPorId(id)).build();
    }

    @PUT
    @Path("/{id}")
    public Response atualizar(@PathParam("id") UUID id, @Valid CadastroAlunoRequest req) {
        return Response.ok(alunoService.atualizar(id, req)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletar(@PathParam("id") UUID id) {
        alunoService.deletar(id);
        return Response.noContent().build();
    }
}
