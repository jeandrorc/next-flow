"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/hooks/useAuth";

export function User() {
  const { user, logout } = useAuth();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block font-semibold text-white">
            {user?.fullName || "Usuário"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-4 bg-white shadow-lg rounded-md">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="w-12 h-12">
            <AvatarFallback>{user?.fullName?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="font-semibold text-lg">{user?.fullName || "Usuário"}</h2>
            <p className="text-sm text-gray-500">{user?.email || "email@dominio.com"}</p>
          </div>
        </div>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
