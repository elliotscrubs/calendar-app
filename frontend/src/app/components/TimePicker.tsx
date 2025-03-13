'use client';

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';

const TIME_FORMAT = 'HH:mm';

const EventFunction = () => {
  const [startAt, setStartAt] = React.useState<Dayjs | null>(null);
  const [endAt, setEndAt] = React.useState<Dayjs | null>(null);
  const [eventText, setEventText] = React.useState('');

   const formattedDate = dayjs().format('YYYY-MM-DD');
   const formattedStartAt = startAt ? `${formattedDate}T${startAt.format(TIME_FORMAT)}:00` : null;
   const formattedEndAt = endAt ? `${formattedDate}T${endAt.format(TIME_FORMAT)}:00` : null;

 
  const fetchData = async () => {
    try {
      const response = await axios.post(
        'http://localhost:9090/events',
        {
          userId: 0,
          startAt: formattedStartAt,
          endAt: formattedEndAt,
          eventText: eventText,
        },
        { timeout: 10000 }
      );

      console.log('Backend response:', response.data);

      setStartAt(dayjs(response.data.startAt, TIME_FORMAT));
      setEndAt(dayjs(response.data.endAt, TIME_FORMAT));
      setEventText(response.data.eventText);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        onClick={fetchData}
        sx={{ m: 1, width: '30ch' }}>
        Save event
      </Button>
    </Box>
  );
};

export default EventFunction;
