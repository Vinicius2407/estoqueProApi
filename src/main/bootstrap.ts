
import { CreateUser } from "../core/application/use-cases/user/CreateUser";
import { UserRepository } from "../infrastructure/driven/persistence/repositories/drizzle/UserRepository";
import { PasswordHasher } from "../infrastructure/driven/services/PasswordHasher";
import { UserController } from "../infrastructure/driving/http/controllers/user/UserController";

const passwordHashed = new PasswordHasher();

const userRepository = new UserRepository();
const createUserUseCase = new CreateUser(userRepository, passwordHashed);
export const userController = new UserController(createUserUseCase);