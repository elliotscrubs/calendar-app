'use client';

import { useMemo } from 'react';
import { ByDateResponse } from '../api/calendarClient';
import EventCard from './EventCard';
import dayjs from 'dayjs';

const DayCell = (props: {
  index: number;
  events: ByDateResponse;
  deleteEventCard: () => void | Promise<void>;
}) => {
  const eventsList = useMemo(() => {
    return Object.keys(props.events)
      .filter(date => dayjs(date).isoWeekday() === props.index + 1)
      .map(date => props.events[date])
      .flat();
  }, [props.index, props.events]);

  return eventsList.map((events, index) => (
    <EventCard
      key={index}
      event={events}
      reloadEvents={props.deleteEventCard}
    />
  ));
};

export default DayCell;
