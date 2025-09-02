import { inject, injectable } from "tsyringe";

import { IJWT } from "@/core/application/ports/out/jwt/IJWT";
import { IPasswordHasher } from "@/core/application/ports/out/password-hasher/IPasswordHasher";
import { IUserRepository } from "@/core/application/ports/out/repositories/user/IUserRepository";
import { IUseCase } from "@/core/application/use-cases/IUseCase";
import { SignInInput, SignInOutput } from "@/core/application/use-cases/user/SignInDTO";
import { InvalidCredentialsError, UserNotFoundError } from "@/core/domain/errors/UserError";

@injectable()
export class SignIn implements IUseCase<SignInInput, SignInOutput> {
    constructor(
        @inject("UserRepository") private readonly userRepository: IUserRepository,
        @inject("JWTToken") private readonly jwt: IJWT,
        @inject("PasswordHasher") private readonly passwordHasher: IPasswordHasher,
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
