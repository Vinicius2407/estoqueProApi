export class Pagination<T> {
    itemPerPage: number;
    page: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    items: T[];

    getHasNextPage(): boolean {
        return this.page < this.totalPages;
    }

    getHasPreviousPage(): boolean {
        return this.page > 1;
    }

    constructor(
        itemPerPage?: number,
        page?: number,
        totalItems?: number,
        totalPages?: number,
        items?: T[],
    ) {
        this.itemPerPage = itemPerPage ?? 0;
        this.page = page ?? 0;
        this.totalItems = totalItems ?? 0;
        this.totalPages = totalPages ?? 0;
        this.hasNextPage = this.getHasNextPage();
        this.hasPreviousPage = this.getHasPreviousPage();
        this.items = items ?? [];
    }
}


export interface IRepository<T> {
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: number): Promise<void>;
    findById(id: number): Promise<T | null>;
    findAll(filter: { itemPerPage: number, page: number }): Promise<Pagination<T>>;
}