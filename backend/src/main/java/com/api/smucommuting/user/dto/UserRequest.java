package com.api.smucommuting.user.dto;

import lombok.Getter;

public class UserRequest {
    @Getter
    public static class Signup {
        private String email;
        private int studentId;
    }

    @Getter
    public static class EmailVerification{
        private String code;
    }
}
