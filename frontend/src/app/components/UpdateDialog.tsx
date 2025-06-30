'use client';

import * as React from 'react';
import { calendarClient, Event } from '../api/calendarClient';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box, Button, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import Swal from 'sweetalert2';
import { isInvalid } from '../utils/isInvalid';
import dayjs from '../utils/dayjs'; 

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const UpdateDialog = (props: {
  event: Event;
  onUpdateEventCard: () => void | Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [startAt, setStartAt] = React.useState<Dayjs | null>(
    dayjs.utc(props.event.startAt).tz(userTimeZone)
  );
  const [endAt, setEndAt] = React.useState<Dayjs | null>(
    dayjs.utc(props.event.endAt).tz(userTimeZone)
  );
  const [eventText, setEventText] = React.useState(props.event.eventText);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (isInvalid(startAt, endAt, eventText)) {
      return;
    }

    const newEvent = {
      userId: props.event.userId,
      startAt: startAt!.toDate(),
      endAt: endAt!.toDate(),
      eventText: eventText,
    };

    try {
      await calendarClient.updateEvent(props.event.id, newEvent);
      await props.onUpdateEventCard();
      Swal.fire('Event is updated!');
    } catch (error) {
      console.error('Failed to submit:', error);
    }
    handleClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>{'Update an event'}</DialogTitle>
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
            Update event
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateDialog;
