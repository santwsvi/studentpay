package com.studentpay.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ExtratoResponse {

    public int saldoAtual;
    public List<TransacaoDTO> transacoes;

    public ExtratoResponse(int saldoAtual, List<TransacaoDTO> transacoes) {
        this.saldoAtual = saldoAtual;
        this.transacoes = transacoes;
    }

    public static class TransacaoDTO {
        public String tipo;
        public int quantidade;
        public String descricao;
        public LocalDateTime dataHora;
        public String contraparte;

        public TransacaoDTO(String tipo, int quantidade, String descricao, LocalDateTime dataHora, String contraparte) {
            this.tipo = tipo;
            this.quantidade = quantidade;
            this.descricao = descricao;
            this.dataHora = dataHora;
            this.contraparte = contraparte;
        }
    }
}
