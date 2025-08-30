import fastify from "fastify";
import { userController } from "../../../../main/bootstrap";
import { mainRouter } from "./routes";
import { JWTToken } from "../../../driven/services/JWTToken";
import { makeGlobalAuthHook } from "./hooks/globalAuthHook";

export class FastifyServer {
    private app = fastify({ logger: true });

    async start(port: number) {
        const controllers = {
            jwtService: JWTToken,
            userController,
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
