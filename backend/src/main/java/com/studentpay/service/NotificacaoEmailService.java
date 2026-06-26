package com.studentpay.service;

import com.studentpay.model.Aluno;
import com.studentpay.model.EmpresaParceira;
import com.studentpay.model.Professor;
import com.studentpay.model.Vantagem;
import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Serviço de notificação por e-mail.
 *
 * <p>As mensagens são montadas a partir de templates HTML type-safe do Qute
 * ({@code src/main/resources/templates/emails}). Cada caso de uso possui um
 * template dedicado, conforme exigido pela Release 2:
 * <ul>
 *   <li>Envio de moedas → template para o <b>professor</b> (comprovante) e para o <b>aluno</b> (recebimento);</li>
 *   <li>Resgate de vantagem → template para o <b>aluno</b> (cupom) e para a <b>empresa</b> (conferência).</li>
 * </ul>
 */
@ApplicationScoped
public class NotificacaoEmailService {

    private static final DateTimeFormatter VALIDADE_FMT =
            DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @Inject
    Mailer mailer;

    @Inject
    QrCodeService qrCodeService;

    /**
     * Templates HTML validados em tempo de compilação. O nome de cada método
     * mapeia para o arquivo {@code templates/emails/<nome>.html} e os parâmetros
     * são checados contra as variáveis usadas no template.
     */
    @CheckedTemplate(basePath = "emails")
    static class Templates {
        static native TemplateInstance envioMoedasAluno(
                String alunoNome, String professorNome, int quantidade, String motivo, int saldoAtual);

        static native TemplateInstance envioMoedasProfessor(
                String professorNome, String alunoNome, int quantidade, String motivo, int saldoRestante);

        static native TemplateInstance resgateAluno(
                String alunoNome, String vantagemDescricao, int custoMoedas, String codigo, String validade, int saldoRestante, String qrCodeBase64);

        static native TemplateInstance resgateEmpresa(
                String empresaNome, String alunoNome, String vantagemDescricao, int custoMoedas, String codigo, String validade, String qrCodeBase64);
    }

    /** Notifica o aluno de que recebeu moedas de um professor. */
    public void notificarRecebimentoAluno(Aluno aluno, Professor professor, int quantidade, String motivo, int saldoAtual) {
        String html = Templates.envioMoedasAluno(
                aluno.getNome(), professor.getNome(), quantidade, motivo, saldoAtual).render();
        mailer.send(Mail.withHtml(aluno.getEmail(),
                "StudentPay · Você recebeu " + quantidade + " moedas 🪙", html));
    }

    /** Envia ao professor o comprovante de envio de moedas. */
    public void notificarEnvioProfessor(Professor professor, Aluno aluno, int quantidade, String motivo, int saldoRestante) {
        String html = Templates.envioMoedasProfessor(
                professor.getNome(), aluno.getNome(), quantidade, motivo, saldoRestante).render();
        mailer.send(Mail.withHtml(professor.getEmail(),
                "StudentPay · Comprovante de envio de " + quantidade + " moedas", html));
    }

    /** Notifica aluno (cupom) e empresa (conferência) sobre um resgate de vantagem. */
    public void notificarResgate(Aluno aluno, EmpresaParceira empresa, Vantagem vantagem,
                                 String codigo, int saldoRestante, LocalDateTime expiraEm) {
        String validade = expiraEm != null ? VALIDADE_FMT.format(expiraEm) : "—";

        // Lab05S01: gera QR Code único com o código do cupom
        String qrCodeBase64 = qrCodeService.gerarBase64(codigo);

        String htmlAluno = Templates.resgateAluno(
                aluno.getNome(), vantagem.getDescricao(), vantagem.getCustoMoedas(),
                codigo, validade, saldoRestante, qrCodeBase64).render();
        mailer.send(Mail.withHtml(aluno.getEmail(),
                "StudentPay · Seu cupom de resgate: " + codigo, htmlAluno));

        String nomeEmpresa = empresa.getNomeFantasia() != null ? empresa.getNomeFantasia() : empresa.getNome();
        String htmlEmpresa = Templates.resgateEmpresa(
                nomeEmpresa, aluno.getNome(), vantagem.getDescricao(),
                vantagem.getCustoMoedas(), codigo, validade, qrCodeBase64).render();
        mailer.send(Mail.withHtml(empresa.getEmail(),
                "StudentPay · Novo resgate para conferência: " + codigo, htmlEmpresa));
    }
}
