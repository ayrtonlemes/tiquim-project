import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { UserDto } from "../user/user.types";
import { LoginDto } from "./auth.types";

const prisma = new PrismaClient();

export const checkCredentials = async (credentials: LoginDto): Promise<UserDto | null> => {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  if (!user) return null;
  const ok = await compare(credentials.password, user.password);
  if (!ok) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    userTypeId: user.userTypeId,
    avatarUrl: user.avatarUrl,
    city: user.city,
    state: user.state,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
