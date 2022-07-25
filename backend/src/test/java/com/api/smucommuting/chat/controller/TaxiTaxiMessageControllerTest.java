package com.api.smucommuting.chat.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.chat.dto.TaxiMessageResponse;
import com.api.smucommuting.chat.service.TaxiMessageService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("채팅 메시지 API 문서화")
@WebMvcTest(TaxiMessageController.class)
class TaxiTaxiMessageControllerTest extends MvcTest {
    @MockBean
    private TaxiMessageService taxiMessageService;
    @MockBean
    private SimpMessageSendingOperations messageTemplate;

    @Test
    @DisplayName("채팅 메시지 목록 조회 문서화")
    public void getMessages() throws Exception {
        TaxiMessageResponse response1 = TaxiMessageResponse.builder().messageId(1L).roomId(1L).content("안녕하세요").createdTime(LocalDateTime.of(2022, 5, 24, 10, 0, 1, 11)).senderId(1L).senderStudentId(123456).build();
        TaxiMessageResponse response2 = TaxiMessageResponse.builder().messageId(2L).roomId(1L).content("네 안녕하세요").createdTime(LocalDateTime.of(2022, 5, 24, 10, 0, 2, 22)).senderId(2L).senderStudentId(111111).build();

        given(taxiMessageService.getMessages(any(), eq(10), any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/chat/room/{roomId}/messages",1)
                .param("size", "10")
                .param("lastMessageDate", "2022-05-24T11:01:42.520972400")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("chat_room_message_list",
                        pathParameters(
                                parameterWithName("roomId").description("채팅방 식별자")
                        ),
                        requestParameters(
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("lastMessageDate").description("조회해올 메시지 마지막 시간( ex)2022-05-24T10:00:01.000000011)")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].messageId").type(JsonFieldType.NUMBER).description("메시지 식별자"),
                                fieldWithPath("data.[].senderId").type(JsonFieldType.NUMBER).description("메시지를 보낸 유저 식별자"),
                                fieldWithPath("data.[].senderStudentId").type(JsonFieldType.NUMBER).description("메시지를 보낸 유저 학번"),
                                fieldWithPath("data.[].content").type(JsonFieldType.STRING).description("메시지 내용"),
                                fieldWithPath("data.[].createdTime").type(JsonFieldType.STRING).description("메시지 생성 시간"),
                                fieldWithPath("data.[].roomId").type(JsonFieldType.NUMBER).description("채팅방 식별자")
                        )
                ));
    }
}