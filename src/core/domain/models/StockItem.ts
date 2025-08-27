export class StockItem {
    id: number;
    color: string | undefined;
    size: string | undefined;
    quantity: number;
    sku: string | undefined;
    createdAt: Date;

    constructor(
        id: number = 0,
        createdAt: Date,
        color?: string,
        size?: string,
        quantity: number = 0,
        sku?: string,
    ) {
        this.id = id;
        this.color = color;
        this.size = size;
        this.quantity = quantity;
        this.sku = sku;
        this.createdAt = createdAt;
    }
}