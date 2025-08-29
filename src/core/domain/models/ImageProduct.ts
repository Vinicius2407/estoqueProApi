import { ImageStatus } from "../enum/ImageStatus";
import { Product } from "./Product";

export class ImageProduct {
    id: number;
    productId: number;
    Product: Product | undefined;
    inputFileKey: string;
    status: ImageStatus;

    constructor(id: number = 0, productId: number, inputFileKey: string, status: ImageStatus, Product?: Product) {
        this.id = id;
        this.productId = productId;
        this.inputFileKey = inputFileKey;
        this.status = status;
        this.Product = Product;
    }
}
