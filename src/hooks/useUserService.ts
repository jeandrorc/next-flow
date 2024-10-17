import { useState, useCallback } from "react";
import { CreateUserPayload, User } from "@/models/User";
import { createUser, listUsers, login } from "@/lib/userService";

interface UseUserService {
  register: (payload: CreateUserPayload) => Promise<void>;
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  fetchUsers: () => Promise<User[]>;
  loading: boolean;
  error: string | null;
}

type RequestFunction<T> = () => Promise<T>;

export function useUserService(): UseUserService {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(
    async <T>(request: RequestFunction<T>): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const result = await request();
        return result;
      } catch (err) {
        setError((err as Error).message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (payload: CreateUserPayload) => {
      await handleRequest(() => createUser(payload));
    },
    [handleRequest]
  );

  const userLogin = useCallback(
    async (email: string, password: string) => {
      return await handleRequest(() => login(email, password));
    },
    [handleRequest]
  );

  const fetchUsers = useCallback(async () => {
    return await handleRequest(() => listUsers());
  }, [handleRequest]);

  return {
    register,
    login: userLogin,
    fetchUsers,
    loading,
    error,
  };
}
