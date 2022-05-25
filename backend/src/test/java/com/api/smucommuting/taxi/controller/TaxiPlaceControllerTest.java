package com.api.smucommuting.taxi.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.dto.TaxiPlaceResponse;
import com.api.smucommuting.taxi.service.TaxiPlaceService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("택시 합승 장소 API 문서화")
@WebMvcTest(TaxiPlaceController.class)
class TaxiPlaceControllerTest extends MvcTest {
    @MockBean
    private TaxiPlaceService taxiPlaceService;

    private final TaxiPlace place1 = TaxiPlace.builder().id(1L).name("서울역").build();
    private final TaxiPlace place2 = TaxiPlace.builder().id(2L).name("남영역").build();

    @Test
    @DisplayName("택시합승 장소 목록 조회")
    public void getPlaces() throws Exception {
        TaxiPlaceResponse response1 = TaxiPlaceResponse.build(place1);
        TaxiPlaceResponse response2 = TaxiPlaceResponse.build(place2);

        given(taxiPlaceService.getList()).willReturn(Arrays.asList(response1, response2));

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/taxi/places")
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("taxi_place_list",
                        responseFields(
                                fieldWithPath("status").type(JsonFieldType.NUMBER).description("상태 코드"),
                                fieldWithPath("success").type(JsonFieldType.BOOLEAN).description("api 응답이 성공했다면 true"),
                                fieldWithPath("data.[].taxiPlaceId").description("택시합승장소 식별자"),
                                fieldWithPath("data.[].name").description("택시합승장소 이름")
                        )
                ));
    }
}