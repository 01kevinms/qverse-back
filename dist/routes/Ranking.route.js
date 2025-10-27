"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ranking_controller_1 = require("../controller/ranking.controller");
const RankingRoutes = async (fastify) => {
    try {
        fastify.get("/ranking", async (req, reply) => (0, ranking_controller_1.getRanking)(req, reply));
        fastify.get("/ranking/:name", async (req, reply) => (0, ranking_controller_1.getPosition)(req, reply));
        fastify.get("/ranking/check/:name", async (req, reply) => (0, ranking_controller_1.getRankingName)(req, reply));
        fastify.post("/ranking", async (req, reply) => (0, ranking_controller_1.createRanking)(req, reply));
        fastify.put("/ranking", async (req, reply) => (0, ranking_controller_1.createRanking)(req, reply));
    }
    catch (error) {
        console.error("Error registering ranks routes:", error);
    }
};
exports.default = RankingRoutes;
