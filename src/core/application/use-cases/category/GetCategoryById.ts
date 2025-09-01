import { RepositoryError } from "@/core/domain/errors/RepositoryError";
import { ICategoryRepository } from "@/core/application/ports/out/repositories/category/ICategoryRepository";
import { IUseCase } from "@/core/application/use-cases/IUseCase";
import { GetCategoryByIdInput, GetCategoryByIdOutput } from "@/core/application/use-cases/category/GetCategoryByIdDTO";


export class GetCategoryById implements IUseCase<GetCategoryByIdInput, GetCategoryByIdOutput> {
    constructor(private readonly categoryRepository: ICategoryRepository) { }
    async execute({ id }: GetCategoryByIdInput): Promise<GetCategoryByIdOutput> {
        try {
            const category = await this.categoryRepository.findById(id);

            if (!category) {
                return {} as GetCategoryByIdOutput;
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