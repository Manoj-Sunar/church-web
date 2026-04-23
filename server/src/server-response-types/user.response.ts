export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserResponse {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}