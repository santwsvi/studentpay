package com.studentpay.model;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("CREDITO_SEMESTRAL")
public class CreditoSemestral extends TransacaoMoeda {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "professor_beneficiario_id")
    private Professor beneficiario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "semestre_id")
    private Semestre semestre;

    public Professor getBeneficiario() { return beneficiario; }
    public void setBeneficiario(Professor beneficiario) { this.beneficiario = beneficiario; }

    public Semestre getSemestre() { return semestre; }
    public void setSemestre(Semestre semestre) { this.semestre = semestre; }
}
