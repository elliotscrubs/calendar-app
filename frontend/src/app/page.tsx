'use client';

import { useState } from 'react';
import { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';

dayjs.extend(isoWeek);
const now = dayjs();
const monday = now.startOf('isoWeek');
const sunday = now.startOf('isoWeek').add(6, 'day');
const formattedWeek = `${monday.format('MM.DD')} - ${sunday.format('MM.DD')}`;

const CurrentEventTable = () => {
  const [firstDayOfTheWeek, setFirstDayOfTheWeek] = useState<Dayjs>(monday);

  function steppingWeeksBack() {
    const currentDate = new Date();
    const lastWeekDate = new Date(currentDate.getTime());
    console.log(lastWeekDate);
    return lastWeekDate;
  }

  function steppingWeeksForward() {
    const currentDate = new Date();
    const nextWeekDate = new Date(currentDate.getTime() + 7);
    console.log(nextWeekDate);
    return nextWeekDate;
  }

  return (
    <>
      <div>
        <h2>
          {formattedWeek}
        </h2>
        <IconButton onClick={steppingWeeksBack}>
          <ArrowBackIcon sx={{ fontSize: 'small', color: 'blue' }} />   
        </IconButton> 
        <IconButton onClick={steppingWeeksForward}> 
          <ArrowForwardIcon sx={{ fontSize: 'small', color: 'black' }} />
        </IconButton>    
      </div>
    </>
  );
};

export default CurrentEventTable;
