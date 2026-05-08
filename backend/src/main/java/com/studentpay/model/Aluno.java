package com.studentpay.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "alunos")
@PrimaryKeyJoinColumn(name = "id")
public class Aluno extends Usuario {

    @NotBlank
    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @Column(length = 20)
    private String rg;

    @Column(unique = true)
    private String matricula;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituicao_id", nullable = false)
    @NotNull
    private InstituicaoEnsino instituicao;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "curso_id", nullable = false)
    @NotNull
    private Curso curso;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "logradouro", column = @Column(name = "endereco_logradouro")),
        @AttributeOverride(name = "numero", column = @Column(name = "endereco_numero")),
        @AttributeOverride(name = "complemento", column = @Column(name = "endereco_complemento")),
        @AttributeOverride(name = "bairro", column = @Column(name = "endereco_bairro")),
        @AttributeOverride(name = "cidade", column = @Column(name = "endereco_cidade")),
        @AttributeOverride(name = "estado", column = @Column(name = "endereco_estado")),
        @AttributeOverride(name = "cep", column = @Column(name = "endereco_cep"))
    })
    private Endereco endereco;

    public Aluno() {
        setTipoUsuario("aluno");
    }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getRg() { return rg; }
    public void setRg(String rg) { this.rg = rg; }

    public String getMatricula() { return matricula; }
    public void setMatricula(String matricula) { this.matricula = matricula; }

    public InstituicaoEnsino getInstituicao() { return instituicao; }
    public void setInstituicao(InstituicaoEnsino instituicao) { this.instituicao = instituicao; }

    public Curso getCurso() { return curso; }
    public void setCurso(Curso curso) { this.curso = curso; }

    public Endereco getEndereco() { return endereco; }
    public void setEndereco(Endereco endereco) { this.endereco = endereco; }
}
