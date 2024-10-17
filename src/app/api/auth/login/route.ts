// app/api/auth/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {initializeDb, openDb} from "@/lib";

initializeDb();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const db = await openDb();

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado.' }, { status: 404 });
    }

    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Senha inválida.' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login bem-sucedido.', user, token: randomToken });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
