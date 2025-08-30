export type CreateProductInput = {
    name: string;
    description: string;
    basePrice: number;
    categoryId: number;
};

export type CreateProductOutput = {
    id: number;
    name: string;
    description: string;
    basePrice: number;
    categoryId: number;
    createdAt: Date;
};
