export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  // Add additional fields for register if needed
}