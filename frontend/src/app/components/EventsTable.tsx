'use client';

import React, { useEffect, useState } from 'react';
import { ByDateResponse, calendarClient } from '../api/calendarClient';
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
import DayCell from '../components/DayCell';
import CreateDialog from '../components/CreateDialog';
dayjs.extend(isoWeek);

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

const EventsTable = (props: { firstDayOfTheWeek: Date }) => {
  const [events, setEvents] = useState<ByDateResponse>({});

  useEffect(() => {
    loadData();
  }, [props.firstDayOfTheWeek]);

  async function loadData() {
    const lastDayOfTheWeek = new Date(props.firstDayOfTheWeek);
    lastDayOfTheWeek.setDate(lastDayOfTheWeek.getDate() + 7);

    const eventTest = calendarClient.getEvents(
      '00000300-0000-0000-0000-000000000000',
      props.firstDayOfTheWeek,
      lastDayOfTheWeek
    );
    setEvents(await eventTest);
  }

  // const weekdays: Date[] = [

  //   ];

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
                  ...cellStyle,
                  borderRight:
                    index === weekdays.length - 1
                      ? 'none'
                      : cellStyle.borderRight,
                  padding: '8px',
                }}>
                {day}
                <CreateDialog
                  dayIndex={index}
                  createEventCard={loadData}
                  firstDayOfTheWeek={props.firstDayOfTheWeek}
                />
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
                  padding: '8px',
                  borderRight:
                    index === weekdays.length - 1 ? 'none' : '1px solid #ccc',
                }}>
                <DayCell
                  index={index}
                  events={events}
                  deleteEventCard={loadData}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;
