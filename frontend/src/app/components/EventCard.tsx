'use client';

import * as React from 'react';
import { Event } from '../api/calendarClient';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = (props: { event: Event }) => {
  return (
    <div style={{
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: '#E9967A',
      borderRadius: 4,
      display: 'flex',
      justifyContent: 'space-evenly'
    }}>      
      <div
        >
        {props.event.startAt.toString().split('T')[1]} -
        {props.event.endAt.toString().split('T')[1]}
        <br></br>
        {props.event.eventText}
      </div>
      <IconButton aria-label='delete'>
        <DeleteIcon style={{fontSize: 'large', color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default EventCard;
