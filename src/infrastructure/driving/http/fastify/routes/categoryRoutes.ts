import { FastifyInstance, FastifyPluginOptions } from "fastify";

export async function categoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    const categoryController = options.controllers.categoryController;

    fastify.post("/category", async (request, reply) => {
        const httpResponse = await categoryController.create(request);
        reply.status(httpResponse.statusCode).send(httpResponse);
    });

    fastify.get("/category/:id", async (request, reply) => {
        const httpResponse = await categoryController.getById(request);
        reply.status(httpResponse.statusCode).send(httpResponse);
    });
}