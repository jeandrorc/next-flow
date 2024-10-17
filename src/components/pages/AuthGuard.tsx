"use client";

import { useEffect, ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/ui/progress-bar";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login"); // Redirecionar se não estiver autenticado
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <ProgressBar />; // Exibe uma barra de progresso enquanto carrega
  }

  return <>{isAuthenticated ? children : null}</>;
}
