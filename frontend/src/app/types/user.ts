export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
  userTypeId: string;
}

export type UserDto = Pick<User, "name" | "email" | "password" | "avatarUrl" | "city" | "state">;

export interface Credentials {
  email: string;
  password: string;
}
