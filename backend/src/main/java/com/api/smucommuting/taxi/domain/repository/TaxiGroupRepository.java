package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxiGroupRepository extends JpaRepository<TaxiGroup, Long> {
    void deleteByTaxiPartyIdAndUserId(Long taxiPartyId, Long loginUserId);
}
