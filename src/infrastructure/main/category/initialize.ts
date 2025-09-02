import { container } from "tsyringe";

import { CreateCategory } from "@/core/application/use-cases/category/CreateCategory";
import { GetCategoryById } from "@/core/application/use-cases/category/GetCategoryById";
import { GetCategoryByName } from "@/core/application/use-cases/category/GetCategoryByName";
import { CategoryRepository } from "@/infrastructure/driven/persistence/repositories/drizzle/CategoryRepository";
import { CategoryController } from "@/infrastructure/driving/http/controllers/category/CategoryController";

export class InitializeCategory {
    static categoryController() {
        container.register("CategoryRepository", { useClass: CategoryRepository });
        container.register("CreateCategory", { useClass: CreateCategory });
        container.register("GetCategoryById", { useClass: GetCategoryById });
        container.register("GetCategoryByName", { useClass: GetCategoryByName });

        return container.resolve(CategoryController);
    }
}
