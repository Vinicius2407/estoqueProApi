import { Product } from "../../../../../domain/models/Product";
import { IRepository } from "../IRepository";

export interface IProductRepository extends IRepository<Product> {}
