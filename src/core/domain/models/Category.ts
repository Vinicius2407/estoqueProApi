export class Category {
    id: number;
    name: string;

    constructor(id: number = 0, name: string) {
        this.id = id;
        this.name = name;
    }

    public static create(name: string, id?: number): Category {
        if (!name || name.length < 3) {
            throw new Error("Nome da categoria deve ter pelo menos 3 caracteres.");
        }
        return new Category(id, name);
    }

    public static recreate(id: number, name: string): Category {
        return new Category(id, name);
    }
}
