import { Dayjs } from 'dayjs';

export function isInvalid(
    startAt: Dayjs | null,
    endAt: Dayjs | null,
    eventText: string
  ): boolean {
    return !startAt || !endAt || eventText.length < 5 || eventText.length > 200;
  }
