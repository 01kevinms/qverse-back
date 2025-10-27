import { FastifyInstance } from "fastify";
import ResponseQuiz from "./Ranking.route";
import { quizRoutes } from "./opentdb.route";

export default async function Routes(fastify: FastifyInstance) {


    fastify.get('/', async (req, reply) => { 
        return { 
        status: 'ok',
        message:'server is healthy'
    
    }; });

    fastify.register(ResponseQuiz)
    fastify.register(quizRoutes)
   
}