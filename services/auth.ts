import api from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  about?: string;
  address?: string;
}

export interface UpdateUserDto {
  name: string;
  email: string;
  about?: string;
  address?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  about?: string;
}

export interface LoginResult {
  token: string;
}

export const authService = () => ({
  login: (dto: LoginDto) => {
    return api.post<LoginResult>("/auth/login/app", dto);
  },
  register: (dto: RegisterDto) => {
    return api.post<LoginResult>("/user", dto);
  },
  updateUser: (dto: UpdateUserDto, id: string) => {
    return api.put(`/user/${id}`, dto);
  },
  getCurrentUser: () => {
    return api.get<User>("/auth/myself");
  },
});
