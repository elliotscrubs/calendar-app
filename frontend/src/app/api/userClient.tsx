import axios, { AxiosInstance } from 'axios';

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
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

type User = {
  username: string;
  email: string;
};

class UserClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      localStorage.setItem('accessToken', token);
    } else {
      delete this.axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('accessToken');
    }
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await this.axiosInstance.post<RegisterResponse>(
      '/api/auth/register',
      data
    );
    return response.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.axiosInstance.post('/api/auth/login', data);
    this.setAuthToken(response.data.token);
    return response.data;
  }

  async getMe(): Promise<User> {
  const response = await this.axiosInstance.get<User>('/api/user/me');
  return response.data;
}
}

export const userClient = new UserClient('http://localhost:9090/');
