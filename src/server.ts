import { FastifyListenOptions } from "fastify"
import { prismaConnect } from "./config/prisma"
import app from "./app"


const PORT = Number (process.env.PORT)

// initiallizerFirebaseAdmin()   //iniciar o firebase

const startServe=async()=>{
    try {
        
        await prismaConnect()


        const listenOptions: FastifyListenOptions = {
            port: PORT,
            host: "0.0.0.0",
        }
        await app.listen(listenOptions)
        console.log(`server is running on port ${PORT}`)
    } catch (error) {
        
    }
}
startServe()