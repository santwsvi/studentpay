package com.studentpay.repository;

import com.studentpay.model.CarteiraMoedas;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class CarteiraMoedasRepository implements PanacheRepositoryBase<CarteiraMoedas, UUID> {

    public Optional<CarteiraMoedas> findByUsuarioId(UUID usuarioId) {
        return find("usuario.id", usuarioId).firstResultOptional();
    }
}
