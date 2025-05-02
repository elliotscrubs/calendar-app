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
  Paper,
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
    const monday: Date = new Date();
    monday.setDate(monday.getDate() - monday.getDay() + 1);

    const sunday: Date = new Date();
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

    const eventTest = calendarClient.getEvents(
      '00000300-0000-0000-0000-000000000000',
      monday,
      sunday
    );
    setEvents(await eventTest);
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1600, margin: 'auto', borderRadius: 3, mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {weekdays.map((day, index) => (
              <TableCell
                key={index}
                align='center'
                style={{
                  width: '14.28%',
                  verticalAlign: 'top',
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
              <TableCell
                key={index}
                align='center'
                style={{
                  width: '14.28%',
                  verticalAlign: 'top',
                  padding: '8px',
                  borderRight:
                    index === weekdays.length - 1 ? 'none' : '1px solid #ccc',
                }}>
                {Object.keys(events)
                  .filter(date => (index + 1) % 7 == new Date(date).getDay())
                  .map(date => events[date])
                  .flat()
                  .map((event, eventIndex) => (
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
