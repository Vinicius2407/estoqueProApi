import { InvalidCredentialsError, UserNotFoundError } from "../../../domain/errors/UserError";
import { IJWT } from "../../ports/out/jwt/IJWT";
import { IPasswordHasher } from "../../ports/out/password-hasher/IPasswordHasher";
import { IUserRepository } from "../../ports/out/repositories/user/IUserRepository";
import { IUseCase } from "../IUseCase";
import { SignInInput, SignInOutput } from "./SignInDTO";

export class SignIn implements IUseCase<SignInInput, SignInOutput> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwt: IJWT,
        private readonly passwordHasher: IPasswordHasher,
    ) {}

    async execute(signInData: SignInInput): Promise<SignInOutput> {
        // 1. Lógica de Aplicação: encontrar o usuário
        const user = await this.userRepository.findByEmail(signInData.email);

        if (!user) {
            throw new UserNotFoundError();
        }

        // 2. Delegar a comparação da senha para o Modelo de Domínio
        const isPasswordValid = await user.comparePassword(signInData.password, this.passwordHasher);

        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        // 3. Lógica de Aplicação: gerar o token de acesso
        const token = this.jwt.hash(user.id.toString());

        const response: SignInOutput = {
            accessToken: token,
        };

        return response;
    }
}
