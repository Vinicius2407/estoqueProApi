import z from "zod";

import { IJWT } from "../../ports/out/jwt/IJWT";
import { IUserRepository } from "../../ports/out/user/IUserRepository";
import { IUseCase } from "../IUseCase";
import { validateWithZod } from "../utils/zod-validation";
import { IPasswordHasher } from "../../ports/out/password-hasher/IPasswordHasher";

const signInSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

type SignInInput = z.infer<typeof signInSchema>;

export class SignIn implements IUseCase<SignInInput, string> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwt: IJWT,
        private readonly passwordHasher: IPasswordHasher
    ){}

    async execute(signInData: SignInInput): Promise<string> {
        const data = await validateWithZod(signInSchema, signInData);
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new Error("Email ou senha inválidos.");
        }

        const isPasswordValid = await this.passwordHasher.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Email ou senha inválidos.");
        }

        const token = this.jwt.hash(user.id.toString());

        return token;
    }
}