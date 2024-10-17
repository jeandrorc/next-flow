import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function POST(request: Request) {
    const { token, newPassword } = await request.json();
    const db = await openDb();

    const user = await db.get('SELECT * FROM users WHERE resetToken = ?', [token]);
    if (!user) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    await db.run('UPDATE users SET password = ?, resetToken = NULL WHERE id = ?', [newPassword, user.id]);

    return NextResponse.json({ message: 'Password reset successfully' });
}
