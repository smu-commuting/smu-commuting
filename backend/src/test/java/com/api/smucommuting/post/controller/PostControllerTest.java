package com.api.smucommuting.post.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.post.dto.PostRequest;
import com.api.smucommuting.post.dto.PostResponse;
import com.api.smucommuting.post.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.io.InputStream;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 API 문서화")
@WebMvcTest(PostController.class)
class PostControllerTest extends MvcTest {
    @MockBean
    PostService postService;

    @Test
    @DisplayName("게시물 생성 문서화")
    public void create() throws Exception {
        InputStream is1 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile img = new MockMultipartFile("image", "image.jpg", "image/jpg", is1.readAllBytes());

        PostRequest.CreateInfo request = PostRequest.CreateInfo.builder()
                .content("공학관 휴대폰 분실")
                .place("공학관")
                .item("휴대폰")
                .obtainDate(LocalDateTime.of(2022, 6, 6, 17, 30))
                .build();
        String content = objectMapper.writeValueAsString(request);
        MockMultipartFile infoRequest = new MockMultipartFile("info", "", "application/json", content.getBytes());

        PostResponse.OnlyId response = PostResponse.OnlyId.builder().postId(1L).build();

        given(postService.create(any(), any(), any())).willReturn(response);

        ResultActions results = mvc.perform(multipart("/api/post")
                .file(infoRequest)
                .file(img)
                .contentType(MediaType.MULTIPART_MIXED)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
        );

        results.andExpect(status().isCreated())
                .andDo(print())
                .andDo(document("post_create",
                        requestParts(
                                partWithName("info").description("게시물 정보 JSON"),
                                partWithName("image").description("게시물 이미지")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.postId").type(JsonFieldType.NUMBER).description("생성된 게시물 식별자")
                        )
                ));
    }

}