import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { userRoutes } from "./userRoutes";
import { categoryRoutes } from "./categoryRoutes";

export async function mainRouter(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(userRoutes, { controllers: { userController: options.controllers.userController }, prefix: "/v1" });
    fastify.register(categoryRoutes, { controllers: { categoryController: options.controllers.categoryController }, prefix: "/v1" });
}
