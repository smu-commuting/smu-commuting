package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TaxiPartyRepositoryCustom {
    List<TaxiPartyResponse.GetList> findAllByPlaceAndDate(Long placeId, LocalDate meetingDate, LocalDateTime now, Pageable pageable);
}
