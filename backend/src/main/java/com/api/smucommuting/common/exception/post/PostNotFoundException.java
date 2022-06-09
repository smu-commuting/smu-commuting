package com.api.smucommuting.common.exception.post;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class PostNotFoundException extends EntityNotFoundException {
    public PostNotFoundException() {
        super("해당 게시물이 없습니다.");
    }
}
