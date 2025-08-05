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

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string, 
  password: string
}

export interface LoginResponse {
  email: string, 
  password: string
}

function formatDate(date: Date): string {
  const offset = date.getTimezoneOffset();
  const offsetApplied = new Date(date.getTime() - offset * 60 * 1000);
  return offsetApplied.toISOString().split('T')[0];
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

  async getEvents(userId: UUID, fromDate: Date, toDate: Date) {
    const response = await this.axiosInstance.get<ByDateResponse>(
      '/events/byDate',
      {
        params: {
          userId: userId,
          fromDate: formatDate(fromDate),
          toDate: formatDate(toDate),
        },
      }
    );
    return response.data;
  }

  async createEvent(data: CreateEventRequest): Promise<Event> {
    const response = await this.axiosInstance.post<Event>('/events', data);
    return response.data;
  }

  async deleteEvent(id: UUID): Promise<void> {
    await this.axiosInstance.delete<Event>(`/events/${id}`);
  }

  async updateEvent(id: UUID, data: CreateEventRequest): Promise<Event> {
    const response = await this.axiosInstance.patch<Event>(
      `/events/${id}`,
      data
    );
    return response.data;
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.axiosInstance.post<RegisterResponse>(
      '/api/auth/register',
      data
    );
    return response.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.axiosInstance.post('/api/auth/login', 
      data
    );
    return response.data.token;
  }
}

export const calendarClient = new CalendarClient('http://localhost:9090');
