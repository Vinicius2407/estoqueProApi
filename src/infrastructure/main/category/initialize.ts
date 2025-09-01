import { CreateCategory } from "@/core/application/use-cases/category/CreateCategory";
import { GetCategoryById } from "@/core/application/use-cases/category/GetCategoryById";
import { CategoryRepository } from "@/infrastructure/driven/persistence/repositories/drizzle/CategoryRepository";
import { CategoryController } from "@/infrastructure/driving/http/controllers/category/CategoryController";

export class InitializeCategory {
    static categoryController() {
        const categoryRepository = new CategoryRepository();
        const createCategoryUseCase = new CreateCategory(categoryRepository);
        const getCategoryByIdUseCase = new GetCategoryById(categoryRepository);
        const categoryController = new CategoryController(createCategoryUseCase, getCategoryByIdUseCase);

        return categoryController;
    }
}
