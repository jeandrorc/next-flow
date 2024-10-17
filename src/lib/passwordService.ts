// src/services/passwordService.ts

export async function requestPasswordRecovery(email: string) {
  const response = await fetch("/api/auth/password/recovery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Erro ao solicitar recuperação de senha.");
  }

  return response.json();
}

export async function resetPassword(token: string, newPassword: string) {
  const response = await fetch("/api/auth/password/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Erro ao redefinir senha.");
  }

  return response.json();
}
