import { UserAlreadyExistsError } from "../../../domain/errors/UserError";
import { User } from "../../../domain/models/User";
import { IPasswordHasher } from "../../ports/out/password-hasher/IPasswordHasher";
import { IUserRepository } from "../../ports/out/repositories/user/IUserRepository";
import { IUseCase } from "../IUseCase";
import { CreateUserInput, CreateUserOutput } from "./CreateUserDTO"; // Importando o DTO de saída

export class CreateUser implements IUseCase<CreateUserInput, CreateUserOutput> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
    ) { }

    async execute(userData: CreateUserInput): Promise<CreateUserOutput> {
        if (await this.userRepository.findByEmail(userData.email)) {
            throw new UserAlreadyExistsError();
        }

        const user = await User.create(userData, this.passwordHasher);

        try {
            await this.userRepository.create(user);
        } catch (error) {
            throw error;
        }

        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
        };
    }
}
