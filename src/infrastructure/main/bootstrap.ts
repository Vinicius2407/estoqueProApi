import { InitializeCategory } from "@/infrastructure/main/category/initialize";
import { InitializeUser } from "@/infrastructure/main/user/initialize";

export const userController = InitializeUser.userController();
export const categoryController = InitializeCategory.categoryController();