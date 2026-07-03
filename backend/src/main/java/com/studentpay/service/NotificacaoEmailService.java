package com.studentpay.service;

import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Serviço de notificação por e-mail via API HTTP do Resend.
 *
 * Usa HTTP puro (java.net.http) para evitar bloqueio de SMTP em ambientes cloud.
 * Se RESEND_API_KEY não estiver configurada, os e-mails são logados e descartados.
 */
@ApplicationScoped
public class NotificacaoEmailService {

    private static final Logger LOG = Logger.getLogger(NotificacaoEmailService.class.getName());
    private static final DateTimeFormatter VALIDADE_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final String RESEND_URL = "https://api.resend.com/emails";

    @Inject
    QrCodeService qrCodeService;

    @ConfigProperty(name = "resend.api.key", defaultValue = "")
    String resendApiKey;

    @ConfigProperty(name = "quarkus.mailer.from", defaultValue = "StudentPay <no-reply@studentpay.dev>")
    String fromAddress;

    @CheckedTemplate(basePath = "emails")
    static class Templates {
        static native TemplateInstance envioMoedasAluno(
                String alunoNome, String professorNome, int quantidade, String motivo, int saldoAtual);

        static native TemplateInstance envioMoedasProfessor(
                String professorNome, String alunoNome, int quantidade, String motivo, int saldoRestante);

        static native TemplateInstance resgateAluno(
                String alunoNome, String vantagemDescricao, int custoMoedas,
                String codigo, String validade, int saldoRestante, String qrCodeBase64);

        static native TemplateInstance resgateEmpresa(
                String empresaNome, String alunoNome, String vantagemDescricao,
                int custoMoedas, String codigo, String validade, String qrCodeBase64);
    }

    // ── Métodos públicos (recebem strings — sem dependência de entidades JPA) ──

    public void notificarRecebimentoAluno(String emailAluno, String nomeAluno,
                                          String nomeProfessor, int quantidade, String motivo, int saldoAtual) {
        String html = Templates.envioMoedasAluno(nomeAluno, nomeProfessor, quantidade, motivo, saldoAtual).render();
        enviar(emailAluno, "StudentPay · Você recebeu " + quantidade + " moedas 🪙", html);
    }

    public void notificarEnvioProfessor(String emailProfessor, String nomeProfessor,
                                        String nomeAluno, int quantidade, String motivo, int saldoRestante) {
        String html = Templates.envioMoedasProfessor(nomeProfessor, nomeAluno, quantidade, motivo, saldoRestante).render();
        enviar(emailProfessor, "StudentPay · Comprovante de envio de " + quantidade + " moedas", html);
    }

    public void notificarResgate(String emailAluno, String nomeAluno,
                                 String emailEmpresa, String nomeEmpresa,
                                 String vantagemDescricao, int custoMoedas,
                                 String codigo, LocalDateTime expiraEm, int saldoRestante) {
        String validade = expiraEm != null ? VALIDADE_FMT.format(expiraEm) : "—";
        String qrCodeBase64 = qrCodeService.gerarBase64(codigo);

        String htmlAluno = Templates.resgateAluno(
                nomeAluno, vantagemDescricao, custoMoedas,
                codigo, validade, saldoRestante, qrCodeBase64).render();
        enviar(emailAluno, "StudentPay · Seu cupom de resgate: " + codigo, htmlAluno);

        String htmlEmpresa = Templates.resgateEmpresa(
                nomeEmpresa, nomeAluno, vantagemDescricao,
                custoMoedas, codigo, validade, qrCodeBase64).render();
        enviar(emailEmpresa, "StudentPay · Novo resgate para conferência: " + codigo, htmlEmpresa);
    }

    // ── Envio HTTP via Resend API ────────────────────────────────────────────

    private void enviar(String destinatario, String assunto, String htmlBody) {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            LOG.info("[E-mail MOCK] Para: " + destinatario + " | Assunto: " + assunto);
            return;
        }

        String json = "{"
                + "\"from\":\"" + escapar(fromAddress) + "\","
                + "\"to\":[\"" + escapar(destinatario) + "\"],"
                + "\"subject\":\"" + escapar(assunto) + "\","
                + "\"html\":\"" + escapar(htmlBody) + "\""
                + "}";

        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(RESEND_URL))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                LOG.info("E-mail enviado para " + destinatario + " via Resend. Status: " + response.statusCode());
            } else {
                LOG.warning("Falha ao enviar e-mail via Resend. Status: "
                        + response.statusCode() + " Body: " + response.body());
            }
        } catch (Exception e) {
            LOG.log(Level.WARNING, "Erro ao enviar e-mail para " + destinatario + ": " + e.getMessage(), e);
        }
    }

    private static String escapar(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}