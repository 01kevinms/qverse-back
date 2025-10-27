import { FastifyReply, FastifyRequest } from "fastify";
import { OpenTDBResponse } from "../types/type.manys";
import { CATEGORY_MAP } from "../types/category";



// routes/quiz.ts
// controller/quiz.controller.ts

export async function getQuiz(req: FastifyRequest, reply: FastifyReply) {
  const { category, difficulty, limit } = (req.query as any) || {};

  const url = new URL("https://the-trivia-api.com/api/questions");
  if (category) url.searchParams.set("categories", category);
  if (difficulty) url.searchParams.set("difficulties", difficulty);
  url.searchParams.set("limit", limit || "10");

  try {
    const res = await fetch(url);
    const data = (await res.json()) as any[];

    // 🧠 Formatando para o front receber o texto da pergunta também
    const formatted = data.map((q: any) => ({
      id: q.id,
      question: q.question?.text || q.question || "Pergunta não disponível",
      correct: q.correctAnswer,
      options: [...q.incorrectAnswers, q.correctAnswer].sort(),
      category: q.category,
      difficulty: q.difficulty,
      type: q.type || "multiple",
    }));

    return reply.send(formatted);
  } catch (err) {
    console.error("Erro ao buscar quiz:", err);
    return reply.status(500).send({ error: "Erro ao buscar quiz" });
  }
}

export async function getCategories(req: FastifyRequest, reply: FastifyReply) {

try {
  
      const res= await fetch('https://the-trivia-api.com/api/categories')
      const data = await res.json()
      return reply.send(data)
} catch (error) {
    console.error(error);
      return reply.status(500).send({ message: "Erro ao buscar categorias" });
   
}
  
}

// controller/opentdb.controller.ts
export async function getQuizByCategory(req: FastifyRequest, reply: FastifyReply) {
  const { category } = req.query as { category: string };

  if (!category || !CATEGORY_MAP[category]) {
    return reply.status(400).send({ error: "Categoria inválida" });
  }

  const tags = CATEGORY_MAP[category]; // array de tags internas

  try {
    const url ="https://the-trivia-api.com/api/categories";
    const res = await fetch(url);
    const data = (await res.json()) as OpenTDBResponse[];

    const formatted = data.map((q: any) => ({
      id: q.id,
      question: q.question?.text || q.question,
      correct: q.correctAnswer,
      options: [...q.incorrectAnswers, q.correctAnswer].sort(() => Math.random() - 0.5),
      category: q.category,
      difficulty: q.difficulty,
      type: q.type,
    }));

    return reply.send(formatted);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    return reply.status(500).send({ error: "Erro ao buscar perguntas" });
  }
}

