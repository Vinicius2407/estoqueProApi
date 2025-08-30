import { Category } from "./Category";

export class Product {
    id: number;
    name: string = "";
    description: string = "";
    basePrice: number = 0;
    categoryId: number = 0;
    Category: Category | undefined;
    createdAt: Date;

    constructor(props: Omit<Product, "id" | "createdAt" | "Category">, createdAt: Date, id?: number, Category?: Category) {
        Object.assign(this, props);
        this.createdAt = createdAt;
        this.Category = Category;
        this.id = id ?? 0;
    }
}
