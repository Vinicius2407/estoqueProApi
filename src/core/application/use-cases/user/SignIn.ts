import { InvalidCredentialsError, UserNotFoundError } from "../../../domain/errors/UserError";
import { IJWT } from "../../ports/out/jwt/IJWT";
import { IPasswordHasher } from "../../ports/out/password-hasher/IPasswordHasher";
import { IUserRepository } from "../../ports/out/user/IUserRepository";
import { IUseCase } from "../IUseCase";
import { SignInInput, SignInOutput } from "./SignInDTO";

export class SignIn implements IUseCase<SignInInput, SignInOutput> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwt: IJWT,
        private readonly passwordHasher: IPasswordHasher,
    ) {}

    async execute(signInData: SignInInput): Promise<SignInOutput> {
        const user = await this.userRepository.findByEmail(signInData.email);

        if (!user) {
            throw new UserNotFoundError();
        }

        const isPasswordValid = await this.passwordHasher.compare(signInData.password, user.password);

        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        const token = this.jwt.hash(user.id.toString());

        const response: SignInOutput = {
            accessToken: token,
        };

        return response;
    }
}
