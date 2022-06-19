package com.api.smucommuting.bus.controller;

import com.api.smucommuting.MvcTest;
import com.api.smucommuting.bus.dto.BusInfoResponse;
import com.api.smucommuting.bus.infra.BusInfoManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

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

@DisplayName("버스 API 문서화")
@WebMvcTest(BusInfoController.class)
class BusInfoControllerTest extends MvcTest {
    @MockBean
    BusInfoManager busInfoManager;

    @Test
    @DisplayName("버스 정보 조회 ")
    public void getBusInfo() throws Exception {
        BusInfoResponse.MessageBody.Item item1 = BusInfoResponse.MessageBody.Item.builder()
                .arrmsg1("8분11초후[5번째 전]")
                .plainNo1("서울70사7781")
                .reride_Num1("3")
                .stNm("덕은교.은평차고지앞")
                .build();

        BusInfoResponse.MessageBody.Item item2 = BusInfoResponse.MessageBody.Item.builder()
                .arrmsg1("5분51초후[4번째 전]")
                .plainNo1("서울70사7781")
                .reride_Num1("3")
                .stNm("DMC첨단산업센터")
                .build();

        BusInfoResponse response = BusInfoResponse.builder()
                .msgBody(BusInfoResponse.MessageBody.builder()
                        .itemList(Arrays.asList(item1, item2))
                        .build())
                .build();

        given(busInfoManager.requestBusInfo(any())).willReturn(response);

        ResultActions results = mvc.perform(RestDocumentationRequestBuilders
                .get("/api/bus/{busRouteId}", 1)
        );

        results.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("bus_getInfo",
                        pathParameters(
                                parameterWithName("busRouteId").description("노선 ID")
                        ),
                        responseFields(
                                fieldWithPath("msgBody.itemList[].reride_Num1").type(JsonFieldType.STRING).description("(0: 데이터없음, 3: 여유, 4: 보통, 5: 혼잡)"),
                                fieldWithPath("msgBody.itemList[].plainNo1").type(JsonFieldType.STRING).description("도착예정차량번호"),
                                fieldWithPath("msgBody.itemList[].stNm").type(JsonFieldType.STRING).description("정류소명"),
                                fieldWithPath("msgBody.itemList[].arrmsg1").type(JsonFieldType.STRING).description("첫번째 도착예정 버스의 도착정보메시지")
                        )
                ));
    }
}