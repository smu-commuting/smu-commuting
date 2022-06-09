package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiGroup;
import com.api.smucommuting.taxi.domain.TaxiGroupUserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaxiGroupRepository extends JpaRepository<TaxiGroup, Long> {
    List<TaxiGroup> findAllByTaxiPartyIdAndStatus(Long taxiPartyId, TaxiGroupUserStatus status);

    Optional<TaxiGroup> findByTaxiPartyIdAndUserId(Long taxiPartyId, Long loginUserId);

    void deleteAllByUserId(Long userId);

    List<TaxiGroup> findAllByUserId(Long userId);
}
