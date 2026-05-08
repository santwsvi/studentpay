package com.studentpay.service;

import com.studentpay.model.Aluno;
import com.studentpay.model.EmpresaParceira;
import com.studentpay.model.Professor;
import com.studentpay.model.Vantagem;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class NotificacaoEmailService {

    @Inject Mailer mailer;

    public void notificarGanhoMoedas(Aluno aluno, Professor professor, int quantidade, String motivo) {
        String assunto = "StudentPay - Você recebeu " + quantidade + " moedas!";
        String corpo = String.format(
                """
                Olá, %s!

                Você recebeu %d moedas do professor %s.
                Motivo: %s

                Acesse o sistema para conferir seu saldo atualizado.

                — StudentPay
                """,
                aluno.getNome(), quantidade, professor.getNome(), motivo
        );

        mailer.send(Mail.withText(aluno.getEmail(), assunto, corpo));
    }

    public void notificarResgate(Aluno aluno, EmpresaParceira empresa, Vantagem vantagem, String codigo) {
        String assuntoAluno = "StudentPay - Cupom de resgate gerado!";
        String corpoAluno = String.format(
                """
                Olá, %s!

                Você resgatou a vantagem: %s
                Custo: %d moedas
                Código do cupom: %s

                Apresente este código na empresa parceira para retirar seu benefício.

                — StudentPay
                """,
                aluno.getNome(), vantagem.getDescricao(), vantagem.getCustoMoedas(), codigo
        );

        mailer.send(Mail.withText(aluno.getEmail(), assuntoAluno, corpoAluno));

        String assuntoEmpresa = "StudentPay - Novo resgate de vantagem!";
        String corpoEmpresa = String.format(
                """
                Olá, %s!

                O aluno %s resgatou a vantagem: %s
                Código de conferência: %s

                Por favor, verifique este código ao realizar a entrega do benefício.

                — StudentPay
                """,
                empresa.getNomeFantasia() != null ? empresa.getNomeFantasia() : empresa.getNome(),
                aluno.getNome(), vantagem.getDescricao(), codigo
        );

        mailer.send(Mail.withText(empresa.getEmail(), assuntoEmpresa, corpoEmpresa));
    }
}
