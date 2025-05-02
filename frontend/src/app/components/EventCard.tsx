'use client';

import * as React from 'react';
import { Event } from '../api/calendarClient';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const EventCard = (props: { event: Event }) => {
  return (
    <div
      style={{
        color: 'white',
        backgroundColor: '#E9967A',
        borderRadius: 4,
        fontSize: '1rem',
        marginBottom: '8px',
      }}>
      {props.event.startAt.toString().split('T')[1]} -
      {props.event.endAt.toString().split('T')[1]}
      <IconButton aria-label='delete' sx={{ p: 0, m: 1.5 }}>
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
