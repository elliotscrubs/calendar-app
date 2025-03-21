import axios, { AxiosInstance } from "axios";
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

class CalendarClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
          baseURL,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }   

    async createEvent(data: CreateEventRequest): Promise<Event> {
        const response = await this.axiosInstance.post<Event>("/events", data);
        return response.data;
    }
}

export const calendarClient = new CalendarClient('http://localhost:9090');
