package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiParty;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TaxiPartyRepositoryCustom {
    List<TaxiParty> findAllByPlaceAndDate(Long placeId, LocalDate meetingDate, LocalDateTime now, Pageable pageable);

    List<TaxiParty> findAllByUser(@Param("userId") Long userId);

    Optional<TaxiParty> findBetweenMeetingTimeInUser(Long userId, LocalDateTime meetingTime);
}
