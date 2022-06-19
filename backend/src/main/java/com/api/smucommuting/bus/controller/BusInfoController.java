package com.api.smucommuting.bus.controller;

import com.api.smucommuting.bus.dto.BusInfoResponse;
import com.api.smucommuting.bus.infra.BusInfoManager;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BusInfoController {
    private final BusInfoManager busInfoManager;

    @GetMapping("/bus/{busRouteId}")
    public BusInfoResponse getBusInfo(@PathVariable Long busRouteId) {
        return busInfoManager.requestBusInfo(busRouteId);
    }
}
