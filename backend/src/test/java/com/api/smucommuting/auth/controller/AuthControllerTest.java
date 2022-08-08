package com.api.smucommuting.auth.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.auth.domain.token.Token;
import com.api.smucommuting.auth.domain.token.TokenProvider;
import com.api.smucommuting.auth.dto.AuthResponse;
import com.api.smucommuting.auth.service.RefreshTokenService;
import com.api.smucommuting.user.domain.SocialLoginProvider;
import com.api.smucommuting.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import javax.servlet.http.Cookie;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("인증 API 문서화")
@WebMvcTest(AuthController.class)
class AuthControllerTest extends MvcTest {
    @MockBean
    private RefreshTokenService refreshTokenService;
    @MockBean
    private TokenProvider tokenProvider;
    private User user;
    private static final String EMAIL = "test@test.com";
    private static final String STUDENT_ID = "123456";

    @BeforeEach
    public void setup() {
        user = User.builder()
                .id(1L)
                .email(EMAIL)
                .studentId(STUDENT_ID)
                .socialLoginProvider(SocialLoginProvider.GOOGLE)
                .build();
    }

    @Test
    @DisplayName("refresh token 문서화")
    public void refreshToken() throws Exception {
        AuthResponse response = AuthResponse.build(user,
                new Token("access_token",LocalDateTime.now()),
                new Token("refresh_token",LocalDateTime.now()));

        Cookie cookie = new Cookie("refresh_token", "refreshToken");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(14 * 24 * 60 * 60);

        given(refreshTokenService.createAccessTokenAndRefreshToken(any())).willReturn(response);
        given(tokenProvider.isValidToken(any())).willReturn(true);

        ResultActions results = mvc.perform(post("/api/auth/refresh").cookie(cookie));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("auth_refresh",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("로그인한 유저 식별자"),
                                fieldWithPath("data.email").type(JsonFieldType.STRING).description("로그인한 유저 이메일"),
                                fieldWithPath("data.accessToken").type(JsonFieldType.STRING).description("accessToken")
                        )
                ));
    }

    @Test
    @DisplayName("logout 문서화")
    public void logout() throws Exception {
        ResultActions results = mvc.perform(post("/api/auth/logout"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("auth_logout",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("data 없다면 null")
                        )
                ));
    }
}