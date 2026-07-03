package com.studentpay.controller;

import com.studentpay.dto.CadastroEmpresaRequest;
import com.studentpay.model.EmpresaParceira;
import com.studentpay.service.EmpresaParceiraService;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;

@Path("/api/empresas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EmpresaParceiraController {

    @Inject EmpresaParceiraService empresaService;

    @POST
    @PermitAll
    public Response cadastrar(@Valid CadastroEmpresaRequest req) {
        EmpresaParceira empresa = empresaService.cadastrar(req);
        return Response.status(Response.Status.CREATED).entity(empresa).build();
    }

    @GET
    @PermitAll
    public Response listar() {
        return Response.ok(empresaService.listarTodas()).build();
    }

    @GET
    @PermitAll
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") UUID id) {
        return Response.ok(empresaService.buscarPorId(id)).build();
    }

    @PUT
    @PermitAll
    @Path("/{id}")
    public Response atualizar(@PathParam("id") UUID id, @Valid CadastroEmpresaRequest req) {
        return Response.ok(empresaService.atualizar(id, req)).build();
    }

    @DELETE
    @PermitAll
    @Path("/{id}")
    public Response deletar(@PathParam("id") UUID id) {
        empresaService.deletar(id);
        return Response.noContent().build();
    }
}
