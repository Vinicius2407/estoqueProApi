import { IPasswordHasher } from "../../application/ports/out/password-hasher/IPasswordHasher";
import { UserError } from "../errors/UserError";

type UserCreationProps = {
    name: string;
    email: string;
    password: string; // A senha em texto plano
    telephone: string;
    document: string;
    active?: boolean;
}

type UserProps = Omit<UserCreationProps, "password"> & {
    passwordHash: string;
}

export class User {
    public readonly id: number;
    public name: string;
    public readonly email: string;
    private passwordHash: string;
    public telephone: string;
    public readonly document: string;
    public active: boolean;

    private constructor(props: UserProps, id?: number) {
        this.id = id ?? 0;
        this.name = props.name;
        this.email = props.email;
        this.passwordHash = props.passwordHash;
        this.telephone = props.telephone;
        this.document = props.document;
        this.active = props.active ?? true;
    }

    public static async create(props: UserCreationProps, passwordHasher: IPasswordHasher, id?: number): Promise<User> {
        // 1. Validação de Regras de Negócio (Invariantes)
        if (!props.name || props.name.length < 3) {
            throw new UserError("Nome do usuário deve ter pelo menos 3 caracteres.");
        }
        if (!props.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(props.email)) {
            throw new UserError("E-mail inválido.");
        }
        if (!props.password || props.password.length < 6) {
            throw new UserError("Senha deve ter pelo menos 6 caracteres.");
        }

        // 2. Encapsulamento da Lógica de Hash
        const passwordHash = await passwordHasher.hash(props.password);

        return new User({ ...props, passwordHash }, id);
    }

    public static recreate(props: UserCreationProps, id: number): User {
        return new User({ ...props, passwordHash: props.password }, id);
    }

    public async comparePassword(password: string, passwordHasher: IPasswordHasher): Promise<boolean> {
        return passwordHasher.compare(password, this.passwordHash);
    }

    public getPasswordHash(): string {
        return this.passwordHash;
    }
}
