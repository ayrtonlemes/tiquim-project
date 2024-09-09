import { User } from "@prisma/client";

export type CreateUserDto = Pick<
  User,
  "name" | "email" | "password" | "avatarUrl" | "city" | "state" | "userTypeId"
>;
export type UpdateUserDto = Pick<
  User,
  "name" | "email" | "password" | "avatarUrl" | "city" | "state"
>;
export type UserDto = Omit<User, "password">;
export type TypeUser = "CLIENT" | "ADMIN";
