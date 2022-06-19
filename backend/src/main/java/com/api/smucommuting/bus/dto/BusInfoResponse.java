package com.api.smucommuting.bus.dto;


import lombok.Getter;

@Getter
public class BusInfoResponse {
    private MessageBody msgBody;

    @Getter
    static class MessageBody {
        private Item[] itemList;

        @Getter
        static class Item {
            private String reride_Num1;
            private String plainNo1;
            private String stNm;
            private String arrmsg1;
        }
    }
}
