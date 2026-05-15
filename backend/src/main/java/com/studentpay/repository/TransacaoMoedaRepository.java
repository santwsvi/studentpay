package com.studentpay.repository;

import com.studentpay.model.TransacaoMoeda;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class TransacaoMoedaRepository implements PanacheRepositoryBase<TransacaoMoeda, UUID> {

    public List<TransacaoMoeda> findByCarteiraId(UUID carteiraId) {
        return find("carteira.id", carteiraId).list();
    }
}
