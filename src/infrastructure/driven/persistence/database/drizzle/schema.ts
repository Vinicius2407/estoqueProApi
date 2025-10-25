import { relations } from "drizzle-orm";
import { boolean, doublePrecision, integer, pgEnum, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
}

export const usersTable = pgTable("users", {
    id: serial().primaryKey().unique(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    telephone: varchar({ length: 13 }).notNull(),
    document: varchar({ length: 100 }).notNull(),
    active: boolean().notNull(),
    ...timestamps
});

export const usersRelations = relations(usersTable, () => ({}));

export const masterCategoryTable = pgTable("master_categories", {
    id: serial().primaryKey().unique().notNull(),
    name: varchar({ length: 255 }).notNull().unique(),
    ...timestamps
});

export const masterCategoryRelations = relations(masterCategoryTable, ({ many }) => ({
    categories: many(categoryTable),
}));

export const categoryTable = pgTable("categories", {
    id: serial().primaryKey().unique().notNull(),
    name: varchar({ length: 255 }).notNull().unique(),
    masterCategoryId: integer("master_category_id",)
        // .notNull()
        .references(() => masterCategoryTable.id, { onDelete: "cascade" }),
    ...timestamps
});

export const categoryRelations = relations(categoryTable, ({ one, many }) => ({
    masterCategory: one(masterCategoryTable, {
        fields: [categoryTable.masterCategoryId],
        references: [masterCategoryTable.id],
    }),
    products: many(productOnCategoryTable),
}));

export const productOnCategoryTable = pgTable("product_category", {
    productId: serial("product_id")
        .notNull()
        .references(() => productTable.id, { onDelete: "cascade" }),
    categoryId: serial("category_id")
        .notNull()
        .references(() => categoryTable.id, { onDelete: "cascade" }),
});

export const productOnCategoryRelations = relations(productOnCategoryTable, ({ one }) => ({
    product: one(productTable, {
        fields: [productOnCategoryTable.productId],
        references: [productTable.id],
    }),
    category: one(categoryTable, {
        fields: [productOnCategoryTable.categoryId],
        references: [categoryTable.id],
    }),
}));

export const productTable = pgTable("products", {
    id: serial().primaryKey().unique().notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: varchar({ length: 255 }).notNull(),
    basePrice: doublePrecision("base_price").notNull().default(0.0),
    ...timestamps
});

export const productRelations = relations(productTable, ({ many }) => ({
    categories: many(productOnCategoryTable),
    stockItems: many(stockItem),
    images: many(imageProduct),
}));

export const stockItem = pgTable("stock_item", {
    id: serial().primaryKey().unique().notNull(),
    productId: serial("product_id")
        .notNull()
        .references(() => productTable.id, { onDelete: "cascade" }),
    color: varchar({ length: 255 }),
    size: varchar({ length: 255 }),
    quantity: integer().default(0).notNull(),
    sku: varchar({ length: 300 }),
    ...timestamps
});

export const stockItemRelations = relations(stockItem, ({ one }) => ({
    product: one(productTable, {
        fields: [stockItem.productId],
        references: [productTable.id],
    }),
}));

export const imageStatus = pgEnum("image_status", ["uploading", "processing", "success", "failed"]);

export const imageProduct = pgTable("image_product", {
    id: serial().primaryKey().unique().notNull(),
    inputFileKey: varchar("input_file_key", { length: 255 }).notNull(),
    productId: serial("product_id")
        .notNull()
        .references(() => productTable.id, { onDelete: "cascade" }),
    status: imageStatus().notNull(),
    ...timestamps
});

export const imageProductRelations = relations(imageProduct, ({ one }) => ({
    product: one(productTable, {
        fields: [imageProduct.productId],
        references: [productTable.id],
    }),
}));

