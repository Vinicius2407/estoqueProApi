import { User } from "../../../domain/models/User";
import { IRepository } from "../IRepository";

export interface IUserRepositoty extends IRepository<User> {
    findByEmailAndPassword(email: string, password: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}