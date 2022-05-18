package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.dto.QTaxiPartyResponse_GetList;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.api.smucommuting.taxi.domain.QTaxiParty.taxiParty;

@RequiredArgsConstructor
@Slf4j
public class TaxiPartyRepositoryImpl implements TaxiPartyRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public List<TaxiPartyResponse.GetList> findAllByPlaceAndDate(Long placeId, LocalDate meetingDate, LocalDateTime now, Pageable pageable) {
        return queryFactory.select(new QTaxiPartyResponse_GetList(
                        taxiParty.id,
                        taxiParty.taxiGroupList.size(),
                        taxiParty.headcount,
                        taxiParty.meetingTime
                ))
                .from(taxiParty)
                .where(taxiParty.taxiPlace.id.eq(placeId)
                        .and(taxiParty.meetingTime.year().eq(meetingDate.getYear())
                                .and(taxiParty.meetingTime.month().eq(meetingDate.getMonthValue())))
                        .and(taxiParty.meetingTime.after(now)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(taxiParty.meetingTime.asc())
                .fetch();
    }
}
