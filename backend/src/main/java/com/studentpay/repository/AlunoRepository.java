package com.studentpay.repository;

import com.studentpay.model.Aluno;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.UUID;

@ApplicationScoped
public class AlunoRepository implements PanacheRepositoryBase<Aluno, UUID> {

    public Optional<Aluno> findByCpf(String cpf) {
        return find("cpf", cpf).firstResultOptional();
    }

    public Optional<Aluno> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }

    public Optional<Aluno> findByLogin(String login) {
        return find("login", login).firstResultOptional();
    }
}
