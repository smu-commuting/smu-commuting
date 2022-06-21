package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiExitGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaxiExitGroupRepository extends JpaRepository<TaxiExitGroup, Long> {
    List<TaxiExitGroup> findAllByTaxiPartyId(Long taxiPartyId);

}
