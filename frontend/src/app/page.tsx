'use client';
import React, { useEffect, useState } from 'react';
import { ByDateResponse, calendarClient } from './api/calendarClient';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
  } from '@mui/material';
import EventCard from './components/EventCard';

const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const cellStyle = {
  fontWeight: 'bold',
  color: 'white',
  backgroundColor: '#1976d2',
  borderRight: '1px solid white',
};

const EventsTable = () => {
  const [events, setEvents] = useState<ByDateResponse>({});

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const eventTest = calendarClient.displayEvents(
      '00000300-0000-0000-0000-000000000000',
      new Date('2025-03-13'),
      new Date('2025-04-13')
    );    
    setEvents(await eventTest);
  }

  const dayOfWeek = new Date("2025-03-13"); 
  console.log(dayOfWeek.getDay()); 

  
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1500, margin: 'auto', borderRadius: 3, mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {weekdays.map((day, index) => (
              <TableCell
                key={index}
                align='center'
                style={{
                  ...cellStyle,
                  borderRight:
                    index === weekdays.length - 1
                      ? 'none'
                      : cellStyle.borderRight,
                }}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {weekdays.map((dayName, index) => (
              // weekdays.map((dayName, index) => console.log((index + 1) % 7));      ==    (dayOfWeek.getDay())
              <TableCell
                key={index}
                align='center'
                style={{
                  borderRight:
                    index === weekdays.length - 1 ? 'none' : '1px solid #ccc',
                }}>
                { // itt az Object.values(events).flat() reszt ki kene cserelni valamire ami kiszedi az events-bol (ami az api valasz) az adott napra tartozo event listat
                Object.values(events).flat().map((event, eventIndex) => (
                      <EventCard key={eventIndex} event={event} />
                    ))}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;
