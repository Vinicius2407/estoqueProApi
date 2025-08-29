import { boolean, doublePrecision, integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial().primaryKey().unique(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    telephone: varchar({ length: 13 }).notNull(),
    document: varchar({ length: 100 }).notNull(),
    active: boolean().notNull(),
});

export const categoryTable = pgTable("categories", {
    id: serial().primaryKey().unique().notNull(),
    name: varchar({ length: 255 }).notNull().unique(),
});

export const productTable = pgTable("products", {
    id: serial().primaryKey().unique().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    basePrice: doublePrecision("base_price").notNull().default(0.0),
    categoryId: serial("category_id")
        .notNull()
        .references(() => categoryTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const stockItem = pgTable("stock_item", {
    id: serial().primaryKey().unique().notNull(),
    color: varchar({ length: 255 }),
    size: varchar({ length: 255 }),
    quantity: integer().default(0).notNull(),
    sku: varchar({ length: 300 }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const imageStatus = pgEnum("image_status", ["uploading", "processing", "success", "failed"]);

export const imageProduct = pgTable("image_product", {
    id: serial().primaryKey().unique().notNull(),
    inputFileKey: varchar("input_file_key", { length: 255 }).notNull(),
    productId: serial("product_id")
        .notNull()
        .references(() => productTable.id, { onDelete: "cascade" }),
    status: imageStatus().notNull(),
});
