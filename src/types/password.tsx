export interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: {
    current_password?: string[];
    password?: string[];
  };
}