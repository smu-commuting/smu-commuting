package com.api.smucommuting.user.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.user.dto.ProfileImageResponse;
import com.api.smucommuting.user.service.ProfileImageService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Collections;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("프로필 이미지 API 문서화")
@WebMvcTest(ProfileImageController.class)
class ProfileImageControllerTest extends MvcTest {
    @MockBean
    ProfileImageService profileImageService;

    @Test
    @DisplayName("프로필 이미지 목록 조회")
    public void getList() throws Exception {
        ProfileImageResponse.GetList response = ProfileImageResponse.GetList.builder().imageId(1L).url("img url").build();

        given(profileImageService.getList()).willReturn(Collections.singletonList(response));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/profiles"));

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("profile_getList",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].imageId").type(JsonFieldType.NUMBER).description("이미지 식별자"),
                                fieldWithPath("data.[].url").type(JsonFieldType.STRING).description("이미지 url")

                        )
                ));
    }
}