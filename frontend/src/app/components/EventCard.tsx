'use client';

import * as React from 'react';
import { calendarClient, Event } from '../api/calendarClient';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import UpdateDialog from './UpdateDialog';
import CreateIcon from '@mui/icons-material/Create';
import dayjs from '../utils/dayjs'; 

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const EventCard = (props: {
  event: Event;
  deleteEventCard: () => void | Promise<void>;
}) => {
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const startTime = dayjs
    .utc(props.event.startAt)
    .tz(userTimeZone)
    .format('HH:mm');
  const endTime = dayjs.utc(props.event.endAt).tz(userTimeZone).format('HH:mm');

  const handleDelete = async () => {
    const confirmationResult = await Swal.fire({
      title: 'Are you sure you want to delete this event?',
      text: 'This event will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No!',
      width: '300px',
    });

    if (confirmationResult.isConfirmed) {
      try {
        await calendarClient.deleteEvent(props.event.id);
        await props.deleteEventCard();
        Swal.fire('Event deleted!');
      } catch (error) {
        console.error('An error occurred during the request.', error);
        Swal.fire('Error!', 'An error occurred during the request.', 'error');
      }
    }
  };

  return (
    <div
      style={{
        color: 'black',
        backgroundColor: 'rgba(201, 76, 76, 0.3)',
        borderRadius: 4,
        fontSize: '1rem',
        marginBottom: '7px',
      }}>
      {startTime} - {endTime}
      <IconButton
        onClick={handleDelete}
        aria-label='delete'
        sx={{ p: 0, m: 1.5 }}>
        <DeleteIcon sx={{ fontSize: 'small', color: 'black' }} />
      </IconButton>
      <IconButton
        onClick={() => setOpenUpdate(true)}
        aria-label='edit'
        size='small'
        sx={{ p: 0.5 }}>
        <CreateIcon sx={{ fontSize: 'small', color: 'black' }} />
      </IconButton>
      <UpdateDialog
        event={props.event}
        onUpdateEventCard={props.deleteEventCard}
        open={openUpdate}
        setOpen={setOpenUpdate}
      />
      <br></br>
      {props.event.eventText}
    </div>
  );
};

export default EventCard;
