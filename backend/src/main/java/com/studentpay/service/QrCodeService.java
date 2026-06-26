package com.studentpay.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import jakarta.enterprise.context.ApplicationScoped;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.EnumMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Serviço de geração de QR Code — Lab05S01.
 *
 * <p>Gera um QR Code PNG a partir do código do cupom e retorna como
 * string Base64 (data URI {@code image/png}) pronta para ser embutida
 * diretamente no corpo HTML do e-mail, sem dependência de URL externa.
 */
@ApplicationScoped
public class QrCodeService {

    private static final Logger LOG = Logger.getLogger(QrCodeService.class.getName());

    /** Tamanho padrão do QR Code em pixels (quadrado). */
    private static final int SIZE = 200;

    /**
     * Gera um QR Code para o código de cupom informado e retorna como
     * {@code data:image/png;base64,...} pronto para {@code <img src="...">}.
     *
     * @param conteudo texto a codificar (ex.: código do cupom)
     * @return data URI Base64 do PNG, ou string vazia em caso de erro
     */
    public String gerarBase64(String conteudo) {
        try {
            Map<EncodeHintType, Object> hints = new EnumMap<>(EncodeHintType.class);
            hints.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.M);
            hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
            hints.put(EncodeHintType.MARGIN, 2);

            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(conteudo, BarcodeFormat.QR_CODE, SIZE, SIZE, hints);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(matrix, "PNG", out);

            String base64 = Base64.getEncoder().encodeToString(out.toByteArray());
            return "data:image/png;base64," + base64;
        } catch (WriterException | IOException e) {
            LOG.log(Level.WARNING, "Falha ao gerar QR Code para: " + conteudo, e);
            return "";
        }
    }
}
