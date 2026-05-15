package com.studentpay.service;

import com.studentpay.dto.CadastroEmpresaRequest;
import com.studentpay.model.CarteiraMoedas;
import com.studentpay.model.EmpresaParceira;
import com.studentpay.repository.EmpresaParceiraRepository;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class EmpresaParceiraService {

    @Inject EmpresaParceiraRepository empresaRepository;

    @Transactional
    public EmpresaParceira cadastrar(CadastroEmpresaRequest req) {
        if (empresaRepository.findByCnpj(req.cnpj).isPresent()) {
            throw new BadRequestException("CNPJ já cadastrado");
        }

        EmpresaParceira empresa = new EmpresaParceira();
        empresa.setNome(req.nome);
        empresa.setEmail(req.email);
        empresa.setLogin(req.login);
        empresa.setSenhaHash(BcryptUtil.bcryptHash(req.senha));
        empresa.setCnpj(req.cnpj);
        empresa.setNomeFantasia(req.nomeFantasia);
        empresa.setSite(req.site);

        CarteiraMoedas carteira = new CarteiraMoedas();
        empresa.setCarteira(carteira);

        empresaRepository.persist(empresa);
        return empresa;
    }

    public List<EmpresaParceira> listarTodas() {
        return empresaRepository.listAll();
    }

    public EmpresaParceira buscarPorId(UUID id) {
        return empresaRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Empresa não encontrada"));
    }

    @Transactional
    public EmpresaParceira atualizar(UUID id, CadastroEmpresaRequest req) {
        EmpresaParceira empresa = buscarPorId(id);
        empresa.setNome(req.nome);
        empresa.setEmail(req.email);
        if (req.cnpj != null) empresa.setCnpj(req.cnpj);
        if (req.nomeFantasia != null) empresa.setNomeFantasia(req.nomeFantasia);
        if (req.site != null) empresa.setSite(req.site);
        return empresa;
    }

    @Transactional
    public void deletar(UUID id) {
        EmpresaParceira empresa = buscarPorId(id);
        empresaRepository.delete(empresa);
    }
}
