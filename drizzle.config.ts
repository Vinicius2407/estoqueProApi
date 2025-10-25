import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/infrastructure/driven/persistence/database/drizzle/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    out: "./src/infrastructure/driven/persistence/database/drizzle/migrations",
    migrations: {
        schema: "public",
        table: "migrations",
        prefix: "timestamp",
    },
});
