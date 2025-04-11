'use client';
import React from 'react';
import { calendarClient } from './api/calendarClient';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

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
  const eventTest = calendarClient.displayEvents("00000300-0000-0000-0000-000000000000", new Date("2025-03-13"), new Date("2025-04-13"));
  console.log(eventTest);

  
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 1500, margin: 'auto', borderRadius: 3, mt: 3 }}>
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
              <TableCell
                key={index}
                align='center'
                style={{
                  borderRight:
                    index === weekdays.length - 1 ? 'none' : '1px solid #ccc',
                }}></TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;
