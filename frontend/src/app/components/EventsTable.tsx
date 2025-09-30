'use client';

import React, { useEffect, useState } from 'react';
import { ByDateResponse, calendarClient } from '../api/calendarClient';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Button,
  Box,
  Typography,
} from '@mui/material';
import DayCell from '../components/DayCell';
import CreateDialog from '../components/CreateDialog';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../context/AuthContext';

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
  backgroundColor: '#72ac60ff',
  borderRight: '1px solid white',
};

const EventsTable = (props: { firstDayOfTheWeek: Date }) => {
  const { logout } = useAuth();
  const [events, setEvents] = useState<ByDateResponse>({});
  const [openCreate, setOpenCreate] = React.useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

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

  return (
    <>
      {/* Desktop */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1600,
          margin: 'auto',
          borderRadius: 3,
          mt: 4,
          display: { xs: 'none', md: 'block' },
        }}>
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
                  <Fab
                    size='small'
                    aria-label='add'
                    sx={{ width: 36, height: 30, ml: 2 }}
                    onClick={() => {
                      setSelectedDayIndex(index);
                      setOpenCreate(true);
                    }}>
                    <AddIcon sx={{ fontSize: 25 }} />
                  </Fab>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {weekdays.map((day, index) => (
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
                    onDeleteEventCard={loadData}
                    onUpdateEventCard={loadData}
                    firstDayOfTheWeek={props.firstDayOfTheWeek}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobil */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          px: 2,
          pt: 2,
          minHeight: '100vh,',
          backgroundImage: 'url("/calendar-background.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          pb: 2,
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {weekdays.map((day, index) => (
            <Paper key={day} sx={{ p: 0 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                  px: 2,
                  py: 1,
                  backgroundColor: '#72ac60ff',
                  color: 'white',
                  borderRadius: 1,
                }}>
                <Typography fontWeight='bold'>{day}</Typography>
                <Fab
                  size='small'
                  aria-label='add'
                  onClick={() => {
                    setSelectedDayIndex(index);
                    setOpenCreate(true);
                  }}>
                  <AddIcon />
                </Fab>
              </Box>
              <Box sx={{ px: 2, py: 1 }}>
                <DayCell
                  index={index}
                  events={events}
                  onDeleteEventCard={loadData}
                  onUpdateEventCard={loadData}
                  firstDayOfTheWeek={props.firstDayOfTheWeek}
                />
              </Box>
            </Paper>
          ))}
        </Box>
        {selectedDayIndex !== null && (
          <CreateDialog
            dayIndex={selectedDayIndex}
            onCreateEventCard={loadData}
            open={openCreate}
            setOpen={setOpenCreate}
            firstDayOfTheWeek={props.firstDayOfTheWeek}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type='submit'
            variant='contained'
            sx={{ mt: 2, backgroundColor: '#72ac60ff' }}
            onClick={() => {
              logout();
            }}>
            Log out
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EventsTable;
