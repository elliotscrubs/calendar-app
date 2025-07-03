'use client';

import { useState } from 'react';
import { Dayjs } from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import EventsTable from './components/EventsTable';
import dayjs from './utils/dayjs';

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
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'grey',
        }}>
        <IconButton onClick={steppingWeeksBack}>
          <ArrowBackIcon />
        </IconButton>
        <h2>{formattedWeek}</h2>
        <IconButton onClick={steppingWeeksForward}>
          <ArrowForwardIcon />
        </IconButton>
      </div>
      <EventsTable firstDayOfTheWeek={firstDayOfTheWeek.toDate()} />
    </>
  );
};

export default CurrentEventTable;
