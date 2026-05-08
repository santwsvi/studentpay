package com.studentpay.repository;

import com.studentpay.model.Professor;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class ProfessorRepository implements PanacheRepositoryBase<Professor, UUID> {

    public Optional<Professor> findByCpf(String cpf) {
        return find("cpf", cpf).firstResultOptional();
    }
}
