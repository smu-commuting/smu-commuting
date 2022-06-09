package com.api.smucommuting.post.domain;

import com.api.smucommuting.common.exception.PermissionException;
import com.api.smucommuting.user.domain.User;
import org.springframework.stereotype.Component;

@Component
public class PostValidator {
    public void deleteValidate(Post post, User loginUser) {
        isMineValidate(post, loginUser);
    }

    public void updateValidate(Post post, User loginUser) {
        isMineValidate(post, loginUser);
    }

    private void isMineValidate(Post post, User loginUser) {
        if (!post.getWriter().equals(loginUser)) {
            throw new PermissionException();
        }
    }
}
