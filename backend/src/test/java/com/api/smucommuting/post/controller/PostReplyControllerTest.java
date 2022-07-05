package com.api.smucommuting.post.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.post.dto.PostDto;
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

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 댓글 API 문서화")
@WebMvcTest(PostReplyController.class)
class PostReplyControllerTest extends MvcTest {
    @MockBean
    PostReplyService postReplyService;

    @Test
    @DisplayName("댓글 생성 문서화")
    public void create() throws Exception {
        PostReplyRequest.CreateOrUpdate request = PostReplyRequest.CreateOrUpdate.builder()
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

    @Test
    @DisplayName("댓글 목록 조회")
    public void getList() throws Exception {
        PostReplyResponse.GetList response1 = PostReplyResponse.GetList.builder()
                .replyId(1L)
                .content("감사합니다!")
                .isMine(false)
                .writer(PostDto.Writer.builder().studentId(123).profileImageUrl("image").build())
                .createdDate(LocalDateTime.of(2022, 6, 8, 9, 30))
                .build();

        PostReplyResponse.GetList response2 = PostReplyResponse.GetList.builder()
                .replyId(2L)
                .content("네!")
                .isMine(true)
                .writer(PostDto.Writer.builder().studentId(12345).profileImageUrl("image").build())
                .createdDate(LocalDateTime.of(2022, 6, 8, 9, 40))
                .build();

        given(postReplyService.getList(any(), any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/{postId}/replies", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post_reply_getList",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].replyId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                                fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("내용"),
                                fieldWithPath("data.[].writer.studentId").type(JsonFieldType.NUMBER).description("댓쓴이 학번"),
                                fieldWithPath("data.[].writer.profileImageUrl").type(JsonFieldType.STRING).description("댓쓴이 프로필 이미지"),
                                fieldWithPath("data.[].isMine").type(JsonFieldType.BOOLEAN).description("자신의 댓글이라면 true"),
                                fieldWithPath("data.[].createdDate").type(JsonFieldType.STRING).description("댓글 생성 날짜")
                        )
                ));
    }

    @Test
    @DisplayName("댓글 수정 문서화")
    public void update() throws Exception {
        PostReplyRequest.CreateOrUpdate request = PostReplyRequest.CreateOrUpdate.builder()
                .content("수정!")
                .build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .put("/api/post/reply/{replyId}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post_reply_update",
                        pathParameters(
                                parameterWithName("replyId").description("댓글 식별자")
                        ),
                        requestFields(
                                fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("댓글 삭제")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/post/reply/{replyId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post_reply_deleteOne",
                        pathParameters(
                                parameterWithName("replyId").description("댓글 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}
