export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
}

export interface CreateUserPayload {
  fullName: string;
  email: string;
  password: string;
  password_confirmation: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  postalCode: string;
}