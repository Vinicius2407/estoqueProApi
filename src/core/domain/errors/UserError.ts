export class UserAlreadyExistsError extends Error {
    constructor() {
        super("E-mail already registered.");
        this.name = "UserAlreadyExistsError";
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super("Email ou senha inválidos.");
        this.name = "UserNotFoundError";
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super("Email ou senha inválidos.");
        this.name = "InvalidCredentialsError";
    }
}
