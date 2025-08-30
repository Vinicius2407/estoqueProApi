import { IJWTUserpayload } from "../../../../driven/services/JWTToken";

declare module "fastify" {
    export interface FastifyRequest {
        // Usando 'any' por enquanto para o teste.
        user?: IJWTUserpayload;
    }
}
