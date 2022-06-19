package com.api.smucommuting.bus.infra;

import com.api.smucommuting.bus.dto.BusInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Service
@RequiredArgsConstructor
public class BusInfoManager {
    private final RestTemplate restTemplate;
    @Value("${bus.serviceKey}")
    private String serviceKey;

    private static final String BUS_URL = "http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll";

    public BusInfoResponse requestBusInfo(Long busRouteId) {
        String createdUri = BUS_URL + "?serviceKey=" + serviceKey + "&busRouteId=" + busRouteId.toString() + "&resultType=json";

        return restTemplate.getForObject(URI.create(createdUri), BusInfoResponse.class);
    }
}
