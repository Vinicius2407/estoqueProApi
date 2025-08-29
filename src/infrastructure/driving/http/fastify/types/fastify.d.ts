import "fastify";
import { IJWTUserpayload } from "../../../../driven/services/JWTToken";

declare module 'fastify' {
    // Estende a interface FastifyRequest original
    export interface FastifyRequest {
        // Adiciona a nossa propriedade `user` customizada.
        // Ela é opcional (?) porque requisições em rotas públicas não a terão.
        user?: JWTUserPayload;

    }
}