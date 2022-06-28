import React from 'react';
import './LostItemSearch.scss';

function LostItemSearch() {
    return (
        <div className="lostitemsearch-wrapper">
            <div className="lostitempage-search">
                <select>
                    <option value="" selected disabled hidden>
                        분류
                    </option>
                    <option value="습득날짜">습득날짜</option>
                    <option value="습득물품">습득물품</option>
                    <option value="습득장소">습득장소</option>
                </select>
                <input type="text" />
                <button type="submit">검색</button>
            </div>
        </div>
    );
}

export default LostItemSearch;
