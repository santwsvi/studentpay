package com.studentpay.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "professores")
@PrimaryKeyJoinColumn(name = "id")
public class Professor extends Usuario {

    @NotBlank
    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    @NotBlank
    @Column(nullable = false)
    private String departamento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instituicao_id", nullable = false)
    @NotNull
    private InstituicaoEnsino instituicao;

    public Professor() {
        setTipoUsuario("professor");
    }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getDepartamento() { return departamento; }
    public void setDepartamento(String departamento) { this.departamento = departamento; }

    public InstituicaoEnsino getInstituicao() { return instituicao; }
    public void setInstituicao(InstituicaoEnsino instituicao) { this.instituicao = instituicao; }
}
