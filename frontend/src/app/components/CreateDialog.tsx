'use client';

import * as React from 'react';
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
import { calendarClient } from '../api/calendarClient';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { isInvalid } from '../utils/isInvalid';
import dayjs from '../utils/dayjs';

const CreateDialog = (props: {
  dayIndex: number;
  firstDayOfTheWeek: Date;
  onCreateEventCard: () => void | Promise<void>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [startAt, setStartAt] = React.useState<Dayjs | null>(null);
  const [endAt, setEndAt] = React.useState<Dayjs | null>(null);
  const [eventText, setEventText] = React.useState('');

  React.useEffect(() => {
    if (props.open) {
      setStartAt(null);
      setEndAt(null);
      setEventText('');
    }
  }, [props.open]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSubmit = async () => {
    if (isInvalid(startAt, endAt, eventText)) {
      return;
    }

    const selectedDate = dayjs(props.firstDayOfTheWeek).add(
      props.dayIndex,
      'day'
    );

    const finalStartAt = selectedDate
      .hour(startAt!.hour())
      .minute(startAt!.minute());

    const finalEndAt = selectedDate.hour(endAt!.hour()).minute(endAt!.minute());

    const newEvent = {
      userId: uuidv4(),
      startAt: finalStartAt.toDate(),
      endAt: finalEndAt.toDate(),
      eventText: eventText,
    };

    try {
      await calendarClient.createEvent(newEvent);
      await props.onCreateEventCard();
      Swal.fire('Event is created!');
    } catch (error) {
      console.error('Failed to submit:', error);
    }
    handleClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={() => props.setOpen(false)}>
        <DialogTitle>{'Create a new event'}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              pb: 2,
              border: 2,
              width: '32ch',
              borderRadius: '5px',
              borderColor: '#247d08ff',
            }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['TimePicker']}
                sx={{
                  m: 1,
                  width: '30ch',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#247d08ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#247d08ff',
                    },
                  },
                }}>
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
                sx={{
                  m: 1,
                  width: '30ch',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#247d08ff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#247d08ff',
                    },
                  },
                }}>
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
              value={eventText}
              onChange={e => setEventText(e.target.value)}
              sx={{
                m: 1,
                width: '30ch',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#247d08ff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#247d08ff',
                  },
                },
              }}
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
              backgroundColor: '#247d08ff',
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
