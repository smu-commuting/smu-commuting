package com.api.smucommuting.common.dto;

import lombok.*;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorResponse {
    private int status;
    private Boolean success;
    private CustomError error;

    public static ErrorResponse build(int status, Exception ex) {
        return ErrorResponse.builder()
                .status(status)
                .success(false)
                .error(CustomError.builder()
                        .type(ex.getClass().getSimpleName())
                        .info(ex.getMessage())
                        .build())
                .build();
    }

    @Getter
    @Builder(access = AccessLevel.PROTECTED)
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class CustomError {
        private String type;
        private String info;
    }
}
