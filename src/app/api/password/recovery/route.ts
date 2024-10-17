import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';
import {initializeDb} from "@/lib";

initializeDb();

export async function POST(request: Request) {
    const { email } = await request.json();
    const db = await openDb();

    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
        return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    const resetToken = Math.random().toString(36).substring(2); // Token simples para teste


    await db.run('UPDATE users SET resetToken = ? WHERE email = ?', [resetToken, email]);

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    console.log(`Password reset link: ${resetLink}`); // Simula envio por e-mail

    return NextResponse.json({ message: 'Recovery link sent to email' });
}
