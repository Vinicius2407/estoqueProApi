import { FastifyInstance, FastifyPluginOptions } from "fastify";

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    const userController = options.controllers.userController;

    fastify.post('/user', async (request, reply) => {
        const httpResponse = await userController.create(request.body);
        reply.status(httpResponse.statusCode).send(httpResponse.body);
    });
}