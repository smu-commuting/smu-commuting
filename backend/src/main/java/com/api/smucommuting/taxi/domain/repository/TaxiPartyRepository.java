package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiParty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxiPartyRepository extends JpaRepository<TaxiParty, Long>, TaxiPartyRepositoryCustom {

}
