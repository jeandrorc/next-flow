import React from "react";
import { Container } from "@/components/layout/Container";
import {User} from "@/components/layout/User";

export function Header() {
  return (
    <header className="bg-primary text-white h-[70px] flex items-center shadow-md w-screen">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-wide">NextFlow</h1>
          <nav className="flex items-center gap-6">
            <a href="/" className="hover:text-amber-300 transition-colors">
              Home
            </a>
            <a href="/cadastro"
               className="hover:text-amber-300 transition-colors">
              Cadastro
            </a>
            <a href="/login" className="hover:text-amber-300 transition-colors">
              Login
            </a>
            <a href="/recuperar-senha" className="hover:text-amber-300 transition-colors">
              Recuperar Senha
            </a>
            <User />
          </nav>
        </div>
      </Container>
    </header>
  );
}
