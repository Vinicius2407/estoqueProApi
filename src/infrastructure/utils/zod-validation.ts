import z from "zod";

export async function validateWithZod<T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> {
    const result = await schema.safeParseAsync(data);
    if (!result.success) {
        throw new Error(`Validação falhou: ${result.error.issues.map(issue => issue.message).join(", ")}`);
    }
    return result.data;
}