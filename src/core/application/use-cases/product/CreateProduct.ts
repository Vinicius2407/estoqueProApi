import { IUseCase } from "../IUseCase";
import { CreateProductInput, CreateProductOutput } from "./CreateProductDTO";

export class CreateProduct implements IUseCase<CreateProductInput, CreateProductOutput> {
    execute(input: CreateProductInput): Promise<CreateProductOutput> {
        throw new Error("Method not implemented.");
    }
}