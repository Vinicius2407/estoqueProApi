import { compare, hash } from "bcryptjs";
import { IPasswordHasher } from "../../../core/application/ports/out/password-hasher/IPasswordHasher";

export class PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        const hashedPassword = hash(password, 8);
        return hashedPassword;
    }
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await compare(password, hashedPassword);
        return isMatch;
    }
}
