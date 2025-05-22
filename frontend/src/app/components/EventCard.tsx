'use client';

import * as React from 'react';
import { calendarClient, Event } from '../api/calendarClient';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import dayjs from 'dayjs';

const EventCard = (props: { event: Event }) => {
  const startTime = dayjs(props.event.startAt).format('HH:mm');
  const endTime = dayjs(props.event.endAt).format('HH:mm');

  const handleDelete = async () => {
    console.log('Delete icon clicked');
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );
    if (!confirmed) return;
    try {
      await calendarClient.deleteEvent(props.event.id);
      alert('Event deleted.');
    } catch (error) {
      console.error('An error occurred during the request.', error);
      alert('An error occurred during the request.');
    }
  };

  return (
    <div
      style={{
        color: 'white',
        backgroundColor: '#E9967A',
        borderRadius: 4,
        fontSize: '1rem',
        marginBottom: '8px',
      }}>
      {startTime} - {endTime}
      <IconButton
        onClick={handleDelete}
        aria-label='delete'
        sx={{ p: 0, m: 1.5 }}>
        <DeleteIcon sx={{ fontSize: 'small', color: 'white' }} />
      </IconButton>
      <IconButton aria-label='create' sx={{ p: 0, m: 0 }}>
        <CreateIcon sx={{ fontSize: 'small', color: 'white' }} />
      </IconButton>
      <br></br>
      {props.event.eventText}
    </div>
  );
};

export default EventCard;
