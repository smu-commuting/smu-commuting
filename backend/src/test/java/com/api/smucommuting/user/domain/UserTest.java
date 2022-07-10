package com.api.smucommuting.user.domain;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserTest {
    @Mock
    UserValidator userValidator;

    @Test
    void 회원가입() {
        ProfileImage profileImage = ProfileImage.builder()
                .id(1L)
                .url("image")
                .build();
        User user = User.builder()
                .id(1L)
                .profileImage(profileImage)
                .build();

        user.signup("email", 123, profileImage, userValidator);
        assertEquals(user.getEmail(), "email");
        assertEquals(user.getStudentId(), 123);
        verify(userValidator).emailValidate(any());
    }
}