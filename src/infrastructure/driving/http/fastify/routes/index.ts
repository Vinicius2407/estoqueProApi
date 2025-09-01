import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { categoryRoutes } from "./categoryRoutes";
import { userRoutes } from "./userRoutes";

export async function mainRouter(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(userRoutes, { controllers: options.controllers, prefix: "/v1" });
    fastify.register(categoryRoutes, { controllers: options.controllers, prefix: "/v1" });
}
