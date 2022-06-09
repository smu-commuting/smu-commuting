package com.api.smucommuting.common.exception.file;

import com.api.smucommuting.common.exception.BusinessException;

public class FileConvertException extends RuntimeException {
    public FileConvertException() {
        super();
    }

    public FileConvertException(String message) {
        super(message);
    }

    public FileConvertException(String message, Throwable cause) {
        super(message, cause);
    }

    public FileConvertException(Throwable cause) {
        super(cause);
    }
}
