import { CreateCategory } from "../../../../../core/application/use-cases/category/CreateCategory";
import { CategoryDuplicateError } from "../../../../../core/domain/errors/CategoryError";
import { validateWithZod } from "../../../../utils/zod-validation";
import { conflict, created } from "../../Http";
import { createCategorySchema } from "./CategorySchema";

export class CategoryController {
    constructor(private readonly createCategoryUseCase: CreateCategory) { }
    async create(body: any) {
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
}