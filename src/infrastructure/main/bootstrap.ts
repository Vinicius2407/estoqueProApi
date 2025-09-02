import { container } from "tsyringe";

import { InitializeCategory } from "@/infrastructure/main/category/initialize";
import { InitializeUser } from "@/infrastructure/main/user/initialize";
import { JWTToken } from "../driven/services/JWTToken";
import { PasswordHasher } from "../driven/services/PasswordHasher";

container.register("PasswordHasher", { useClass: PasswordHasher });
container.register("JWTToken", { useClass: JWTToken });

export const userController = InitializeUser.userController();
export const categoryController = InitializeCategory.categoryController();
