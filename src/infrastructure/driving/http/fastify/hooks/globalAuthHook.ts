import { FastifyReply, FastifyRequest } from "fastify";

import { IJWT } from "../../../../../core/application/ports/out/jwt/IJWT";
import { IJWTUserpayload } from "../../../../driven/services/JWTToken";

export const makeGlobalAuthHook = (jwtService: IJWT) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        if ((request.routeOptions.config as any)?.isPublic) return;

        try {
            const authHeader = request.headers.authorization?.replace("Bearer ", "");

            if (!authHeader) throw new Error("No token provided");

            const sub = await jwtService.compare(authHeader);

            if (!sub) throw new Error("No token provided");

            request.user = { sub } as IJWTUserpayload;
        } catch {
            return reply.status(401).send({ error: "Unauthorized" });
        }
    };
};
