import User, { UserDto } from "../types/user";
import api, { api_base } from "./api";

export async function getUser(id: string): Promise<User> {
  return api.get(`/user/${id}`).then((response) => response.data);
}

export async function signup(user: UserDto, file: File | null): Promise<string> {
  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("city", user.city);
  formData.append("state", user.state);

  if (file) {
    formData.append("avatarImage", file);
  }

  return api
    .post("/user/?userType=CLIENT", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export async function updateUser(id: string, user: UserDto, file: File | null): Promise<string> {
  const formData = new FormData();

  formData.append("name", user.name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("city", user.city);
  formData.append("state", user.state);
  formData.append("avatarUrl", user.avatarUrl);

  if (file) {
    formData.append("avatarImage", file);
  }

  return api
    .put(`/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
}

export async function getEmail(email: string): Promise<boolean> {
  return api.get(`/user/check/${email}`).then((response) => response.data);
}

export async function getAvatarUser(url: string): Promise<string> {
  const response = await api_base.get(`uploads/user/${url}`, {
    responseType: "blob",
  });

  const imageUrl = URL.createObjectURL(response.data);
  return imageUrl;
}
