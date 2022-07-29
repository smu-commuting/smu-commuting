/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Stack, TextField } from '@mui/material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function TimePick({ selectedTime, setSelectedTime }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack
                spacing={4}
                sx={{
                    width: '100%',
                    backgroundColor: '#efecff',
                }}
            >
                <TimePicker
                    label="택시 탑승 시간을 선택해 주세요"
                    renderInput={params => <TextField {...params} />}
                    value={selectedTime}
                    onChange={newValue => {
                        setSelectedTime(newValue);
                    }}
                    shouldDisableTime={(timeValue, clockType) => {
                        if (clockType === 'minutes' && timeValue % 5) {
                            return true;
                        }
                        return false;
                    }}
                />
            </Stack>
        </LocalizationProvider>
    );
}

export default TimePick;
