package com.studentpay.repository;

import com.studentpay.model.Curso;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class CursoRepository implements PanacheRepositoryBase<Curso, UUID> {

    public List<Curso> findByInstituicaoId(UUID instituicaoId) {
        return find("instituicao.id", instituicaoId).list();
    }
}
