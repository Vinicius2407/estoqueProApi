import { CreateCategory } from "../../core/application/use-cases/category/CreateCategory";
import { CategoryRepository } from "../../infrastructure/driven/persistence/repositories/drizzle/CategoryRepository";
import { CategoryController } from "../../infrastructure/driving/http/controllers/category/CategoryController";

export class InitializeCategory {
    constructor() {
        const categoryRepository = new CategoryRepository();
        const createCategoryUseCase = new CreateCategory(categoryRepository);
        const categoryController = new CategoryController(createCategoryUseCase);

        return { categoryController };
    }
}