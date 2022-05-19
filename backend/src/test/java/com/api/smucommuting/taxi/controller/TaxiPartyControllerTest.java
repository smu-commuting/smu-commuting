package com.api.smucommuting.taxi.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
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

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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
                .post("/api/taxi/party/{taxiPartyId}.", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_party_join",
                        pathParameters(
                                parameterWithName("taxiPartyId").description("참여할 택시파티 식별자")
                        )
                ));
    }
}