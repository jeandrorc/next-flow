"use client";

import { useState, useCallback } from "react";
import { requestPasswordRecovery, resetPassword } from "@/lib/passwordService";

interface UsePasswordService {
  loading: boolean;
  error: string | null;
  requestRecovery: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

export function usePasswordService(): UsePasswordService {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(async (request: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await request();
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestRecovery = useCallback(
    async (email: string) => {
      await handleRequest(() => requestPasswordRecovery(email));
    },
    [handleRequest]
  );

  const resetPasswordHandler = useCallback(
    async (token: string, newPassword: string) => {
      await handleRequest(() => resetPassword(token, newPassword));
    },
    [handleRequest]
  );

  return {
    loading,
    error,
    requestRecovery,
    resetPassword: resetPasswordHandler,
  };
}
