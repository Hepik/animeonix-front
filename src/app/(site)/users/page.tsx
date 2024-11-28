"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/shared/Container/Container";
import { api } from "@/utils/api/api";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface UsersResponse {
  users: User[];
  total: number;
}

const fetchUsers = async (page: number, limit: number, username: string) => {
  const query = username ? `&username=${username}` : "";
  const response = await api.get<UsersResponse>(
    `/users?page=${page}&limit=${limit}${query}`
  );
  return response.data;
};

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [usernameFilter, setUsernameFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const debouncedUsernameFilter = useDebounce(usernameFilter, 300);

  const { data, isLoading, refetch } = useQuery<UsersResponse>({
    queryKey: ["users", page, debouncedUsernameFilter],
    queryFn: () => fetchUsers(page, limit, debouncedUsernameFilter),
    staleTime: 5000,
  });

  useEffect(() => {
    refetch();
  }, [debouncedUsernameFilter, page, refetch]);

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    try {
      await api.patch(`/users/${selectedUser.id}`, {
        username: selectedUser.username,
        email: selectedUser.email,
        role: selectedUser.role,
      });
      alert("User updated successfully");
      setSelectedUser(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${id}`);
        alert("User deleted successfully.");
        window.location.reload();
      } catch (error) {
        console.error(error);
        alert("Failed to delete user.");
      }
    }
  };

  const columns: ColumnDef<User>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => handleEdit(row.original)}
            className="flex items-center gap-1 px-2 text-black dark:text-white"
          >
            <Pencil /> Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
            className="flex items-center gap-1 px-2"
          >
            <Trash2 /> Delete
          </Button>
        </div>
      ),
    },
  ];

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page > 4 && page < totalPages - 3) {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      } else {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col space-y-4 text-white">
      <Container className="flex flex-col gap-4 flex-1 py-4 bg-gray-900 rounded-lg border border-black">
        <div className="flex space-x-4">
          <h1 className="text-xl font-bold text-white">Users Table</h1>
          <Input
            id="username"
            className="w-[30%]"
            placeholder="Enter username"
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
          />
        </div>
        {!isLoading ? (
          <>
            <DataTable columns={columns} data={data?.users || []} />
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
                className="w-10 h-10 flex items-center justify-center bg-gray-500 text-black rounded-full hover:bg-white disabled:opacity-50"
              >
                ←
              </button>
              {generatePageNumbers().map((pageNum, index) =>
                typeof pageNum === "number" ? (
                  <button
                    key={index}
                    onClick={() => setPage(pageNum)}
                    disabled={pageNum === page}
                    className={`w-10 h-10 rounded-full ${
                      pageNum === page
                        ? "bg-white text-black"
                        : "bg-gray-500 text-black hover:bg-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                ) : (
                  <span key={index} className="px-2 py-2 text-gray-500">
                    {pageNum}
                  </span>
                )
              )}
              <button
                onClick={() =>
                  setPage((old) => (old < totalPages ? old + 1 : old))
                }
                disabled={page === totalPages}
                className="w-10 h-10 flex items-center justify-center bg-gray-500 text-black rounded-full hover:bg-white disabled:opacity-50"
              >
                →
              </button>
            </div>
          </>
        ) : (
          <p className="text-white">Loading users...</p>
        )}
      </Container>

      {selectedUser && (
        <Dialog open={true} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent>
            <DialogHeader>Edit User</DialogHeader>
            <div className="space-y-2">
              <div className="flex flex-col">
                <p>Username</p>
                <Input
                  id="username"
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                  placeholder="Enter username"
                />
              </div>
              <div className="flex flex-col">
                <p>Email</p>
                <Input
                  id="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col">
                <p>Role</p>
                <Input
                  id="role"
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                  placeholder="Enter role"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="px-2"
                variant="outline"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </Button>
              <Button className="px-2" onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UsersPage;
