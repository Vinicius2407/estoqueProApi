
export interface IRepository<T> {
    create(item: T): Promise<T>;
    update(item: T): Promise<void>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<T | null>;
    findAll(): Promise<T[]>;
}