package com.api.smucommuting.blockeduser.controlelr;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.blockeduser.dto.BlockedUserRequest;
import com.api.smucommuting.blockeduser.dto.BlockedUserResponse;
import com.api.smucommuting.blockeduser.service.BlockedUserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("합승거부 API 문서화")
@WebMvcTest(BlockedUserController.class)
class BlockedUserControllerTest extends MvcTest {
    @MockBean
    private BlockedUserService blockedUserService;

    @Test
    @DisplayName("합승거부 문서화")
    public void block() throws Exception {
        BlockedUserRequest.Block request = BlockedUserRequest.Block.builder().blockUserId(1L).build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/block/user")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("block_user_create",
                        requestFields(
                                fieldWithPath("blockUserId").type(JsonFieldType.NUMBER).description("합승거부할 유저 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("합승 거부 목록 조회 문서화")
    public void getList() throws Exception {
        BlockedUserResponse response1 = BlockedUserResponse.builder().userId(1L).studentId("1234").build();
        BlockedUserResponse response2 = BlockedUserResponse.builder().userId(2L).studentId("1111").build();

        given(blockedUserService.getList(any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/block/users")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("block_user_list",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("차단당한 유저 식별자"),
                                fieldWithPath("data.[].studentId").type(JsonFieldType.STRING).description("차단 당한 유저 학번")
                        )
                ));
    }

    @Test
    @DisplayName("합승거부 취소 문서화")
    public void blockCancel() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/block/user/{userId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("block_user_cancel",
                        pathParameters(
                                parameterWithName("userId").description("합승거부 취소할 유저 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}