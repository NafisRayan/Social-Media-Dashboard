"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus } from "lucide-react";

type User = {
  id: string;
  name: string;
  role: "admin" | "editor" | "viewer";
  email: string;
  status: "active" | "invited" | "suspended";
};

const demoUsers: User[] = [
  { id: "1", name: "Alice", role: "admin", email: "alice@email.com", status: "active" },
  { id: "2", name: "Bob", role: "editor", email: "bob@email.com", status: "active" },
  { id: "3", name: "Charlie", role: "viewer", email: "charlie@email.com", status: "invited" },
  { id: "4", name: "Dana", role: "editor", email: "dana@email.com", status: "suspended" },
];

export function UsersSection() {
  const [users] = useState<User[]>(demoUsers);

  // Placeholder CRUD handlers
  const handleAdd = () => {};
  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <Button onClick={handleAdd}>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{user.name} ({user.role})</span>
                <span
                  className={
                    user.status === "active"
                      ? "text-green-600"
                      : user.status === "invited"
                      ? "text-blue-600"
                      : "text-red-600"
                  }
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">                <span>{user.email}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleEdit}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
