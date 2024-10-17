"use client";

import React, { useEffect, useState } from "react";
import { useUserService } from "@/hooks/useUserService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { User } from "@/models/User";
import {Card} from "@/components/ui";

const ITEMS_PER_PAGE = 10;

export function UsersTable() {
  const { fetchUsers, loading, error } = useUserService();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, [fetchUsers]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48 text-red-500">
        Erro ao carregar usuários: {error}
      </div>
    );
  }

  return (
    <Card className="overflow-auto shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4">
        <span className="text-sm text-gray-600">
          Total de Registros: {users.length}
        </span>
        {totalPages > 1 && (
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        )}
      </div>

      <Table className="w-full text-sm text-left text-gray-500">
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Endereço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-100">
              <TableCell className="font-medium text-gray-900">
                {user.fullName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.street} {user.number}, {user.city} - {user.state}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
