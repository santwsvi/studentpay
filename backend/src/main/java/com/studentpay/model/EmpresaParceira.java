package com.studentpay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "empresas_parceiras")
@PrimaryKeyJoinColumn(name = "id")
public class EmpresaParceira extends Usuario {

    @NotBlank
    @Column(nullable = false, unique = true, length = 18)
    private String cnpj;

    @Column(name = "nome_fantasia")
    private String nomeFantasia;

    private String site;

    @JsonIgnore
    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vantagem> vantagens = new ArrayList<>();

    public EmpresaParceira() {
        setTipoUsuario("empresa");
    }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public String getNomeFantasia() { return nomeFantasia; }
    public void setNomeFantasia(String nomeFantasia) { this.nomeFantasia = nomeFantasia; }

    public String getSite() { return site; }
    public void setSite(String site) { this.site = site; }

    public List<Vantagem> getVantagens() { return vantagens; }
    public void setVantagens(List<Vantagem> vantagens) { this.vantagens = vantagens; }
}
