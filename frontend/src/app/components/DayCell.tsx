'use client';

import { useMemo } from 'react';
import { ByDateResponse } from '../api/calendarClient';
import EventCard from './EventCard';
import dayjs from 'dayjs';

const DayCell = (props: {
  index: number;
  events: ByDateResponse;
  onDeleteEventCard: () => void | Promise<void>;
  onUpdateEventCard: () => void | Promise<void>;
  firstDayOfTheWeek: Date;
}) => {
  const eventsList = useMemo(() => {
    const targetDate = dayjs(props.firstDayOfTheWeek)
      .add(props.index, 'day')
      .format('YYYY-MM-DD');

    return Object.keys(props.events)
      .filter(date => dayjs(date).format('YYYY-MM-DD') === targetDate)
      .map(date => props.events[date])
      .flat();
  }, [props.index, props.events, props.firstDayOfTheWeek]);

  if (eventsList.length === 0) {
    return <div style={{ color: 'grey' }}>No events on this day</div>;
  }
  return eventsList.map((events, index) => (
    <EventCard
      key={index}
      event={events}
      onDeleteEventCard={props.onDeleteEventCard}
      onUpdateEventCard={props.onUpdateEventCard}
    />
  ));
};

export default DayCell;
