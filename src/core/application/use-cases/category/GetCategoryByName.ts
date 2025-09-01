
import { RepositoryError } from "@/core/domain/errors/RepositoryError";
import { ICategoryRepository } from "@/core/application/ports/out/repositories/category/ICategoryRepository";
import { IUseCase } from "@/core/application/use-cases/IUseCase";
import { GetCategoryInput, GetCategoryOutput } from "@/core/application/use-cases/category/GetCategoryByIdDTO";

export class GetCategoryByName implements IUseCase<GetCategoryInput, GetCategoryOutput[]> {
    constructor(private readonly categoryRepository: ICategoryRepository) {}
    async execute({ name }: GetCategoryInput): Promise<GetCategoryOutput[]> {
        try {
            const category = await this.categoryRepository.findByName(name!);

            if (!category) {
                return [] as GetCategoryOutput[];
            }

            return category;
        } catch (error) {
            if (error instanceof RepositoryError) {
                throw error;
            }
            throw new RepositoryError("Erro ao criar categoria: " + (error instanceof Error ? error.message : String(error)));
        }
    }
}
