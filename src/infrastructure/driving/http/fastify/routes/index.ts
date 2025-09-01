import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { userRoutes } from "@/infrastructure/driving/http/fastify/routes/userRoutes";
import { categoryRoutes } from "@/infrastructure/driving/http/fastify/routes/categoryRoutes";

export async function mainRouter(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.register(userRoutes, { controllers: { userController: options.controllers.userController }, prefix: "/v1" });
    fastify.register(categoryRoutes, { controllers: { categoryController: options.controllers.categoryController }, prefix: "/v1" });
}
