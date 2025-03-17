import axios, { AxiosInstance } from "axios";

export interface CreateEventRequest {
    userId: number;
    startAt: Date;
    endAt: Date;
    eventText: string;
}

export interface Event {
    id: number;
    userId: number;
    startAt: Date;
    endAt: Date;
    eventText: string;
}

class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
          baseURL,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }   

    async post(data: CreateEventRequest): Promise<Event> {
        const response = await this.axiosInstance.post<Event>("/events", data);
        return response.data;
    }
}

export const apiClient = new ApiClient('http://localhost:9090');