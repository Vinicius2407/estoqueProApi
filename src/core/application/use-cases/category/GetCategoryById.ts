import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@/core/application/ports/out/repositories/category/ICategoryRepository";
import { IUseCase } from "@/core/application/use-cases/IUseCase";
import { GetCategoryInput, GetCategoryOutput } from "@/core/application/use-cases/category/GetCategoryDTO";
import { RepositoryError } from "@/core/domain/errors/RepositoryError";
import { CategoryRepository } from "@/infrastructure/driven/persistence/repositories/drizzle/CategoryRepository";

@injectable()
export class GetCategoryById implements IUseCase<GetCategoryInput, GetCategoryOutput> {
    constructor(
        @inject("CategoryRepository") private readonly categoryRepository: ICategoryRepository
    ) { }

    async execute({ id }: GetCategoryInput): Promise<GetCategoryOutput> {
        try {
            const category = await this.categoryRepository.findById(id!);

            if (!category) {
                return {} as GetCategoryOutput;
            }

            return {
                id: category.id,
                name: category.name,
            };
        } catch (error) {
            if (error instanceof RepositoryError) {
                throw error;
            }
            throw new RepositoryError("Erro ao criar categoria: " + (error instanceof Error ? error.message : String(error)));
        }
    }
}
