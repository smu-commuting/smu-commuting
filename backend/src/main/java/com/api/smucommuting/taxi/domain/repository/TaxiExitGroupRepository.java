package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiExitGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaxiExitGroupRepository extends JpaRepository<TaxiExitGroup, Long> {
    List<TaxiExitGroup> findAllByTaxiPartyId(Long taxiPartyId);

    Optional<TaxiExitGroup> findByUserIdAndTaxiPartyId(Long userId, Long taxiPartyId);

    void deleteByUserId(Long userId);
}
