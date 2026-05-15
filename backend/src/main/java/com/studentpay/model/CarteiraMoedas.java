package com.studentpay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "carteiras_moedas")
public class CarteiraMoedas {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    @JsonIgnore
    private Usuario usuario;

    @Column(name = "saldo_atual", nullable = false)
    private int saldoAtual = 0;

    @OneToMany(mappedBy = "carteira", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("dataHora DESC")
    @JsonIgnore
    private List<TransacaoMoeda> transacoes = new ArrayList<>();

    public void creditar(int quantidade) {
        this.saldoAtual += quantidade;
    }

    public void debitar(int quantidade) {
        if (this.saldoAtual < quantidade) {
            throw new IllegalStateException("Saldo insuficiente");
        }
        this.saldoAtual -= quantidade;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public int getSaldoAtual() { return saldoAtual; }
    public void setSaldoAtual(int saldoAtual) { this.saldoAtual = saldoAtual; }

    public List<TransacaoMoeda> getTransacoes() { return transacoes; }
    public void setTransacoes(List<TransacaoMoeda> transacoes) { this.transacoes = transacoes; }
}
