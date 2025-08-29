import { UserAlreadyExistsError } from "../../../domain/errors/UserError";
import { User } from "../../../domain/models/User";
import { IPasswordHasher } from "../../ports/out/password-hasher/IPasswordHasher";
import { IUserRepository } from "../../ports/out/user/IUserRepository";
import { IUseCase } from "../IUseCase";
import { CreateUserInput } from "./CreateUserDTO";

export class CreateUser implements IUseCase<CreateUserInput, User> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
    ) {}

    async execute(userData: CreateUserInput): Promise<User> {
        if (await this.userRepository.findByEmail(userData.email)) {
            throw new UserAlreadyExistsError();
        }

        const password = await this.passwordHasher.hash(userData.password);

        const user = new User({
            ...userData,
            password,
        });

        await this.userRepository.create(user);

        return user;
    }
}
