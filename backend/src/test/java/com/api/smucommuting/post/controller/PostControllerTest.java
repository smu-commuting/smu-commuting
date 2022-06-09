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
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("게시물 API 문서화")
@WebMvcTest(PostController.class)
class PostControllerTest extends MvcTest {
    @MockBean
    PostService postService;

    private static final String ITEM = "휴대폰";
    private static final String ITEM2 = "노트북";
    private static final String PLACE = "공학관";
    private static final String PLACE2 = "미백관";
    private static final String CONTENT = "공학관 휴대폰 분실";
    private static final String IMAGE_URL = "image url";
    private static final LocalDateTime DATE = LocalDateTime.of(2022, 6, 6, 15, 30);

    @Test
    @DisplayName("게시물 생성 문서화")
    public void create() throws Exception {
        InputStream is1 = new ClassPathResource("mock/images/enjoy.png").getInputStream();
        MockMultipartFile img = new MockMultipartFile("image", "image.jpg", "image/jpg", is1.readAllBytes());

        PostRequest.CreateInfo request = PostRequest.CreateInfo.builder()
                .content(CONTENT)
                .place(PLACE)
                .item(ITEM)
                .obtainDate(DATE)
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

    @Test
    @DisplayName("게시물 단건 조회")
    public void getOne() throws Exception {
        PostResponse.GetOne response = PostResponse.GetOne.builder()
                .content(CONTENT)
                .place(PLACE)
                .createdDate(DATE)
                .item(ITEM)
                .image(IMAGE_URL)
                .isMine(Boolean.TRUE)
                .build();

        given(postService.getOne(any(), any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/post/{postId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post_getOne",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.item").type(JsonFieldType.STRING).description("물건"),
                                fieldWithPath("data.place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("data.content").type(JsonFieldType.STRING).description("게시물 내용"),
                                fieldWithPath("data.image").type(JsonFieldType.STRING).description("게시물 이미지 url"),
                                fieldWithPath("data.isMine").type(JsonFieldType.BOOLEAN).description("자신의 게시물이라면 true"),
                                fieldWithPath("data.createdDate").type(JsonFieldType.STRING).description("게시물 생성 날짜")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 목록 조회")
    public void getList() throws Exception {
        PostResponse.GetList response1 = PostResponse.GetList.builder()
                .place(PLACE)
                .createdDate(DATE)
                .item(ITEM)
                .image(IMAGE_URL)
                .build();

        PostResponse.GetList response2 = PostResponse.GetList.builder()
                .place(PLACE2)
                .createdDate(DATE)
                .item(ITEM2)
                .image(IMAGE_URL)
                .build();

        given(postService.getList(any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/posts")
                .param("page", "1")
                .param("size", "20")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post_getList",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].item").type(JsonFieldType.STRING).description("물건"),
                                fieldWithPath("data.[].place").type(JsonFieldType.STRING).description("장소"),
                                fieldWithPath("data.[].image").type(JsonFieldType.STRING).description("게시물 이미지 url"),
                                fieldWithPath("data.[].createdDate").type(JsonFieldType.STRING).description("게시물 생성 날짜")
                        )
                ));
    }

    @Test
    @DisplayName("게시물 삭제")
    public void deleteOne() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/post/{postId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("post_deleteOne",
                        pathParameters(
                                parameterWithName("postId").description("게시물 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}