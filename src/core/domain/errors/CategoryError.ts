
export class CategoryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CategoryError";
    }
}

export class CategoryDuplicateError extends CategoryError {
    constructor() {
        super("Já existe uma categoria com esse nome.");
        this.name = "CategoryDuplicateError";
    }
}

export class CategoryNotFoundError extends CategoryError {
    constructor() {
        super("Categoria não encontrada.");
        this.name = "CategoryNotFoundError";
    }
}