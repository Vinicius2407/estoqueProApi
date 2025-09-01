import { InitializeCategory } from "./category/initialize";
import { InitializeUser } from "./user/initialize";

export const userController = new InitializeUser();
export const categoryController = new InitializeCategory();
