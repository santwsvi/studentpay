package com.studentpay.controller;

import com.studentpay.repository.InstituicaoEnsinoRepository;
import com.studentpay.repository.CursoRepository;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/instituicoes")
@Produces(MediaType.APPLICATION_JSON)
public class InstituicaoController {

    @Inject InstituicaoEnsinoRepository instituicaoRepository;
    @Inject CursoRepository cursoRepository;

    @GET
    @PermitAll
    public Response listar() {
        return Response.ok(instituicaoRepository.listAll()).build();
    }

    @GET
    @PermitAll
    @Path("/{id}/cursos")
    public Response listarCursos(@PathParam("id") UUID id) {
        return Response.ok(cursoRepository.findByInstituicaoId(id)).build();
    }
}
