import { CreateUser } from "../../core/application/use-cases/user/CreateUser";
import { SignIn } from "../../core/application/use-cases/user/SignIn";
import { UserRepository } from "../../infrastructure/driven/persistence/repositories/drizzle/UserRepository";
import { JWTToken } from "../../infrastructure/driven/services/JWTToken";
import { PasswordHasher } from "../../infrastructure/driven/services/PasswordHasher";

export class InitializeUser {
    static userController() {
        const passwordHashed = new PasswordHasher();
        const userRepository = new UserRepository();
        const createUserUseCase = new CreateUser(userRepository, passwordHashed);
        const signInUseCase = new SignIn(userRepository, new JWTToken(), passwordHashed);
        return { createUserUseCase, signInUseCase };
    }
}