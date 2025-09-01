import { FastifyRequest } from "fastify";
import { CreateCategory } from "@/core/application/use-cases/category/CreateCategory";
import { CategoryDuplicateError } from "@/core/domain/errors/CategoryError";
import { validateWithZod } from "@/infrastructure/utils/zod-validation";
import { conflict, created, ok } from "@/infrastructure/driving/http/Http";
import { createCategorySchema } from "@/infrastructure/driving/http/controllers/category/CategorySchema";
import { GetCategoryById } from "@/core/application/use-cases/category/GetCategoryById";
import { GetCategoryByName } from "@/core/application/use-cases/category/GetCategoryByName";

export class CategoryController {
    constructor(
        private readonly createCategoryUseCase: CreateCategory,
        private readonly getCategoryByIdUseCase: GetCategoryById,
        private readonly getCategoryByNameUseCase: GetCategoryByName
    ) { }
    async create({ body }: FastifyRequest) {
        if (!body) return conflict({ message: "Objeto de cadastro obrigatório" });

        if (typeof body !== typeof createCategorySchema) return conflict({ message: "Objeto enviado é invalido para cadastro!" });

        try {
            const { name } = await validateWithZod(createCategorySchema, body);

            var category = await this.createCategoryUseCase.execute({ name });
            return created({ category });
        } catch (error) {
            if (error instanceof CategoryDuplicateError) {
                return conflict({ message: error.message });
            }

            throw error;
        }
    }

    async getById({ params }: FastifyRequest) {
        if (!params) return conflict({ message: "ID da categoria obrigatório" });

        const { id } = params as { id: string };

        var category = await this.getCategoryByIdUseCase.execute({ id: Number(id) });

        return ok({ category });
    }

    async getByName({ query }: FastifyRequest) {
        if (!query) return conflict({ message: "Nome da categoria obrigatório" });

        const { name } = query as { name: string };

        var categories = await this.getCategoryByNameUseCase.execute({ name });

        return ok({ categories });
    }

}
