package com.studentpay.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ENVIO")
public class EnvioMoedas extends TransacaoMoeda {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "professor_remetente_id")
    private Professor remetente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "aluno_destinatario_id")
    private Aluno destinatario;

    @Column(nullable = true)
    private String motivo;

    public Professor getRemetente() { return remetente; }
    public void setRemetente(Professor remetente) { this.remetente = remetente; }

    public Aluno getDestinatario() { return destinatario; }
    public void setDestinatario(Aluno destinatario) { this.destinatario = destinatario; }

    public String getMotivo() { return motivo; }
    public void setMotivo(String motivo) { this.motivo = motivo; }
}
