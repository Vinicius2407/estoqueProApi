import { CreateUser } from "../../../../../core/application/use-cases/user/CreateUser";
import { badRequest, created, HttpResponse } from "../../Http";

export class UserController {
    constructor(private readonly createUserUseCase: CreateUser) { }

    async create(body: any): Promise<HttpResponse> {
        try {
            var user = await this.createUserUseCase.execute(body);

            return created({ user });
        } catch (error) {
            return badRequest({ error: (error as Error).message });
        }
    }
}
