'use client';

import React, { useEffect, useState } from 'react';
import { ByDateResponse, calendarClient } from './api/calendarClient';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import DayCell from './components/DayCell';

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
    dayjs.extend(isoWeek);
    const monday: Date = dayjs().isoWeekday(1).toDate();
    const sunday: Date = dayjs().isoWeekday(7).toDate();

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
                <DayCell index={index} events={events} />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;
