package com.api.smucommuting.user.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.user.dto.UserRequest;
import com.api.smucommuting.user.dto.UserResponse;
import com.api.smucommuting.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("유저 API 문서화")
@WebMvcTest(UserController.class)
class UserControllerTest extends MvcTest {
    @MockBean
    private UserService userService;

    private static final Long USER_ID = 1L;
    private static final String EMAIL = "test@test.com";
    private static final Integer STUDENT_ID = 123456;
    private static final String EMAIL_VERIFICATION_CDE = "CODE";
    private static final Long PROFILE_IMAGE_ID = 1L;
    private static final String PROFILE_IMAGE_URL = "image url";
    private static final String FCM_TOKEN = "fcmToken";


    @Test
    @DisplayName("회원가입 문서화")
    public void signup() throws Exception {
        UserRequest.Signup request = UserRequest.Signup.builder().email(EMAIL).studentId(STUDENT_ID).imageId(PROFILE_IMAGE_ID).build();
        UserResponse.Signup response = UserResponse.Signup.builder().userId(USER_ID).studentId(STUDENT_ID).email(EMAIL).build();

        given(userService.signup(any(), any())).willReturn(response);

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
                                fieldWithPath("studentId").type(JsonFieldType.NUMBER).description("학번"),
                                fieldWithPath("imageId").type(JsonFieldType.NUMBER).description("프로필 이미지 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("data.studentId").type(JsonFieldType.NUMBER).description("학번"),
                                fieldWithPath("data.email").type(JsonFieldType.STRING).description("이메일")
                        )
                ));
    }

    @Test
    @DisplayName("FCM 토큰 저장 문서화")
    public void fcmTokenCreate() throws Exception {
        UserRequest.FcmToken request = UserRequest.FcmToken.builder().fcmToken(FCM_TOKEN).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/user/fcm/token")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_fcmToken_create",
                        requestFields(
                                fieldWithPath("fcmToken").type(JsonFieldType.STRING).description("이메일")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("인증코드 이메일 전송 문서화")
    public void sendEmailCode() throws Exception {
        UserRequest.Email request = UserRequest.Email.builder().email(EMAIL).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/user/email")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_email_code_send",
                        requestFields(
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("인증코드 검사")
    public void codeVerification() throws Exception {
        UserRequest.EmailVerification request = UserRequest.EmailVerification.builder().code(EMAIL_VERIFICATION_CDE).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/user/email/verification")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_email_code_verification",
                        requestFields(
                                fieldWithPath("code").type(JsonFieldType.STRING).description("인증 코드")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("내 정보 조회")
    public void getMe() throws Exception {
        UserResponse.GetOne response = UserResponse.GetOne.builder().userId(USER_ID).studentId(STUDENT_ID).imageUrl(PROFILE_IMAGE_URL).build();

        given(userService.getOne(any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/user"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_getOne",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.userId").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("data.studentId").type(JsonFieldType.NUMBER).description("학번"),
                                fieldWithPath("data.imageUrl").type(JsonFieldType.STRING).description("이미지 url")

                        )
                ));
    }

    @Test
    @DisplayName("내정보 수정 문서화")
    public void update() throws Exception {
        UserRequest.Update request = UserRequest.Update.builder().imageId(PROFILE_IMAGE_ID).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .put("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_update",
                        requestFields(
                                fieldWithPath("imageId").type(JsonFieldType.NUMBER).description("프로필 이미지 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("회원탈퇴 문서화")
    public void quit() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/user")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("user_quit",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}