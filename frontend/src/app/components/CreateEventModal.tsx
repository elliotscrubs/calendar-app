'use client';

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { calendarClient, CreateEventRequest } from '../api/calendarClient';
import { toast } from 'material-react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'; 


const CreateEventModal = () => {
  const [startAt, setStartAt] = React.useState<Dayjs | null>(null);
  const [endAt, setEndAt] = React.useState<Dayjs | null>(null);
  const [eventText, setEventText] = React.useState('');

  function getCreateEventRequest(
    startAt: Dayjs | null,
    endAt: Dayjs | null,
    eventText: string
  ): CreateEventRequest | null {
    if (!startAt || !endAt || eventText.length < 5 || eventText.length > 200) {
      return null;
    } else {
      return {
        userId: uuidv4(),
        startAt: startAt.toDate(),
        endAt: endAt.toDate(),
        eventText: eventText,
      };
    }
  }

  const handleSubmit = async () => {
    const newEvent: CreateEventRequest | null = getCreateEventRequest(
      startAt,
      endAt,
      eventText
    );
    if (!newEvent) {
      return;
    } else {
      try {
        calendarClient.createEvent(newEvent);
        toast.success('Event created successfully! 🦄', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } catch (error) {
        console.error('Failed to submit:', error);
      }
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
        required
        error={eventText.length < 5 || eventText.length > 200}
        helperText={eventText.length ? 'min 5, max 200' : ''}
        slotProps={{ htmlInput: { maxLength: 200 } }}
        label='Event Text'
        variant='outlined'
        value={eventText}
        onChange={e => setEventText(e.target.value)}
        sx={{ m: 1, width: '30ch' }}
      />

      <Button
        variant='contained'
        disabled={!getCreateEventRequest(startAt, endAt, eventText)}
        onClick={handleSubmit}
        sx={{ m: 1, width: '30ch' }}>
        Save event
      </Button>
    </Box>
  );
};

export default CreateEventModal;
