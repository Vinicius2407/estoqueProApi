import { and, eq } from "drizzle-orm";

import { Pagination } from "@/core/application/ports/out/repositories/IRepository";
import { IUserRepository } from "@/core/application/ports/out/repositories/user/IUserRepository";
import { RepositoryError } from "@/core/domain/errors/RepositoryError";
import { User } from "@/core/domain/models/User";
import { db } from "@/infrastructure/driven/persistence/database/drizzle";
import { usersTable } from "@/infrastructure/driven/persistence/database/drizzle/schema";

export class UserRepository implements IUserRepository {
    async create(item: User): Promise<User> {
        try {
            const [userDb] = await db
                .insert(usersTable)
                .values({
                    name: item.name,
                    email: item.email,
                    password: item.getPasswordHash(),
                    telephone: item.telephone,
                    document: item.document,
                    active: item.active!,
                })
                .returning();

            return User.recreate({ ...userDb }, userDb.id);
        } catch (error) {
            throw new RepositoryError("Erro ao criar usuário: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async update(item: User): Promise<User> {
        try {
            const [user] = await db
                .update(usersTable)
                .set({
                    name: item.name,
                    email: item.email,
                    telephone: item.telephone,
                    document: item.document,
                    active: item.active,
                })
                .where(eq(usersTable.id, item.id))
                .returning();

            if (!user || user.id === undefined || user.id !== item.id) {
                throw new Error("User not found");
            }

            return item;
        } catch (error) {
            throw new RepositoryError("Erro ao atualizar usuário: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const [deleted] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning({ id: usersTable.id });

            if (!deleted || deleted.id === undefined || deleted.id !== id) {
                throw new Error("User not found");
            }

            return Promise.resolve();
        } catch (error) {
            throw new RepositoryError("Erro ao deletar usuário: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const userDb = await db.query.usersTable.findFirst({
                where: eq(usersTable.id, id),
            });

            if (!userDb) {
                return null;
            }

            return User.recreate({ ...userDb }, userDb.id);
        } catch (error) {
            throw new RepositoryError("Erro ao buscar usuário por ID: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
        try {
            const userDb = await db.query.usersTable.findFirst({
                where: and(eq(usersTable.email, email), eq(usersTable.password, password)),
            });

            if (!userDb) {
                return null;
            }

            return User.recreate({ ...userDb }, userDb.id);
        } catch (error) {
            throw new RepositoryError("Erro ao buscar usuário por email e senha: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const userDb = await db.query.usersTable.findFirst({
                where: and(eq(usersTable.email, email)),
            });

            if (!userDb) {
                return null;
            }

            return User.recreate({ ...userDb }, userDb.id);
        } catch (error) {
            throw new RepositoryError("Erro ao buscar usuário por email: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    async findAll(pagination: { itemPerPage: number; page: number }): Promise<Pagination<User>> {
        try {
            const usersDb = await db.query.usersTable.findMany({});
            const users: User[] = usersDb.map((userDb) => User.recreate({ ...userDb }, userDb.id));

            return new Pagination<User>(
                pagination.itemPerPage,
                pagination.page,
                users.length,
                Math.ceil(users.length / pagination.itemPerPage),
                users.slice((pagination.page - 1) * pagination.itemPerPage, pagination.page * pagination.itemPerPage),
            );
        } catch (error) {
            throw new RepositoryError("Erro ao buscar todos os usuários: " + (error instanceof Error ? error.message : String(error)));
        }
    }
}
