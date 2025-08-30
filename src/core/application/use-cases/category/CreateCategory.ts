import { RepositoryError } from "../../../domain/errors/RepositoryError";
import { Category } from "../../../domain/models/Category";
import { ICategoryRepository } from "../../ports/out/repositories/category/ICategoryRepository";
import { IUseCase } from "../IUseCase";
import { CreateCategoryInput, CreateCategoryOutput } from "./CreateCategoryDTO";

export class CreateCategory implements IUseCase<CreateCategoryInput, CreateCategoryOutput> {
    constructor(
        private readonly categoryRepository: ICategoryRepository,
    ) { }
    async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
        try {
            const category = Category.create(input.name);

            await this.categoryRepository.create(category);

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