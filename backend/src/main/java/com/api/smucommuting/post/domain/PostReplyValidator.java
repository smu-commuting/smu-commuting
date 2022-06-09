package com.api.smucommuting.post.domain;

import com.api.smucommuting.common.exception.PermissionException;
import com.api.smucommuting.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class PostReplyValidator {
    public void deleteValidate(PostReply reply, User loginUser) {
        isMineValidate(reply, loginUser);
    }

    public void updateValidate(PostReply reply, User loginUser) {
        isMineValidate(reply, loginUser);
    }

    private void isMineValidate(PostReply reply, User loginUser) {
        if (!reply.getWriter().getId().equals(loginUser.getId())) {
            throw new PermissionException();
        }
    }
}
