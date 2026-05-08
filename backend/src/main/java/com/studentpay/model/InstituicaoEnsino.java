package com.studentpay.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "instituicoes_ensino")
public class InstituicaoEnsino {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true, length = 18)
    private String cnpj;

    @OneToMany(mappedBy = "instituicao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Curso> cursos = new ArrayList<>();

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public List<Curso> getCursos() { return cursos; }
    public void setCursos(List<Curso> cursos) { this.cursos = cursos; }
}
