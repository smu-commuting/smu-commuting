package com.api.smucommuting.taxi.dto;

import com.api.smucommuting.taxi.domain.TaxiPlace;
import lombok.*;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TaxiPlaceResponse {
    private Long taxiPlaceId;
    private String name;

    public static TaxiPlaceResponse build(TaxiPlace taxiPlace) {
        return TaxiPlaceResponse.builder()
                .taxiPlaceId(taxiPlace.getId())
                .name(taxiPlace.getName())
                .build();
    }
}
