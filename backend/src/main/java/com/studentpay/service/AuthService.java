package com.studentpay.service;

import com.studentpay.dto.LoginRequest;
import com.studentpay.dto.LoginResponse;
import com.studentpay.model.Usuario;
import com.studentpay.repository.UsuarioRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.NotAuthorizedException;
import java.time.Duration;
import java.util.Set;

@ApplicationScoped
public class AuthService {

    @Inject UsuarioRepository usuarioRepository;

    public LoginResponse autenticar(LoginRequest req) {
        Usuario usuario = usuarioRepository.findByLogin(req.login)
                .orElseThrow(() -> new NotAuthorizedException("Credenciais inválidas"));

        if (!BcryptUtil.matches(req.senha, usuario.getSenhaHash())) {
            throw new NotAuthorizedException("Credenciais inválidas");
        }

        if (!usuario.isAtivo()) {
            throw new NotAuthorizedException("Usuário inativo");
        }

        String token = Jwt.issuer("studentpay")
                .upn(usuario.getLogin())
                .groups(Set.of(usuario.getTipoUsuario()))
                .claim("userId", usuario.getId().toString())
                .claim("nome", usuario.getNome())
                .expiresIn(Duration.ofHours(8))
                .sign();

        return new LoginResponse(token, usuario.getTipoUsuario(), usuario.getNome());
    }
}
