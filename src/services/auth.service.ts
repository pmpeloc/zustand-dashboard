import { AxiosError } from 'axios';
import { tesloApi } from '../api/teslo.api';

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data);
      }

      throw new Error('Unable to login');
    }
  };

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get('/auth/check-status');

      return data;
    } catch (e) {
      throw new Error('Unauthorized');
    }
  };
}
