package com.studentpay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "cursos")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instituicao_id", nullable = false)
    @JsonIgnore
    private InstituicaoEnsino instituicao;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public InstituicaoEnsino getInstituicao() { return instituicao; }
    public void setInstituicao(InstituicaoEnsino instituicao) { this.instituicao = instituicao; }
}
