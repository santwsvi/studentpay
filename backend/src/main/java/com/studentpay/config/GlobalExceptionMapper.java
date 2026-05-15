package com.studentpay.config;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.NotAuthorizedException;
import java.util.Map;

@Provider
public class GlobalExceptionMapper implements ExceptionMapper<Exception> {

    @Override
    public Response toResponse(Exception e) {
        if (e instanceof BadRequestException) {
            return Response.status(400).entity(Map.of("error", e.getMessage())).build();
        }
        if (e instanceof NotFoundException) {
            return Response.status(404).entity(Map.of("error", e.getMessage())).build();
        }
        if (e instanceof NotAuthorizedException) {
            return Response.status(401).entity(Map.of("error", e.getMessage())).build();
        }
        if (e instanceof IllegalStateException) {
            return Response.status(422).entity(Map.of("error", e.getMessage())).build();
        }
        return Response.status(500).entity(Map.of("error", "Erro interno do servidor")).build();
    }
}
