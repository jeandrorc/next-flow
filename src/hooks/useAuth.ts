"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserFromStorage, logout as logoutAction } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useUserService } from "./useUserService";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { login: loginService, error } = useUserService();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      dispatch(setUserFromStorage({ user: JSON.parse(storedUser), token }));
    } else {
      dispatch(logoutAction());
    }
    setLoading(false);
  }, [dispatch]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { user, token } = await loginService(email, password);
        dispatch(setUserFromStorage({ user, token }));
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/");
      } catch (err) {
        console.error("Erro ao logar:", err);
        throw err;
      }
    },
    [dispatch, loginService, router]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.replace("/login");
  }, [dispatch, router]);

  return { isAuthenticated, user, login, logout, loading, error };
}
