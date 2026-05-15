package com.studentpay.service;

import com.studentpay.dto.CadastroAlunoRequest;
import com.studentpay.model.*;
import com.studentpay.repository.*;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class AlunoService {

    @Inject AlunoRepository alunoRepository;
    @Inject InstituicaoEnsinoRepository instituicaoRepository;
    @Inject CursoRepository cursoRepository;

    @Transactional
    public Aluno cadastrar(CadastroAlunoRequest req) {
        if (alunoRepository.findByCpf(req.cpf).isPresent()) {
            throw new BadRequestException("CPF já cadastrado");
        }
        if (alunoRepository.findByLogin(req.login).isPresent()) {
            throw new BadRequestException("Login já em uso");
        }

        InstituicaoEnsino instituicao = instituicaoRepository.findByIdOptional(req.instituicaoId)
                .orElseThrow(() -> new NotFoundException("Instituição não encontrada"));

        Curso curso = cursoRepository.findByIdOptional(req.cursoId)
                .orElseThrow(() -> new NotFoundException("Curso não encontrado"));

        Aluno aluno = new Aluno();
        aluno.setNome(req.nome);
        aluno.setEmail(req.email);
        aluno.setLogin(req.login);
        aluno.setSenhaHash(BcryptUtil.bcryptHash(req.senha));
        aluno.setCpf(req.cpf);
        aluno.setRg(req.rg);
        aluno.setMatricula(req.matricula);
        aluno.setInstituicao(instituicao);
        aluno.setCurso(curso);

        if (req.endereco != null) {
            Endereco endereco = new Endereco();
            endereco.setLogradouro(req.endereco.logradouro);
            endereco.setNumero(req.endereco.numero);
            endereco.setComplemento(req.endereco.complemento);
            endereco.setBairro(req.endereco.bairro);
            endereco.setCidade(req.endereco.cidade);
            endereco.setEstado(req.endereco.estado);
            endereco.setCep(req.endereco.cep);
            aluno.setEndereco(endereco);
        }

        CarteiraMoedas carteira = new CarteiraMoedas();
        aluno.setCarteira(carteira);

        alunoRepository.persist(aluno);
        return aluno;
    }

    public List<Aluno> listarTodos() {
        return alunoRepository.listAll();
    }

    public Aluno buscarPorId(UUID id) {
        return alunoRepository.findByIdOptional(id)
                .orElseThrow(() -> new NotFoundException("Aluno não encontrado"));
    }

    @Transactional
    public Aluno atualizar(UUID id, CadastroAlunoRequest req) {
        Aluno aluno = buscarPorId(id);
        aluno.setNome(req.nome);
        aluno.setEmail(req.email);
        if (req.cpf != null) aluno.setCpf(req.cpf);
        if (req.rg != null) aluno.setRg(req.rg);
        if (req.matricula != null) aluno.setMatricula(req.matricula);

        if (req.instituicaoId != null) {
            aluno.setInstituicao(instituicaoRepository.findByIdOptional(req.instituicaoId)
                    .orElseThrow(() -> new NotFoundException("Instituição não encontrada")));
        }
        if (req.cursoId != null) {
            aluno.setCurso(cursoRepository.findByIdOptional(req.cursoId)
                    .orElseThrow(() -> new NotFoundException("Curso não encontrado")));
        }
        if (req.endereco != null) {
            Endereco endereco = aluno.getEndereco() != null ? aluno.getEndereco() : new Endereco();
            endereco.setLogradouro(req.endereco.logradouro);
            endereco.setNumero(req.endereco.numero);
            endereco.setComplemento(req.endereco.complemento);
            endereco.setBairro(req.endereco.bairro);
            endereco.setCidade(req.endereco.cidade);
            endereco.setEstado(req.endereco.estado);
            endereco.setCep(req.endereco.cep);
            aluno.setEndereco(endereco);
        }

        return aluno;
    }

    @Transactional
    public void deletar(UUID id) {
        Aluno aluno = buscarPorId(id);
        alunoRepository.delete(aluno);
    }
}
