import z from "zod";

import { User } from "../../../domain/models/User";
import { IPasswordHasher } from "../../repositories/password-hasher/IPasswordHasher";
import { IUserRepositoty } from "../../repositories/user/IUserRepository";
import { IUseCase } from "../IUseCase";

const createUserSchema = z.object({
    name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
    telephone: z.string().min(10, "Telefone inválido"),
    document: z.string().min(11, "Documento inválido"),
    active: z.boolean().optional(),
});

type CreateUserInput = z.infer<typeof createUserSchema>;

export class CreateUser implements IUseCase<CreateUserInput, User> {
    constructor(
        private readonly userRepository: IUserRepositoty,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async execute(userData: CreateUserInput): Promise<User> {
        const {success, error, data} = await createUserSchema.safeParseAsync(userData);

        if (!success) {
            throw new Error(`Validação falhou: ${error.issues.map(issue => issue.message).join(", ")}`);
        }

        if (await this.userRepository.findByEmail(data.email)) {
            throw new Error("Usuário com este email já existe.");
        }

        const password = await this.passwordHasher.hash(data.password);

        const user = new User(
            data.name,
            data.email,
            password,
            data.telephone,
            data.document,
            data.active ?? true
        ) 

        await this.userRepository.create(user);

        return user;
    }
}