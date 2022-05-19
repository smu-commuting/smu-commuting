package com.api.smucommuting.taxi.service;

import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.domain.repository.TaxiPlaceRepository;
import com.api.smucommuting.taxi.dto.TaxiPlaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaxiPlaceService {
    private final TaxiPlaceRepository taxiPlaceRepository;

    public List<TaxiPlaceResponse> getList() {
        List<TaxiPlace> placeList = taxiPlaceRepository.findAll();
        return placeList.stream().map(TaxiPlaceResponse::build).collect(Collectors.toList());
    }
}
