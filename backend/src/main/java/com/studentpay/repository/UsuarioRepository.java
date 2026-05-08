package com.studentpay.repository;

import com.studentpay.model.Usuario;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class UsuarioRepository implements PanacheRepositoryBase<Usuario, UUID> {

    public Optional<Usuario> findByLogin(String login) {
        return find("login", login).firstResultOptional();
    }
}
