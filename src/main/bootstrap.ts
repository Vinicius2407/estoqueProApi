import { InitializeCategory } from "./category/initialize";
import { InitializeUser } from "./user/initialize";

export const userController = InitializeUser.userController();
export const categoryController = InitializeCategory.categoryController();