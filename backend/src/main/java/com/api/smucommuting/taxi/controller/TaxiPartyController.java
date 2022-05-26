package com.api.smucommuting.taxi.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.api.smucommuting.taxi.service.TaxiPartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    @PostMapping("/party/{taxiPartyId}")
    public ResponseEntity<ApiResult<Void>> join(@PathVariable Long taxiPartyId,
                                                @CurrentUser CustomUserDetails customUserDetails) {
        taxiPartyService.join(taxiPartyId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/parties")
    public ResponseEntity<ApiResult<List<TaxiPartyResponse.GetList>>> getList(@RequestParam(name = "placeId") Long placeId,
                                                                              @RequestParam(name = "date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate meetingDate,
                                                                              PageDto pageDto) {
        List<TaxiPartyResponse.GetList> response = taxiPartyService.getList(placeId, meetingDate, LocalDateTime.now(), pageDto);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @GetMapping("/my-parties")
    public ResponseEntity<ApiResult<List<TaxiPartyResponse.GetMyList>>> getMyList(@CurrentUser CustomUserDetails customUserDetails) {
        List<TaxiPartyResponse.GetMyList> response = taxiPartyService.getMyList(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

//    @GetMapping("/party/{taxiPartyId}/exit/users")
//    public void getTaxiPartyExitUsers(@PathVariable Long taxiPartyId){
//        final List<TaxiPartyResponse.TaxiPartyUsers> response = taxiPartyService.getExitUsers(taxiPartyId);
//    }

    @DeleteMapping("/party/{taxiPartyId}")
    public ResponseEntity<ApiResult<Void>> exitParty(@PathVariable Long taxiPartyId, @CurrentUser CustomUserDetails customUserDetails) {
        taxiPartyService.exit(taxiPartyId, customUserDetails.getUser().getId());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
