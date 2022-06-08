package com.api.smucommuting.common.mail.infra;

import com.api.smucommuting.common.exception.mail.MailSendException;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class CustomMailSender {
    private final SpringTemplateEngine templateEngine;
    private final JavaMailSender mailSender;

    @Async
    public <T> void mailSend(String toEmail, T data) {
        try {
            MimeMessage message = makeMessage(toEmail, data);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new MailSendException(e);
        }
    }

    private <T> MimeMessage makeMessage(String toEmail, T data) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        Context context = new Context();
        context.setVariable("result", data);

        mimeMessage.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        mimeMessage.setSubject("[샘물로] 인증번호를 안내해드립니다.");
        String process = templateEngine.process("emailVerification", context);
        mimeMessage.setText(process, "utf-8", "html");
        return mimeMessage;
    }
}
