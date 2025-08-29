import { CreateUser } from "../../../../../core/application/use-cases/user/CreateUser";
import { SignIn } from "../../../../../core/application/use-cases/user/SignIn";
import { badRequest, created, HttpResponse, ok } from "../../Http";

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUser,
        private readonly signInUseCase: SignIn
    ) { }

    async create(body: any): Promise<HttpResponse> {
        try {
            var user = await this.createUserUseCase.execute(body);

            return created({ user });
        } catch (error) {
            return badRequest({ error: (error as Error).message });
        }
    }

    async signIn(body: any): Promise<HttpResponse> {
        try {
            var accessToken = await this.signInUseCase.execute(body);

            return ok({ accessToken });
        } catch (error) {
            return badRequest({ error: (error as Error).message });
        }
    }
}
