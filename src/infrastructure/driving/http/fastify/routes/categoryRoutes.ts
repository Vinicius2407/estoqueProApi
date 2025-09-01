import { FastifyInstance, FastifyPluginOptions } from "fastify";

export async function categoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    const categoryController = options.controllers.categoryController;

    fastify.post("/category", async (request, reply) => {
        const httpResponse = await categoryController.create(request.body);
        reply.status(httpResponse.statusCode).send(httpResponse.body);
    });
}