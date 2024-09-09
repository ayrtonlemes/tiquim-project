import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
import { UserType } from "../userType/userType.constants";
import { CreateUserDto, UserDto, TypeUser, UpdateUserDto } from "./user.types";
import { error } from "console";

const prisma = new PrismaClient();

export const createUser = async (user: CreateUserDto): Promise<UserDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.password, salt);

  try {
    if (user.userTypeId === "ADMIN") {
      throw new Error("Não é possível criar um admin.");
    }

    const newUser = await prisma.user.create({
      select: {
        id: true,
        name: true,
        email: true,
        userTypeId: true,
        avatarUrl: true,
        city: true,
        state: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...user,
        password: password,
        userTypeId: UserType.CLIENT,
      },
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

export const createUserAdmin = async (user: CreateUserDto, uid: string): Promise<UserDto> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.password, salt);

  try {
    const newUser = await prisma.user.create({
      select: {
        id: true,
        name: true,
        email: true,
        userTypeId: true,
        avatarUrl: true,
        city: true,
        state: true,
        createdAt: true,
        updatedAt: true,
      },
      data: {
        ...user,
        password: password,
        userTypeId: UserType.ADMIN,
      },
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

export const listUsers = async (skip?: number, take?: number): Promise<UserDto[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      avatarUrl: true,
      city: true,
      state: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
  });
};

export const readUser = async (id: string): Promise<UserDto | null> => {
  return await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      userTypeId: true,
      avatarUrl: true,
      city: true,
      state: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { id },
  });
};

export const updateUser = async (id: string, user: UpdateUserDto): Promise<UserDto | null> => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS!);
  const salt = await genSalt(rounds);
  const password = await hash(user.password, salt);

  return await prisma.user.update({
    where: { id },
    data: {
      ...user,
      password: password,
    },
  });
};

export const deleteUser = async (id: string): Promise<UserDto> => {
  return await prisma.user.delete({ where: { id } });
};

export const readEmail = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({ select: { id: true }, where: { email: email } });
  return user ? false : true;
};
