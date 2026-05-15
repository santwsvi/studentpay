package com.studentpay.service;

import com.studentpay.dto.CadastroVantagemRequest;
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
public class VantagemService {

    @Inject VantagemRepository vantagemRepository;
    @Inject AlunoRepository alunoRepository;
    @Inject EmpresaParceiraRepository empresaRepository;
    @Inject CarteiraMoedasRepository carteiraRepository;
    @Inject TransacaoMoedaRepository transacaoRepository;
    @Inject NotificacaoEmailService emailService;

    @Transactional
    public Vantagem cadastrar(UUID empresaId, CadastroVantagemRequest req) {
        EmpresaParceira empresa = empresaRepository.findByIdOptional(empresaId)
                .orElseThrow(() -> new NotFoundException("Empresa não encontrada"));

        Vantagem vantagem = new Vantagem();
        vantagem.setDescricao(req.descricao);
        vantagem.setFotoUrl(req.fotoUrl);
        vantagem.setCustoMoedas(req.custoMoedas);
        vantagem.setEmpresa(empresa);
        vantagemRepository.persist(vantagem);
        return vantagem;
    }

    public List<Vantagem> listarAtivas() {
        return vantagemRepository.findAtivas();
    }

    public List<Vantagem> listarPorEmpresa(UUID empresaId) {
        return vantagemRepository.findByEmpresaId(empresaId);
    }

    @Transactional
    public Vantagem atualizar(UUID vantagemId, CadastroVantagemRequest req) {
        Vantagem vantagem = vantagemRepository.findByIdOptional(vantagemId)
                .orElseThrow(() -> new NotFoundException("Vantagem não encontrada"));
        vantagem.setDescricao(req.descricao);
        if (req.fotoUrl != null) vantagem.setFotoUrl(req.fotoUrl);
        vantagem.setCustoMoedas(req.custoMoedas);
        return vantagem;
    }

    @Transactional
    public void inativar(UUID vantagemId) {
        Vantagem vantagem = vantagemRepository.findByIdOptional(vantagemId)
                .orElseThrow(() -> new NotFoundException("Vantagem não encontrada"));
        vantagem.setAtiva(false);
    }

    @Transactional
    public ResgateVantagem resgatar(UUID alunoId, UUID vantagemId) {
        Aluno aluno = alunoRepository.findByIdOptional(alunoId)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado"));

        Vantagem vantagem = vantagemRepository.findByIdOptional(vantagemId)
                .orElseThrow(() -> new NotFoundException("Vantagem não encontrada"));

        if (!vantagem.isAtiva()) {
            throw new IllegalStateException("Vantagem não está ativa");
        }

        CarteiraMoedas carteira = carteiraRepository.findByUsuarioId(alunoId)
                .orElseThrow(() -> new IllegalStateException("Carteira não encontrada"));

        carteira.debitar(vantagem.getCustoMoedas());

        String codigo = UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        ResgateVantagem resgate = new ResgateVantagem();
        resgate.setQuantidade(vantagem.getCustoMoedas());
        resgate.setDescricao("Resgate: " + vantagem.getDescricao());
        resgate.setResgatante(aluno);
        resgate.setVantagem(vantagem);
        resgate.setEmpresa(vantagem.getEmpresa());
        resgate.setCodigo(codigo);
        resgate.setGeradoEm(LocalDateTime.now());
        resgate.setExpiraEm(LocalDateTime.now().plusDays(30));
        resgate.setStatus(StatusResgate.GERADO);
        resgate.setCarteira(carteira);
        resgate.setDataHora(LocalDateTime.now());
        transacaoRepository.persist(resgate);

        emailService.notificarResgate(aluno, vantagem.getEmpresa(), vantagem, codigo);

        return resgate;
    }

    public ExtratoResponse consultarExtratoAluno(UUID alunoId) {
        CarteiraMoedas carteira = carteiraRepository.findByUsuarioId(alunoId)
                .orElseThrow(() -> new NotFoundException("Carteira não encontrada"));

        List<TransacaoMoeda> transacoes = transacaoRepository.findByCarteiraId(carteira.getId());

        List<ExtratoResponse.TransacaoDTO> dtos = transacoes.stream()
                .map(t -> {
                    String contraparte = "";
                    if (t instanceof EnvioMoedas e) {
                        contraparte = e.getRemetente().getNome();
                    } else if (t instanceof ResgateVantagem r) {
                        contraparte = r.getVantagem().getDescricao();
                    }
                    return new ExtratoResponse.TransacaoDTO(
                            t.getTipo(), t.getQuantidade(), t.getDescricao(),
                            t.getDataHora(), contraparte
                    );
                }).toList();

        return new ExtratoResponse(carteira.getSaldoAtual(), dtos);
    }
}
