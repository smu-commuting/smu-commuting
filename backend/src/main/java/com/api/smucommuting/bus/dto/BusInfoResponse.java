package com.api.smucommuting.bus.dto;


import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BusInfoResponse {
    private MessageBody msgBody;

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class MessageBody {
        private List<Item> itemList;

        @Getter
        @Builder
        @NoArgsConstructor(access = AccessLevel.PRIVATE)
        @AllArgsConstructor(access = AccessLevel.PRIVATE)
        public static class Item {
            private String reride_Num1;
            private String reride_Num2;
            private String plainNo1;
            private String plainNo2;
            private String stNm;
            private String arrmsg1;
            private String arrmsg2;
        }
    }
}
