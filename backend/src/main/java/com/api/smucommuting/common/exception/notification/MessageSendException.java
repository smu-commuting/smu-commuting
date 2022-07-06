package com.api.smucommuting.common.exception.notification;

public class MessageSendException extends RuntimeException {
    public MessageSendException() {
    }

    public MessageSendException(String message) {
        super(message);
    }

    public MessageSendException(String message, Throwable cause) {
        super(message, cause);
    }

    public MessageSendException(Throwable cause) {
        super(cause);
    }
}
