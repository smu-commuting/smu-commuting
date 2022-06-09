package com.api.smucommuting.post.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.post.dto.PostReplyRequest;
import com.api.smucommuting.post.dto.PostReplyResponse;
import com.api.smucommuting.post.service.PostReplyService;
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
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 API 문서화")
@WebMvcTest(PostReplyController.class)
class PostReplyControllerTest extends MvcTest {
    @MockBean
    PostReplyService postReplyService;

    @Test
    @DisplayName("회원가입 문서화")
    public void signup() throws Exception {
        PostReplyRequest.Create request = PostReplyRequest.Create.builder()
                .content("감사합니다!")
                .build();

        PostReplyResponse.OnlyId response = PostReplyResponse.OnlyId.builder().replyId(1L).build();

        given(postReplyService.create(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/post/{postId}/reply", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post_reply_create",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.replyId").description("댓글 식별자")
                        )
                ));
    }
}