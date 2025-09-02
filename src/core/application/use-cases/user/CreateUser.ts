import { UserAlreadyExistsError } from "@/core/domain/errors/UserError";
import { User } from "@/core/domain/models/User";
import { IPasswordHasher } from "@/core/application/ports/out/password-hasher/IPasswordHasher";
import { IUserRepository } from "@/core/application/ports/out/repositories/user/IUserRepository";
import { IUseCase } from "@/core/application/use-cases/IUseCase";
import { CreateUserInput, CreateUserOutput } from "@/core/application/use-cases/user/CreateUserDTO"; // Importando o DTO de saída
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateUser implements IUseCase<CreateUserInput, CreateUserOutput> {
    constructor(
        @inject("UserRepository") private readonly userRepository: IUserRepository,
        @inject("PasswordHasher") private readonly passwordHasher: IPasswordHasher,
    ) {}

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
