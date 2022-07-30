/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Stack, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function DatePick({ selectedDate, setSelectedDate }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack
                spacing={4}
                sx={{ backgroundColor: '#efecff', margin: '3rem 0' }}
            >
                <DatePicker
                    inputFormat="yyyy-MM-dd"
                    mask="____-__-__"
                    label="택시 탑승 날짜를 선택해 주세요"
                    renderInput={params => <TextField {...params} />}
                    value={selectedDate}
                    onChange={newValue => {
                        setSelectedDate(newValue);
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default DatePick;
