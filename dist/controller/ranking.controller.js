"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRanking = getRanking;
exports.getRankingName = getRankingName;
exports.getPosition = getPosition;
exports.createRanking = createRanking;
const prisma_1 = __importDefault(require("../config/prisma"));
async function getRanking(req, reply) {
    const players = await prisma_1.default.player.findMany({
        orderBy: { score: "desc" },
    });
    return reply.send(players);
}
async function getRankingName(req, reply) {
    const { name } = req.params;
    const existing = await prisma_1.default.player.findUnique({
        where: { name }, // funciona se name for único
    });
    return reply.send({ exists: !!existing });
}
async function getPosition(req, reply) {
    const { name } = req.params;
    const players = await prisma_1.default.player.findMany({
        orderBy: { score: "desc" },
    });
    const index = players.findIndex(p => p.name === name);
    const player = players[index];
    return reply.send({
        player,
        position: index + 1,
    });
}
async function createRanking(req, reply) {
    const { name, score } = req.body;
    if (!name || typeof score !== "number") {
        return reply.code(400).send({ error: "name and score are required" });
    }
    // 🔹 Verifica se o jogador já existe
    const existing = await prisma_1.default.player.findUnique({
        where: { name },
    });
    // 🔹 Se já existir, soma o score
    let player;
    if (existing) {
        player = await prisma_1.default.player.update({
            where: { name },
            data: { score: existing.score + score },
        });
    }
    else {
        // 🔹 Se não existir, cria o jogador
        player = await prisma_1.default.player.create({
            data: { name, score },
        });
    }
    return reply.send(player);
}
