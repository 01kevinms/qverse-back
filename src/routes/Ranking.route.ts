import { FastifyInstance } from "fastify";
import { createRanking,  getPosition,  getRanking, getRankingName  } from "../controller/ranking.controller";



const RankingRoutes = async (fastify: FastifyInstance)=>{

try {
    fastify.get("/ranking", async(req,reply)=> getRanking(req, reply))
    fastify.get("/ranking/:name", async(req,reply)=> getPosition(req, reply))
    fastify.get("/ranking/check/:name", async(req,reply)=> getRankingName(req, reply))
    fastify.post("/ranking", async(req,reply)=> createRanking(req,reply))
    fastify.put("/ranking", async(req,reply)=> createRanking(req,reply))
    

} catch (error) {
     console.error("Error registering ranks routes:", error);
}

}
export default RankingRoutes