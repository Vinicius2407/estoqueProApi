import { ProductError } from "../errors/ProductError";
import { Category } from "./Category";

type ProductCreationProps = {
    name: string;
    description: string;
    basePrice: number;
    categoryId: number;
}

type ProductProps = ProductCreationProps & {
    createdAt: Date;
    Category?: Category;
}

export class Product {
    id: number;
    name: string = "";
    description: string = "";
    basePrice: number = 0;
    categoryId: number = 0;
    Category: Category | undefined;
    createdAt: Date;

    private constructor(props: ProductProps, id?: number, Category?: Category) {
        this.name = props.name;
        this.description = props.description;
        this.basePrice = props.basePrice;
        this.categoryId = props.categoryId;
        this.createdAt = props.createdAt;
        this.Category = Category;
        this.id = id ?? 0;
    }

    public static create(props: ProductCreationProps, id?: number, Category?: Category): Product {
        // 1. Validação de Regras de Negócio (Invariantes)
        if (!props.name || props.name.length < 3) {
            throw new ProductError("Nome do produto deve ter pelo menos 3 caracteres.");
        }
        if (props.basePrice <= 0) {
            throw new ProductError("Preço base deve ser maior que zero.");
        }

        if (!props.categoryId || props.categoryId <= 0) {
            throw new ProductError("Categoria inválida.");
        }

        return new Product({ ...props, createdAt: new Date() }, id, Category);
    }

    public static recreate(props: ProductProps, id: number, Category?: Category): Product {
        return new Product({ ...props }, id, Category);
    }
}
