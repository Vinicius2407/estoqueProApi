import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@/core/application/ports/out/repositories/category/ICategoryRepository";
import { IUseCase } from "@/core/application/use-cases/IUseCase";
import { CreateCategoryInput, CreateCategoryOutput } from "@/core/application/use-cases/category/CreateCategoryDTO";
import { CategoryDuplicateError } from "@/core/domain/errors/CategoryError";
import { RepositoryError } from "@/core/domain/errors/RepositoryError";
import { Category } from "@/core/domain/models/Category";

@injectable()
export class CreateCategory implements IUseCase<CreateCategoryInput, CreateCategoryOutput> {
    constructor(@inject("CategoryRepository") private readonly categoryRepository: ICategoryRepository) {}

    async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
        try {
            if ((await this.categoryRepository.findByName(input.name)) != null) throw new CategoryDuplicateError(`${input.name}`);

            let category = Category.create(input.name);

            const newCategory = await this.categoryRepository.create(category);

            category = Category.recreate(newCategory.id, newCategory.name);

            return {
                id: category.id,
                name: category.name,
            };
        } catch (error) {
            if (error instanceof RepositoryError || error instanceof CategoryDuplicateError) {
                throw error;
            }

            throw new RepositoryError("Erro ao criar categoria: " + (error instanceof Error ? error.message : String(error)));
        }
    }
}
