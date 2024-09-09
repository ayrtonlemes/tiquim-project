import User, { Credentials } from "../types/user";
import api from "./api";

export async function getLogged(): Promise<string> {
  return api.post("/auth/logged").then((response) => response.data);
}

export async function logout(): Promise<string> {
  return api.post("/auth/logout").then((response) => response.data);
}

export async function login(credentials: Credentials): Promise<User> {
  return api.post("/auth/login", credentials).then((response) => response.data);
}
