package com.api.smucommuting.taxi.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.service.TaxiPartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/taxi")
public class TaxiPartyController {
    private final TaxiPartyService taxiPartyService;

    @PostMapping("/party")
    public ResponseEntity<ApiResult<Void>> create(@RequestBody TaxiPartyRequest.Create request,
                                                  @CurrentUser CustomUserDetails customUserDetails) {
        taxiPartyService.create(request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
