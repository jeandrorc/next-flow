// Interface para criação de usuário
import {CreateUserPayload, User} from "@/models/User";

// Serviço para criar um usuário
export async function createUser(payload: CreateUserPayload) {
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Erro ao criar usuário.');
    }

    return response.json();
}

// Serviço para listar usuários
export async function listUsers() : Promise<User[]> {
    const response = await fetch('/api/users');

    if (!response.ok) {
        throw new Error('Erro ao listar usuários.');
    }

    return response.json();
}

// Serviço de login (autenticação)
export async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Erro ao autenticar.');
    }

    return response.json();
}
