package com.api.smucommuting.common.exception.post;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class PostReplyNotFoundException extends EntityNotFoundException {
    public PostReplyNotFoundException() {
        super("해당 댓글이 없습니다.");
    }
}
