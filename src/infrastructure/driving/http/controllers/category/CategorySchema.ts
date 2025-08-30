import z from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
