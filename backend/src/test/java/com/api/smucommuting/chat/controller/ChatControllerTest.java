package com.api.smucommuting.chat.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.chat.dto.ChatRoomResponse;
import com.api.smucommuting.chat.service.ChatService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDateTime;
import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("채팅 API 문서화")
@WebMvcTest(ChatController.class)
class ChatControllerTest extends MvcTest {
    @MockBean
    private ChatService chatService;

    private static final int HEADCOUNT = 3;
    private static final int MAXIMUM = 5;
    private static final LocalDateTime DATE = LocalDateTime.of(2022, 5, 18, 15, 0);
    private static final String PLACE = "시청역";
    private static final String PLACE2 = "남영역";

    @Test
    @DisplayName("택시 합승방 목록 조회 문서화")
    public void getList() throws Exception {
        ChatRoomResponse.GetList response1 = ChatRoomResponse.GetList.builder().chatRoomId(1L).date(DATE).headcount(HEADCOUNT).maximum(MAXIMUM).place(PLACE).time(DATE).build();
        ChatRoomResponse.GetList response2 = ChatRoomResponse.GetList.builder().chatRoomId(2L).date(DATE).headcount(HEADCOUNT).maximum(MAXIMUM).place(PLACE2).time(DATE).build();

        given(chatService.getRoomList(any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/chat/rooms")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("chat_room_list",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].chatRoomId").type(JsonFieldType.NUMBER).description("채팅방 식별자"),
                                fieldWithPath("data.[].place").type(JsonFieldType.STRING).description("만나는 장소"),
                                fieldWithPath("data.[].date").type(JsonFieldType.STRING).description("만나는 날짜"),
                                fieldWithPath("data.[].time").type(JsonFieldType.STRING).description("만나는 시간"),
                                fieldWithPath("data.[].headcount").type(JsonFieldType.NUMBER).description("현재 인원 수"),
                                fieldWithPath("data.[].maximum").type(JsonFieldType.NUMBER).description("최대 인원 수")
                        )
                ));
    }

    @Test
    @DisplayName("채팅방 나가기 문서화")
    public void exitRoom() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/chat/room/{roomId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("chat_room_exit",
                        pathParameters(
                                parameterWithName("roomId").description("나갈 채팅방 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}