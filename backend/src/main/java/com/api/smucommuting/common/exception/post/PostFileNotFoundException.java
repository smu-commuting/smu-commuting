package com.api.smucommuting.common.exception.post;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class PostFileNotFoundException extends EntityNotFoundException {
    public PostFileNotFoundException() {
        super("해당 파일이 없습니다.");
    }
}
