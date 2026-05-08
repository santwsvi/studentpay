package com.studentpay.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "semestres")
public class Semestre {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private int ano;

    @Column(nullable = false)
    private int periodo;

    private LocalDate inicio;
    private LocalDate fim;

    public String getIdentificador() {
        return ano + "/" + periodo;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public int getAno() { return ano; }
    public void setAno(int ano) { this.ano = ano; }

    public int getPeriodo() { return periodo; }
    public void setPeriodo(int periodo) { this.periodo = periodo; }

    public LocalDate getInicio() { return inicio; }
    public void setInicio(LocalDate inicio) { this.inicio = inicio; }

    public LocalDate getFim() { return fim; }
    public void setFim(LocalDate fim) { this.fim = fim; }
}
