"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./config/prisma");
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT);
// initiallizerFirebaseAdmin()   //iniciar o firebase
const startServe = async () => {
    try {
        await (0, prisma_1.prismaConnect)();
        const listenOptions = {
            port: PORT,
            host: "0.0.0.0",
        };
        await app_1.default.listen(listenOptions);
        console.log(`server is running on port ${PORT}`);
    }
    catch (error) {
    }
};
startServe();
