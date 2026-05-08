package com.studentpay.service;

import com.studentpay.dto.EnvioMoedasRequest;
import com.studentpay.dto.ExtratoResponse;
import com.studentpay.model.*;
import com.studentpay.repository.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ProfessorService {

    @Inject ProfessorRepository professorRepository;
    @Inject AlunoRepository alunoRepository;
    @Inject CarteiraMoedasRepository carteiraRepository;
    @Inject TransacaoMoedaRepository transacaoRepository;
    @Inject NotificacaoEmailService emailService;

    @Transactional
    public EnvioMoedas enviarMoedas(UUID professorId, EnvioMoedasRequest req) {
        Professor professor = professorRepository.findByIdOptional(professorId)
                .orElseThrow(() -> new NotFoundException("Professor não encontrado"));

        Aluno aluno = alunoRepository.findByIdOptional(req.alunoId)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado"));

        CarteiraMoedas carteiraProfessor = carteiraRepository.findByUsuarioId(professorId)
                .orElseThrow(() -> new IllegalStateException("Carteira do professor não encontrada"));

        CarteiraMoedas carteiraAluno = carteiraRepository.findByUsuarioId(req.alunoId)
                .orElseThrow(() -> new IllegalStateException("Carteira do aluno não encontrada"));

        carteiraProfessor.debitar(req.quantidade);

        carteiraAluno.creditar(req.quantidade);

        EnvioMoedas envio = new EnvioMoedas();
        envio.setQuantidade(req.quantidade);
        envio.setDescricao("Envio de moedas: " + req.motivo);
        envio.setMotivo(req.motivo);
        envio.setRemetente(professor);
        envio.setDestinatario(aluno);
        envio.setCarteira(carteiraProfessor);
        envio.setDataHora(LocalDateTime.now());
        transacaoRepository.persist(envio);

        EnvioMoedas recebimento = new EnvioMoedas();
        recebimento.setQuantidade(req.quantidade);
        recebimento.setDescricao("Moedas recebidas de " + professor.getNome() + ": " + req.motivo);
        recebimento.setMotivo(req.motivo);
        recebimento.setRemetente(professor);
        recebimento.setDestinatario(aluno);
        recebimento.setCarteira(carteiraAluno);
        recebimento.setDataHora(LocalDateTime.now());
        transacaoRepository.persist(recebimento);

        emailService.notificarGanhoMoedas(aluno, professor, req.quantidade, req.motivo);

        return envio;
    }

    public ExtratoResponse consultarExtrato(UUID professorId) {
        CarteiraMoedas carteira = carteiraRepository.findByUsuarioId(professorId)
                .orElseThrow(() -> new NotFoundException("Carteira não encontrada"));

        List<TransacaoMoeda> transacoes = transacaoRepository.findByCarteiraId(carteira.getId());

        List<ExtratoResponse.TransacaoDTO> dtos = transacoes.stream()
                .map(t -> {
                    String contraparte = "";
                    if (t instanceof EnvioMoedas e) {
                        contraparte = e.getDestinatario().getNome();
                    } else if (t instanceof CreditoSemestral c) {
                        contraparte = "Sistema (crédito semestral)";
                    }
                    return new ExtratoResponse.TransacaoDTO(
                            t.getTipo(), t.getQuantidade(), t.getDescricao(),
                            t.getDataHora(), contraparte
                    );
                }).toList();

        return new ExtratoResponse(carteira.getSaldoAtual(), dtos);
    }

    public List<Professor> listarTodos() {
        return professorRepository.listAll();
    }
}
