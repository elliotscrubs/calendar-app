'use client';

import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import EventsTable from './components/EventsTable';
import dayjs from './utils/dayjs';
import { Box } from '@mui/system';

const CurrentEventTable = () => {
  const [firstDayOfTheWeek, setFirstDayOfTheWeek] = useState<Dayjs>(
    dayjs().startOf('isoWeek')
  );

  const monday = firstDayOfTheWeek;
  const sunday = firstDayOfTheWeek.add(6, 'day');
  const formattedWeek = `${monday.format('MM.DD')} - ${sunday.format('MM.DD')}`;

  function steppingWeeksBack() {
    setFirstDayOfTheWeek(firstDayOfTheWeek =>
      firstDayOfTheWeek.subtract(1, 'week')
    );
  }

  function steppingWeeksForward() {
    setFirstDayOfTheWeek(firstDayOfTheWeek => firstDayOfTheWeek.add(1, 'week'));
  }

  return (
    <ProtectedRoute>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url("/calendar-background.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
        }}>
        <Box sx={{ maxWidth: 1600, margin: 'auto', pt: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-center',
              color: '#247d08ff',
              mb: 2,
            }}>
            <IconButton onClick={steppingWeeksBack}>
              <ArrowBackIcon />
            </IconButton>
            <h2 style={{ margin: '16px' }}>{formattedWeek}</h2>
            <IconButton onClick={steppingWeeksForward}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
          <EventsTable firstDayOfTheWeek={firstDayOfTheWeek.toDate()} />
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default CurrentEventTable;
