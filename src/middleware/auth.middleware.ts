import fastify, { FastifyReply, FastifyRequest } from "fastify";
import  admin  from "firebase-admin";



declare module "fastify"{
    interface FastifyInstance{
        uerId?: string
    }
}

export async function authMiddleware(req:FastifyRequest, reply: FastifyReply){
const authHeadler= req.headers.authorization;
if (!authHeadler || !authHeadler.startsWith('Bearer ')) {
    reply.code(401).send({error:'token de auth nao fornecido'})
return
}

const token = authHeadler.replace('Bearer ', '').trim();
try {
    
    const decodedToken = await admin.auth().verifyIdToken(token)

// req.userId = decodedToken.uid
} catch (error) {
    req.log.error('error ao verificar token')
    reply.code(401).send({error:' token invalido ou expirado'})

}}