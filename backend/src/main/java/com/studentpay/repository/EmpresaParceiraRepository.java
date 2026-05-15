package com.studentpay.repository;

import com.studentpay.model.EmpresaParceira;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class EmpresaParceiraRepository implements PanacheRepositoryBase<EmpresaParceira, UUID> {

    public Optional<EmpresaParceira> findByCnpj(String cnpj) {
        return find("cnpj", cnpj).firstResultOptional();
    }
}
