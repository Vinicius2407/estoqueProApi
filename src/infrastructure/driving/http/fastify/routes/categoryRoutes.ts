import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CategoryController } from "../../controllers/category/CategoryController";

export async function categoryRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    const categoryController = options.controllers.categoryController as CategoryController;

    fastify.post("/category", async (request, reply) => {
        const httpResponse = await categoryController.create(request);
        reply.status(httpResponse.statusCode).send(httpResponse.body);
    });

    fastify.get("/category/:id", async (request, reply) => {
        const httpResponse = await categoryController.getById(request);
        reply.status(httpResponse.statusCode).send(httpResponse.body);
    });

    fastify.get("/category/byName", async (request, reply) => {
        const httpResponse = await categoryController.getByName(request);
        reply.status(httpResponse.statusCode).send(httpResponse.body);
    });
}
