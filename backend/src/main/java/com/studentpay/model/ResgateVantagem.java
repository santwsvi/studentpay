package com.studentpay.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("RESGATE")
public class ResgateVantagem extends TransacaoMoeda {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "aluno_resgatante_id")
    private Aluno resgatante;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vantagem_id")
    private Vantagem vantagem;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id")
    private EmpresaParceira empresa;

    @Column(name = "resgate_codigo")
    private String codigo;

    @Column(name = "resgate_gerado_em")
    private LocalDateTime geradoEm;

    @Column(name = "resgate_expira_em")
    private LocalDateTime expiraEm;

    @Column(name = "resgate_status")
    @Enumerated(EnumType.STRING)
    private StatusResgate status;

    public Aluno getResgatante() { return resgatante; }
    public void setResgatante(Aluno resgatante) { this.resgatante = resgatante; }

    public Vantagem getVantagem() { return vantagem; }
    public void setVantagem(Vantagem vantagem) { this.vantagem = vantagem; }

    public EmpresaParceira getEmpresa() { return empresa; }
    public void setEmpresa(EmpresaParceira empresa) { this.empresa = empresa; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public LocalDateTime getGeradoEm() { return geradoEm; }
    public void setGeradoEm(LocalDateTime geradoEm) { this.geradoEm = geradoEm; }

    public LocalDateTime getExpiraEm() { return expiraEm; }
    public void setExpiraEm(LocalDateTime expiraEm) { this.expiraEm = expiraEm; }

    public StatusResgate getStatus() { return status; }
    public void setStatus(StatusResgate status) { this.status = status; }
}
