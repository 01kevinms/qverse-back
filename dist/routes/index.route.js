"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Routes;
const Ranking_route_1 = __importDefault(require("./Ranking.route"));
const opentdb_route_1 = require("./opentdb.route");
async function Routes(fastify) {
    fastify.get('/', async (req, reply) => {
        return {
            status: 'ok',
            message: 'server is healthy'
        };
    });
    fastify.register(Ranking_route_1.default);
    fastify.register(opentdb_route_1.quizRoutes);
}
