'use client';

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { apiClient, CreateEventRequest } from '../api/apiClient';

const CreateEventModal = () => {
  const [startAt, setStartAt] = React.useState<Dayjs | null>(null);
  const [endAt, setEndAt] = React.useState<Dayjs | null>(null);
  const [eventText, setEventText] = React.useState('');

  const handleSubmit = async () => {
    if (!startAt || !endAt || !eventText) return;

    const newEvent: CreateEventRequest = {
      userId: 0,
      startAt:  startAt.toDate(), 
      endAt:  endAt.toDate(), 
      eventText: eventText
    };

    try {
      apiClient.post(newEvent);
      alert("Event created successfully");
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  return (
    <Box
      sx={{
        border: 2,
        width: '32ch',
        borderRadius: '5px',
        borderColor: 'blue',
      }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']} sx={{ m: 1, width: '30ch' }}>
          <TimePicker
            label='Event Start'
            value={startAt}
            onChange={newValue => {
              setStartAt(newValue);
            }}
          />
        </DemoContainer>

        <DemoContainer components={['TimePicker']} sx={{ m: 1, width: '30ch' }}>
          <TimePicker
            label='Event End'
            value={endAt}
            onChange={newValue => {
              setEndAt(newValue);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>

      <TextField
        slotProps={{ htmlInput: { maxLength: 200 } }}
        label='Event Text'
        variant='outlined'
        value={eventText}
        onChange={e => setEventText(e.target.value)}
        sx={{ m: 1, width: '30ch' }}
      />

      <Button
        variant='contained'
        onClick={handleSubmit}
        sx={{ m: 1, width: '30ch' }}>
        Save event
      </Button>
    </Box>
  );
};

export default CreateEventModal;
