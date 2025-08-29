import { and, eq } from "drizzle-orm";

import { IUserRepository } from "../../../../../core/application/ports/out/user/IUserRepository";
import { User } from "../../../../../core/domain/models/User";
import { db } from "../../database/drizzle";
import { usersTable } from "../../database/drizzle/schema";
import { Pagination } from "../../../../../core/application/ports/out/IRepository";

export class UserRepository implements IUserRepository {

    async create(item: User): Promise<User> {
        const [userDb] = await db.insert(usersTable).values({
            name: item.name,
            email: item.email,
            password: item.password,
            telephone: item.telephone,
            document: item.document,
            active: item.active!,
        }).returning(
            {
                id: usersTable.id,
            }
        );

        item.id = userDb!.id;

        return item;
    }

    async update(item: User): Promise<User> {
        const [user] = await db.update(usersTable).set({
            name: item.name,
            email: item.email,
            telephone: item.telephone,
            document: item.document,
            active: item.active,
        }).where(
            eq(usersTable.id, item.id)
        ).returning();

        if (!user || user.id === undefined || user.id !== item.id) {
            throw new Error("User not found");
        }

        return item;
    }

    async delete(id: number): Promise<void> {
        const [deleted] = await db.delete(usersTable).where(
            eq(usersTable.id, id)
        ).returning({ id: usersTable.id });

        if (!deleted || deleted.id === undefined || deleted.id !== id) {
            throw new Error("User not found");
        }

        return Promise.resolve();
    }

    async findById(id: number): Promise<User | null> {
        const userDb = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, id)
        });

        if (!userDb) {
            return null;
        }

        return new User({ ...userDb }, userDb.id);
    }

    async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
        const userDb = await db.query.usersTable.findFirst({
            where: and(
                eq(usersTable.email, email),
                eq(usersTable.password, password)
            )
        });

        if (!userDb) {
            return null;
        }

        return new User({
            ...userDb
        }, userDb.id);
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDb = await db.query.usersTable.findFirst({
            where: and(
                eq(usersTable.email, email),
            )
        });

        if (!userDb) {
            return null;
        }

        return new User({ ...userDb }, userDb.id);
    }

    async findAll(pagination: { itemPerPage: number, page: number }): Promise<Pagination<User>> {
        const usersDb = await db.query.usersTable.findMany({});
        const users: User[] = usersDb.map(userDb => new User({ ...userDb }, userDb.id));

        return new Pagination<User>(
            pagination.itemPerPage,
            pagination.page,
            users.length,
            Math.ceil(users.length / pagination.itemPerPage),
            users.slice((pagination.page - 1) * pagination.itemPerPage, pagination.page * pagination.itemPerPage)
        );
    }
}