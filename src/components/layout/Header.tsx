import React from 'react';
import {Container} from "@/components/layout/Container";

export function Header() {
  return <div className="bg-gray-800 text-gray-200 border-b-amber-600 border-b-2 h-[70px] flex flex-row content-center items-center gap-2 pl-3 pr-3">
      <Container>
          <h1 className="text-2xl font-bold">MOVIES</h1>
      </Container>
  </div>
}