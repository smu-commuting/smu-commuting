package com.api.smucommuting.taxi.domain.repository;

import com.api.smucommuting.taxi.domain.TaxiParty;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.api.smucommuting.taxi.domain.QTaxiGroup.taxiGroup;
import static com.api.smucommuting.taxi.domain.QTaxiParty.taxiParty;

@RequiredArgsConstructor
@Slf4j
public class TaxiPartyRepositoryImpl implements TaxiPartyRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public List<TaxiParty> findAllByPlaceAndDate(Long placeId, LocalDate meetingDate, LocalDateTime now, Pageable pageable) {
        return queryFactory.selectFrom(taxiParty)
                .where(taxiParty.taxiPlace.id.eq(placeId)
                        .and(taxiParty.meetingTime.year().eq(meetingDate.getYear())
                                .and(taxiParty.meetingTime.month().eq(meetingDate.getMonthValue()))
                                .and(taxiParty.meetingTime.dayOfMonth().eq(meetingDate.getDayOfMonth())))
                        .and(taxiParty.meetingTime.after(now)))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(taxiParty.meetingTime.asc())
                .fetch();
    }

    @Override
    public List<TaxiParty> findAllByUser(Long userId) {
        return queryFactory.selectFrom(taxiParty)
                .join(taxiParty.taxiPlace).fetchJoin()
                .join(taxiParty.taxiGroupList, taxiGroup)
                .where(taxiGroup.userId.eq(userId))
                .orderBy(taxiParty.createdAt.desc())
                .fetch();
    }
}
