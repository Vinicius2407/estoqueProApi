import "reflect-metadata";
import "dotenv/config";

import { FastifyServer } from "./src/infrastructure/driving/http/fastify/server";
const server = new FastifyServer();
server.start(3000);
