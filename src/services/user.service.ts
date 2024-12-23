import { api } from "@/utils/api/api";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";

class UserService {
  async login(username: string, password: string) {
    try {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch ((error.response?.data as any)?.detail) {
          case "Wrong user or password.":
            toast({
              title: "Authorization error",
              description: "Login or password is incorrect. Please try again.",
              variant: "destructive",
            });
            break;

          case "User is no activated. Please check your email.":
            toast({
              title: "Account is not activated",
              description: "Check your email for activation.",
              variant: "default",
            });
            break;
        }
      }
      return Promise.reject(error);
    }
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

  async register(username: string, email: string, password: string) {
    const response = await api.post("/users/register", {
      username,
      email,
      password,
    });

    return response;
  }

  async verifyActivationToken(activationToken: string) {
    const response = await api
      .post("/users/account/activation", null, {
        params: { activation_token: activationToken },
        headers: { "Content-Type": "application/json" },
      })
      .then((data) => data.data)
      .catch((error) => {
        console.error(error.response?.data);
        throw new Error(error.response?.data?.detail || "Unknown error");
      });

    return response;
  }
}

export const userService = new UserService();
