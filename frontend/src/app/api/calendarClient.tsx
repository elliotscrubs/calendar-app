import axios, { AxiosInstance } from 'axios';
type UUID = string;

export interface CreateEventRequest {
  userId: UUID;
  startAt: Date;
  endAt: Date;
  eventText: string;
}

export interface Event {
  id: UUID;
  userId: UUID;
  startAt: Date;
  endAt: Date;
  eventText: string;
}

export type ByDateResponse = Record<string, Event[]>;
// Date format = "yyyy-MM-dd";

function formatDate(date: Date): string {
  const offset = date.getTimezoneOffset()
  const offsetApplied = new Date(date.getTime() - (offset*60*1000))
  return offsetApplied.toISOString().split('T')[0]
}

class CalendarClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createEvent(data: CreateEventRequest): Promise<Event> {
    const response = await this.axiosInstance.post<Event>('/events', data);
    return response.data;
  }  

  async getEvents(userId: UUID, fromDate: Date, toDate: Date) {
    const response = await this.axiosInstance.get<ByDateResponse>('/events/byDate', {
      params: {        
        userId: userId,
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate)
      },
    });
    return response.data;
  }
}

export const calendarClient = new CalendarClient('http://localhost:9090');
