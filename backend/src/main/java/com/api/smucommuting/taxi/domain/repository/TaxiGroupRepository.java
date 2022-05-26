package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaxiGroupRepository extends JpaRepository<TaxiGroup, Long> {
    @Modifying(clearAutomatically = true)
    @Query("delete from TaxiGroup tg where tg.taxiParty.id=:taxiPartyId and tg.userId=:loginUserId")
    void deleteByTaxiPartyIdAndUserId(@Param("taxiPartyId") Long taxiPartyId, @Param("loginUserId") Long loginUserId);
}
