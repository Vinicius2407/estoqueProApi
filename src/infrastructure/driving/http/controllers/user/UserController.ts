import { inject, injectable } from "tsyringe";

import { CreateUser } from "@/core/application/use-cases/user/CreateUser";
import { CreateUserInput } from "@/core/application/use-cases/user/CreateUserDTO";
import { SignIn } from "@/core/application/use-cases/user/SignIn";
import { InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from "@/core/domain/errors/UserError";
import { badRequest, conflict, created, HttpResponse, ok, unauthorized } from "@/infrastructure/driving/http/Http";
import { createUserSchema, signInSchema } from "@/infrastructure/driving/http/controllers/user/UserSchema";
import { validateWithZod } from "@/infrastructure/utils/zod-validation";

@injectable()
export class UserController {
    constructor(
        @inject("CreateUser") private readonly createUserUseCase: CreateUser,
        @inject("SignIn") private readonly signInUseCase: SignIn,
    ) {}

    async create(body: any): Promise<HttpResponse> {
        const data = await validateWithZod(createUserSchema, body);
        try {
            var user = await this.createUserUseCase.execute(data as CreateUserInput);
            return created({ user });
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                return conflict({ error: error.message });
            }

            return badRequest({ error: (error as Error).message });
        }
    }

    async signIn(body: any): Promise<HttpResponse> {
        const data = await validateWithZod(signInSchema, body);
        try {
            var accessToken = await this.signInUseCase.execute(data);
            return ok(accessToken);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return badRequest({ error: error.message });
            }

            if (error instanceof InvalidCredentialsError) {
                return unauthorized({ error: error.message });
            }

            return badRequest({ error: (error as Error).message });
        }
    }
}
