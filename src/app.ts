import dotenv from "dotenv";
import type { FastifyInstance } from "../node_modules/fastify/fastify";
import fastify from "../node_modules/fastify/fastify";
import cors from '@fastify/cors'
import Routes from "./routes/index.route";


dotenv.config();
const app:FastifyInstance = fastify({
    logger:true
})


app.register(cors,{ 
  origin: ["https://01kevinms.github.io"], // Origem permitida (seu frontend no GitHub Pages)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos liberados
  allowedHeaders: ["Content-Type", "Authorization"]
})

  app.register(Routes,{prefix:"/api"})

  export default app