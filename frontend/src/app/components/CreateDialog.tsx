'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import { calendarClient } from '../api/calendarClient';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

const CreateDialog = (props: {
  day: string;
  createEventCard: () => void | Promise<void>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [startAt, setStartAt] = React.useState<Dayjs | null>(null);
  const [endAt, setEndAt] = React.useState<Dayjs | null>(null);
  const [eventText, setEventText] = React.useState('');

  function isInvalid(
    startAt: Dayjs | null,
    endAt: Dayjs | null,
    eventText: string
  ): boolean {
    return !startAt || !endAt || eventText.length < 5 || eventText.length > 200;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (isInvalid(startAt, endAt, eventText)) {
      return;
    }

    const newEvent = {
      userId: uuidv4(),
      startAt: startAt!.toDate(),
      endAt: endAt!.toDate(),
      eventText: eventText,
    };

    try {
      await calendarClient.createEvent(newEvent);
      await props.createEventCard();
      Swal.fire('Event is created!');      
    } catch (error) {
      console.error('Failed to submit:', error);
    }
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          ml: 5,
        }}>
        {props.day}
        <Fab
          size='small'
          color='primary'
          aria-label='add'
          align-items='center'
          sx={{ width: 36, height: 30 }}
          onClick={handleClickOpen}>
          <AddIcon sx={{ fontSize: 25 }} />
        </Fab>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Create a new event'}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              pb: 2,
              border: 2,
              width: '32ch',
              borderRadius: '5px',
              borderColor: 'blue',
            }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['TimePicker']}
                sx={{ m: 1, width: '30ch' }}>
                <TimePicker
                  label='Event Start'
                  value={startAt}
                  onChange={newValue => {
                    setStartAt(newValue);
                  }}
                />
              </DemoContainer>

              <DemoContainer
                components={['TimePicker']}
                sx={{ m: 1, width: '30ch' }}>
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
              required
              error={eventText.length < 5 || eventText.length > 200}
              helperText={eventText.length ? 'min 5, max 200' : ''}
              slotProps={{ htmlInput: { maxLength: 200 } }}
              label='Event Text'
              variant='outlined'
              value={eventText}
              onChange={e => setEventText(e.target.value)}
              sx={{ m: 1, width: '30ch' }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={handleSubmit}
            sx={{
              my: 2,
              border: 2,
              width: '30ch',
              borderRadius: '5px',
              borderColor: 'blue',
              backgroundColor: 'blue',
              color: 'white',
            }}>
            Save event
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateDialog;
