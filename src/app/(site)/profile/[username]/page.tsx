"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container/Container";
import { api } from "@/utils/api/api";
import { useUser } from "@/lib/context/UserContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

export interface Users {
  users: User[];
}

interface ProfilePagePropsType {
  params: {
    username: string;
  };
}

const ProfilePage: React.FC<ProfilePagePropsType> = ({
  params: { username },
}) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const { user, logout } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      try {
        setIsLoading(true);
        const response = await api.get<Users>(`/users/?username=${username}`);
        setUserInfo(response.data.users[0]);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordChange = async (data: z.infer<typeof formSchema>) => {
    try {
      await api.post("/users/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      alert("Password changed successfully!");
      setIsChangingPassword(false);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to change password. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <Container className="flex flex-col gap-4 flex-1 justify-center py-4 bg-gray-900 rounded-lg border border-black md:justify-start">
      <div className="flex flex-row p-6 text-white">
        {user && userInfo && user.id === userInfo.id ? (
          <div className="flex gap-4">
            <div className="relative h-[200px] w-[200px] rounded-full overflow-hidden bg-gray-200">
              <Link
                href={`/profile/${user.username}`}
                className="relative block w-full h-full"
              >
                <Image
                  src={userInfo.avatar}
                  alt="User avatar"
                  fill={true}
                  sizes="15vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
            <div className="space-y-4">
              <div className="text-3xl">{user.username}</div>
              <div>{user.email}</div>
              {isChangingPassword ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handlePasswordChange)}
                    className="space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>
                          <FormControl>
                            <Input
                              id="currentPassword"
                              type="password"
                              placeholder="Enter your old password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="newPassword">New Password</Label>
                          <FormControl>
                            <Input
                              id="newPassword"
                              type="password"
                              placeholder="Enter your new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="confirmPassword">
                            Confirm New Password
                          </Label>
                          <FormControl>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="Confirm your new password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="border border-white px-4"
                      >
                        Save
                      </Button>
                      <Button
                        type="button"
                        className="border border-white px-4"
                        onClick={() => {
                          setIsChangingPassword(false);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <Button
                  className="border border-white rounded-lg px-2"
                  onClick={() => setIsChangingPassword(true)}
                >
                  Change password
                </Button>
              )}
              <div>
                <Button
                  className="border border-white rounded-lg px-2"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="relative h-[200px] w-[200px] rounded-full overflow-hidden bg-gray-200">
              <Link
                href={`/profile/${userInfo.username}`}
                className="relative block w-full h-full"
              >
                <Image
                  src={userInfo.avatar}
                  alt="User avatar"
                  fill={true}
                  sizes="15vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
            <div className="text-3xl">{userInfo.username}</div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProfilePage;
