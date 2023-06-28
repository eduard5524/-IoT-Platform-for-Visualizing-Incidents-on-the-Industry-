export interface AuthResponse {
  token: string;
  refreshToken: string;
  status: number;
}

export const STATUS_REFRESH_PASSWORD = 1001;
