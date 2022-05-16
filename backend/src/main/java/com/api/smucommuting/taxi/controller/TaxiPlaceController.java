package com.api.smucommuting.taxi.controller;

import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.taxi.dto.TaxiPlaceResponse;
import com.api.smucommuting.taxi.service.TaxiPlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/taxi")
@RequiredArgsConstructor
public class TaxiPlaceController {
    private final TaxiPlaceService taxiPlaceService;

    @GetMapping("/places")
    public ResponseEntity<ApiResult<List<TaxiPlaceResponse>>> getPlaces() {
        List<TaxiPlaceResponse> response = taxiPlaceService.getList();
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
