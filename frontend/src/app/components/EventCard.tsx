'use client';

import * as React from 'react';
import { calendarClient, Event } from '../api/calendarClient';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import UpdateDialog from './UpdateDialog';

dayjs.extend(utc);
dayjs.extend(timezone);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const EventCard = (props: {
  event: Event;
  reloadEvents: () => void | Promise<void>;
}) => {
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
        await props.reloadEvents();
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
      <UpdateDialog event={props.event} updateEventCard={props.reloadEvents} />
      <br></br>
      {props.event.eventText}
    </div>
  );
};

export default EventCard;
