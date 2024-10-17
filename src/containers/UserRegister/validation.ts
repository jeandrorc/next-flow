import { z } from "zod";

const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

export const formSchema = z.object({
  fullName: z
    .string()
    .min(2, 'O nome precisa ter pelo menos 2 caracteres.')
    .max(50, 'O nome não pode ultrapassar 50 caracteres.'),

  email: z
    .string()
    .email('Por favor, informe um e-mail válido.'),

  postalCode: z
    .string()
    .regex(cepRegex, "Informe um CEP válido, no formato 12345-678.")
    .min(8, "O CEP deve ter 8 caracteres.")
    .max(9, "O CEP pode ter no máximo 9 caracteres, incluindo o hífen."),

  street: z
    .string()
    .min(2, 'O nome da rua precisa ter pelo menos 2 caracteres.')
    .max(50, 'O nome da rua não pode ultrapassar 50 caracteres.'),

  number: z
    .string()
    .min(1, 'Informe o número do endereço.')
    .max(10, 'O número não pode ultrapassar 10 caracteres.'),

  city: z
    .string()
    .min(2, 'O nome da cidade precisa ter pelo menos 2 caracteres.')
    .max(50, 'O nome da cidade não pode ultrapassar 50 caracteres.'),

  state: z
    .string()
    .min(2, 'O nome do estado precisa ter pelo menos 2 caracteres.')
    .max(50, 'O nome do estado não pode ultrapassar 50 caracteres.'),

  neighborhood: z
    .string()
    .min(2, 'O nome do bairro precisa ter pelo menos 2 caracteres.')
    .max(50, 'O nome do bairro não pode ultrapassar 50 caracteres.'),

  password: z
    .string()
    .min(6, 'A senha precisa ter pelo menos 6 caracteres.')
    .max(50, 'A senha não pode ultrapassar 50 caracteres.'),

  passwordConfirmation: z
    .string()
    .min(6, 'A confirmação da senha precisa ter pelo menos 6 caracteres.')
    .max(50, 'A confirmação da senha não pode ultrapassar 50 caracteres.')
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'As senhas não conferem.',
  path: ['passwordConfirmation'],
});
