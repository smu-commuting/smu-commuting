package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiPlace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxiPlaceRepository extends JpaRepository<TaxiPlace, Long> {
}
