package com.studentpay.repository;

import com.studentpay.model.InstituicaoEnsino;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.UUID;

@ApplicationScoped
public class InstituicaoEnsinoRepository implements PanacheRepositoryBase<InstituicaoEnsino, UUID> {
}
