import { NextResponse } from 'next/server';
import { openDb, initializeDb } from '@/lib';


initializeDb();

export async function GET() {
    const db = await openDb();
    const users = await db.all('SELECT * FROM users');
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const db = await openDb();
    const body = await request.json();

    const { fullName, email, password, street, neighborhood, number, city, state, postalCode } = body;

    try {
        await db.run(
            `INSERT INTO users (fullName, email, password, street, neighborhood, number, city, state, postalCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [fullName, email, password, street, neighborhood, number, city, state, postalCode]
        );
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.log("Error", error)
        return NextResponse.json({ error: 'User already exists or invalid data' }, { status: 500 });
    }
}
