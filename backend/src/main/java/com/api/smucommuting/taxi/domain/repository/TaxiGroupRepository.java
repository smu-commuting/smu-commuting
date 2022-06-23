package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxiGroupRepository extends JpaRepository<TaxiGroup, Long> {
    void deleteAllByUserId(Long userId);

    List<TaxiGroup> findAllByUserId(Long userId);

    List<TaxiGroup> findAllByTaxiPartyId(Long taxiPartyId);

    void deleteByUserId(Long loginUserId);
}
