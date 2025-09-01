import fastify from "fastify";
import { categoryController, userController } from "@/infrastructure/main/bootstrap";
import { mainRouter } from "@/infrastructure/driving/http/fastify/routes";
import { JWTToken } from "@/infrastructure/driven/services/JWTToken";
import { makeGlobalAuthHook } from "@/infrastructure/driving/http/fastify/hooks/globalAuthHook";

export class FastifyServer {
    private app = fastify({ logger: true });

    async start(port: number) {
        const controllers = {
            userController,
            categoryController,
        };

        this.app.addHook("preHandler", makeGlobalAuthHook(new JWTToken()));
        this.app.register(mainRouter, { controllers });

        try {
            await this.app.listen({ port });
            console.log(`Server running at http://localhost:${port}`);
        } catch (err) {
            console.error("Error starting server:", err);
            await this.app.close();
            process.exit(1);
        }
    }
}
