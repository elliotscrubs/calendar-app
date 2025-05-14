'use client';

import { useEffect, useState } from 'react';
import { Event } from '../api/calendarClient';
import { ByDateResponse } from '../api/calendarClient';
import EventCard from './EventCard';

const DayCell = (props: { index: number; events: ByDateResponse }) => {
  const [eventsList, setEventsList] = useState<Event[]>([]);

  useEffect(() => {
    const newEventList = Object.keys(props.events)
      .filter(date => (props.index + 1) % 7 == new Date(date).getDay())
      .map(date => props.events[date])
      .flat();

    setEventsList(newEventList);
  }, [props.index, props.events]);

  return eventsList.map((events, index) => (
    <EventCard key={index} event={events} />
  ));
};

export default DayCell;
