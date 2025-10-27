import { FastifyReply, FastifyRequest,  } from "fastify";
import prisma from "../config/prisma";

 export async function getRanking(req: FastifyRequest, reply: FastifyReply) {
  const players = await prisma.player.findMany({
    orderBy: { score: "desc" },
  });
  return reply.send(players);
}

 export async function getRankingName(req: FastifyRequest, reply: FastifyReply) {
  const { name } = req.params as { name: string };
  const existing = await prisma.player.findUnique({
    where: { name }, // funciona se name for único
  });
  return reply.send({ exists: !!existing });
}

  export async function getPosition(req: FastifyRequest, reply: FastifyReply) {
  const { name } = req.params as { name: string };
  const players = await prisma.player.findMany({
    orderBy: { score: "desc" },
  });
  const index = players.findIndex(p => p.name === name);
  const player = players[index];

  return reply.send({
    player,
    position: index + 1,
  });
}
export async function createRanking(req: FastifyRequest, reply: FastifyReply) {
  const { name, score } = req.body as { name: string; score: number };

  if (!name || typeof score !== "number") {
    return reply.code(400).send({ error: "name and score are required" });
  }

  // 🔹 Verifica se o jogador já existe
  const existing = await prisma.player.findUnique({
    where: { name },
  });

  // 🔹 Se já existir, soma o score
  let player;
  if (existing) {
    player = await prisma.player.update({
      where: { name },
      data: { score: existing.score + score },
    });
  } else {
    // 🔹 Se não existir, cria o jogador
    player = await prisma.player.create({
      data: { name, score },
    });
  }

  return reply.send(player);
}


