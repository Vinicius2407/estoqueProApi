import { Category } from "./Category";

export class Product {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    categoryId: number;
    Category: Category | undefined;
    createdAt: Date;

    constructor(id: number = 0, name: string, description: string, basePrice: number, categoryId: number, createdAt: Date, Category?: Category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.basePrice = basePrice;
        this.categoryId = categoryId;
        this.createdAt = createdAt;
        this.Category = Category;
    }
}
