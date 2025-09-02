import { container } from "tsyringe";

import { CreateUser } from "@/core/application/use-cases/user/CreateUser";
import { SignIn } from "@/core/application/use-cases/user/SignIn";
import { UserController } from "@/infrastructure/driving/http/controllers/user/UserController";

export class InitializeUser {
    static userController() {
        container.register(CreateUser, { useClass: CreateUser });
        container.register(SignIn, { useClass: SignIn });

        return container.resolve(UserController);
    }
}
