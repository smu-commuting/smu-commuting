package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TaxiPartyRepository extends JpaRepository<TaxiParty, Long>, TaxiPartyRepositoryCustom {
    @Query("select tp from TaxiParty tp join fetch tp.taxiGroupList where tp.id=:taxiPartyId")
    Optional<TaxiParty> findByIdWithTaxiGroup(Long taxiPartyId);
}
