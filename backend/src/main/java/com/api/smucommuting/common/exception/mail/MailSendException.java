package com.api.smucommuting.common.exception.mail;

public class MailSendException extends RuntimeException {
    public MailSendException() {
        super();
    }

    public MailSendException(Throwable cause) {
        super(cause);
    }
}
