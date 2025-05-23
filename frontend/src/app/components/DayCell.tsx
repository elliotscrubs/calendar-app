'use client';

import { useMemo } from 'react';
import { ByDateResponse } from '../api/calendarClient';
import EventCard from './EventCard';
import dayjs from 'dayjs';

const DayCell = (props: { index: number; events: ByDateResponse; deleteEventCard: () => void | Promise<void> }) => {
  const eventsList = useMemo(() => {
    return Object.keys(props.events)
      .filter(date => (props.index + 1) % 7 === dayjs(date).isoWeekday())
      .map(date => props.events[date])
      .flat();
  }, [props.index, props.events]);

  return eventsList.map((events, index) => (
    <EventCard key={index} event={events} deleteEventCard={props.deleteEventCard}/>
  ));
};

export default DayCell;
