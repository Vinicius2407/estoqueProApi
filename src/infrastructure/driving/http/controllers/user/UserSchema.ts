import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
    telephone: z.string().min(10, "Telefone inválido"),
    document: z.string().min(11, "Documento inválido"),
    active: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;


export const signInSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

export type SignInInput = z.infer<typeof signInSchema>;