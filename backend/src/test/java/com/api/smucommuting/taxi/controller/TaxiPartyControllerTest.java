package com.api.smucommuting.taxi.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.api.smucommuting.taxi.service.TaxiPartyService;
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
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("택시 파티 API 문서화")
@WebMvcTest(TaxiPartyController.class)
class TaxiPartyControllerTest extends MvcTest {
    @MockBean
    private TaxiPartyService taxiPartyService;

    private static final Long PLACE_ID = 1L;
    private static final Integer HEADCOUNT = 3;
    private static final LocalDateTime MEETING_DATE = LocalDateTime.of(2022, 5, 18, 15, 0);
    private static final String PLACE_NAME = "경복궁역";

    @Test
    @DisplayName("택시 파티 생성 문서화")
    public void create() throws Exception {
        TaxiPartyRequest.Create request = TaxiPartyRequest.Create.builder()
                .placeId(PLACE_ID)
                .headcount(HEADCOUNT)
                .meetingDate(MEETING_DATE)
                .build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/taxi/party")
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_create",
                        requestFields(
                                fieldWithPath("placeId").type(JsonFieldType.NUMBER).description("택시합승장소 식별자"),
                                fieldWithPath("headcount").type(JsonFieldType.NUMBER).description("최대 인원"),
                                fieldWithPath("meetingDate").type(JsonFieldType.STRING).description("택시합승 시간")
                        )
                ));
    }

    @Test
    @DisplayName("택시 파티 참여 문서화")
    public void join() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .post("/api/taxi/party/{taxiPartyId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_join",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("참여할 택시파티 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("택시 합승방 단건 조회 문서화")
    public void getOne() throws Exception {
        TaxiPartyResponse.GetOne response = TaxiPartyResponse.GetOne.builder().taxiPartyId(1L)
                .date(MEETING_DATE)
                .maximum(HEADCOUNT)
                .headcount(HEADCOUNT)
                .place(PLACE_NAME)
                .time(MEETING_DATE)
                .build();

        given(taxiPartyService.getOne(any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/taxi/party/{taxiPartyId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_getOne",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("택시파티 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.taxiPartyId").type(JsonFieldType.NUMBER).description("택시파티 식별자"),
                                fieldWithPath("data.place").type(JsonFieldType.STRING).description("현재 인원"),
                                fieldWithPath("data.maximum").type(JsonFieldType.NUMBER).description("최대 인원"),
                                fieldWithPath("data.headcount").type(JsonFieldType.NUMBER).description("최대 인원"),
                                fieldWithPath("data.date").type(JsonFieldType.STRING).description("택시 타는 시간"),
                                fieldWithPath("data.time").type(JsonFieldType.STRING).description("택시 타는 시간")
                        )
                ));
    }

    @Test
    @DisplayName("택시 합승방 목록 조회 문서화")
    public void getList() throws Exception {
        TaxiPartyResponse.GetList response1 = TaxiPartyResponse.GetList.builder().taxiPartyId(1L).headcount(3).maximum(3).time(MEETING_DATE).build();
        TaxiPartyResponse.GetList response2 = TaxiPartyResponse.GetList.builder().taxiPartyId(2L).headcount(4).maximum(4).time(MEETING_DATE).build();

        given(taxiPartyService.getList(any(), any(), any(), any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/taxi/parties")
                .param("page", "1")
                .param("size", "10")
                .param("placeId", "1")
                .param("date", "2022-05-19")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_list",
                        requestParameters(
                                parameterWithName("page").description("조회할 페이지"),
                                parameterWithName("size").description("조회할 사이즈"),
                                parameterWithName("placeId").description("합승장소 식별자"),
                                parameterWithName("date").description("택시타는 날짜")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].taxiPartyId").type(JsonFieldType.NUMBER).description("택시파티 식별자"),
                                fieldWithPath("data.[].headcount").type(JsonFieldType.NUMBER).description("현재 인원"),
                                fieldWithPath("data.[].maximum").type(JsonFieldType.NUMBER).description("최대 인원"),
                                fieldWithPath("data.[].time").type(JsonFieldType.STRING).description("택시 타는 시간")
                        )
                ));
    }

    @Test
    @DisplayName("택시 합승 채팅방 목록 조회 문서화")
    public void getMyList() throws Exception {
        TaxiPartyResponse.GetMyList response1 = TaxiPartyResponse.GetMyList.builder().chatRoomId(1L).date(MEETING_DATE).headcount(HEADCOUNT).maximum(HEADCOUNT).place(PLACE_NAME).time(MEETING_DATE).build();
        TaxiPartyResponse.GetMyList response2 = TaxiPartyResponse.GetMyList.builder().chatRoomId(2L).date(MEETING_DATE).headcount(HEADCOUNT).maximum(HEADCOUNT).place(PLACE_NAME).time(MEETING_DATE).build();

        given(taxiPartyService.getMyList(any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/taxi/my-parties")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_my_parties",
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
    @DisplayName("택시채팅방 유저 목록 조회 문서화")
    public void getTaxiPartyUsers() throws Exception {
        TaxiPartyResponse.TaxiPartyUsers response1 = TaxiPartyResponse.TaxiPartyUsers.builder().userId(1L).studentId(1234).build();
        TaxiPartyResponse.TaxiPartyUsers response2 = TaxiPartyResponse.TaxiPartyUsers.builder().userId(2L).studentId(1111).build();

        given(taxiPartyService.getTaxiPartyUsers(any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/taxi/party/{taxiPartyId}/users", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_user_list",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("택시파티 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("data.[].studentId").type(JsonFieldType.NUMBER).description("유저 학번")
                        )
                ));
    }

    @Test
    @DisplayName("택시채팅방 나간 유저 목록 조회 문서화")
    public void getTaxiPartyExitUsers() throws Exception {
        TaxiPartyResponse.TaxiPartyUsers response1 = TaxiPartyResponse.TaxiPartyUsers.builder().userId(1L).studentId(1234).build();
        TaxiPartyResponse.TaxiPartyUsers response2 = TaxiPartyResponse.TaxiPartyUsers.builder().userId(2L).studentId(1111).build();

        given(taxiPartyService.getTaxiPartyExitUsers(any())).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/taxi/party/{taxiPartyId}/exit/users", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_exit_user_list",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("택시파티 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].userId").type(JsonFieldType.NUMBER).description("유저 식별자"),
                                fieldWithPath("data.[].studentId").type(JsonFieldType.NUMBER).description("유저 학번")
                        )
                ));
    }

    @Test
    @DisplayName("택시 최대 인원수 수정 문서화")
    public void update() throws Exception {
        TaxiPartyRequest.Update request = TaxiPartyRequest.Update.builder()
                .maximum(HEADCOUNT)
                .build();

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .put("/api/taxi/party/{taxiPartyId}", 1)
                .contentType(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(objectMapper.writeValueAsString(request))
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_update",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("택시파티 식별자")
                        ),
                        requestFields(
                                fieldWithPath("maximum").type(JsonFieldType.NUMBER).description("최대 인원")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }

    @Test
    @DisplayName("채팅방 나가기 문서화")
    public void exitTaxiParty() throws Exception {
        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .delete("/api/taxi/party/{taxiPartyId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_exit",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("택시파티 식별자")
                        ),
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data").description("응답 데이터가 없다면 null")
                        )
                ));
    }
}