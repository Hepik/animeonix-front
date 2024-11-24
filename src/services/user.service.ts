import { api } from "@/utils/api/api";

class UserService {
  async login(username: string, password: string) {
    const response = await api
      .post<{
        access_token: string;
      }>(
        "/auth/token",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((data) => data.data);

    return response;
  }

  async getCurrentUser() {
    const response = await api
      .get<{
        User: {
          username: string;
          id: number;
          email: string;
          isActive: boolean;
          role: string;
          avatar: string;
        };
      }>("/users/current", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((resp) => resp.data);
    return response;
  }
}

export const userService = new UserService();
