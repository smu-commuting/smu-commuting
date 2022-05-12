package com.api.smucommuting.user.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.user.domain.SocialLoginProvider;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.dto.UserRequest;
import com.api.smucommuting.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("유저 API 문서화")
@WebMvcTest(UserController.class)
class UserControllerTest extends MvcTest {
    @MockBean
    private UserService userService;

    private User user1;

    private static final String EMAIL = "test@test.com";
    private static final Integer STUDENT_ID = 123456;

    @BeforeEach
    public void setup() {
        user1 = User.builder()
                .id(1L)
                .email(EMAIL)
                .studentId(STUDENT_ID)
                .socialLoginProvider(SocialLoginProvider.GOOGLE)
                .build();
    }

    @Test
    @DisplayName("회원가입 문서화")
    public void signup() throws Exception {
        UserRequest.Signup request = UserRequest.Signup.builder().email(EMAIL).studentId(STUDENT_ID).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_signup",
                        requestFields(
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학번")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}