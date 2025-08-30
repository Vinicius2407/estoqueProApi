import { like } from "drizzle-orm";

import { ICategoryRepository } from "../../../../../core/application/ports/out/repositories/category/ICategoryRepository";
import { Pagination } from "../../../../../core/application/ports/out/repositories/IRepository";
import { RepositoryError } from "../../../../../core/domain/errors/RepositoryError";
import { Category } from "../../../../../core/domain/models/Category";
import { db } from "../../database/drizzle";
import { categoryTable } from "../../database/drizzle/schema";

export class CategoryRepository implements ICategoryRepository {
    async findByName(name: string): Promise<Category[] | null> {
        try {
            const categories = await db.query.categoryTable.findMany({
                where: like(categoryTable.name, name),
            });

            if (categories.length === 0) {
                return null;
            }
            return categories.map((cat) => Category.recreate(cat.id, cat.name));
        } catch (error) {
            throw new RepositoryError("Erro ao buscar categoria por nome: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async create(item: Category): Promise<Category> {
        try {
            const [categoryDb] = await db
                .insert(categoryTable)
                .values({
                    name: item.name,
                })
                .returning();
            return Category.recreate(categoryDb.id, categoryDb.name);
        } catch (error) {
            throw new RepositoryError("Erro ao criar categoria: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    update(item: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }
    findAll(filter: { itemPerPage: number; page: number }): Promise<Pagination<Category>> {
        throw new Error("Method not implemented.");
    }
}
