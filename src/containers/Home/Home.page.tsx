"use client";

import React, { useEffect, useState } from "react";
import { UsersTable } from "@/containers/Home/components/UsersTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUserService } from "@/hooks/useUserService";
import { Spinner } from "@/components/ui/spinner";
import {CreateUserModal} from "@/containers/Home/components/CreateUserModal";

export function HomePage() {
  const { fetchUsers, loading } = useUserService();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUserCount(data.length))
      .catch((err) => console.error(err));
  }, [fetchUsers]);

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Bem-vindo!</h1>
          <p className="text-gray-500">Aqui está um resumo dos usuários cadastrados.</p>
        </div>
        <CreateUserModal/>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold">Total de Usuários</h2>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-center">
            {loading ? <Spinner /> : userCount}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold">Usuários Ativos</h2>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-center">
            {loading ? <Spinner /> : Math.floor(userCount * 0.8)} {/* Simulação */}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <h2 className="text-xl font-semibold">Novos Usuários</h2>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-center">
            {loading ? <Spinner /> : Math.floor(userCount * 0.2)} {/* Simulação */}
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Lista de Usuários</h2>
        <UsersTable />
      </section>
    </div>
  );
}
