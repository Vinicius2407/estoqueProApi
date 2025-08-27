import 'dotenv/config'
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/infrastructure/database/schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    out: './src/infrastructure/database/migrations',
    migrations: {
        schema: 'public',
        table: 'migrations',
        prefix: 'timestamp'
    }
})