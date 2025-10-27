import { FastifyInstance } from "fastify";
import { getCategories, getQuiz, getQuizByCategory } from "../controller/opendtb.controller";

export async function quizRoutes(app: FastifyInstance) {
  app.get("/quiz", async (req, reply) => getQuiz(req,reply))
  app.get("/categories", async (req, reply)=> getCategories(req, reply))
  app.get("/categories/:categoryId", async (req, reply)=> getQuizByCategory(req, reply))

}