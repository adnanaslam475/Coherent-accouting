package com.example.display.util;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring4.SpringTemplateEngine;

import com.example.display.model.User;


@Service
public class EmailService {
	
	@Autowired
    private JavaMailSender emailSender;
	
	@Autowired
    private SpringTemplateEngine templateEngine;
	
	@Autowired
    private MessageSource messages;

	public MimeMessage prepareMailMessage(User user, String subject, String confirmationUrl, String textMessage) {
		
//      String message = messages.getMessage("message.regSucc", null, event.getLocale());
		MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = null;
		try {
			helper = new MimeMessageHelper(message,
			        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
			        StandardCharsets.UTF_8.name());
//			helper.addAttachment("logo.png", new ClassPathResource("memorynotfound-logo.png"));
			Context context = new Context();
			Map<String, Object> model = new HashMap<>();
			model.put("resetUrl", confirmationUrl);
			model.put("reason", textMessage);
			model.put("user", user);
			model.put("signature", "https://shipperbay.com");
//        String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
//        model.put("resetUrl", url + "/reset-password?token=" + token.getToken());
			context.setVariables(model);
			String html = templateEngine.process("email-template", context);
			helper.setTo(user.getEmail());
			helper.setText(html, true);
			helper.setSubject(subject);
			helper.setFrom("no-reply@memorynotfound.com");
		} catch (MessagingException e1) {
			e1.printStackTrace();
		}
		return message;
	}
	
	@Retryable(value = {MailSendException.class, Exception.class}, maxAttempts = 4)
	public void sendMailMessage(MimeMessage message) {
//		throw new MailSendException("Error");
		emailSender.send(message);
	}
	
	@Recover
	public void recover(MailSendException mailSendException) {
		System.out.println("Recover");
	}
	
}
