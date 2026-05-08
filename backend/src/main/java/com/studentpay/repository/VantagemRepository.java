package com.studentpay.repository;

import com.studentpay.model.Vantagem;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class VantagemRepository implements PanacheRepositoryBase<Vantagem, UUID> {

    public List<Vantagem> findByEmpresaId(UUID empresaId) {
        return find("empresa.id", empresaId).list();
    }

    public List<Vantagem> findAtivas() {
        return find("ativa", true).list();
    }
}
