"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
async function authMiddleware(req, reply) {
    const authHeadler = req.headers.authorization;
    if (!authHeadler || !authHeadler.startsWith('Bearer ')) {
        reply.code(401).send({ error: 'token de auth nao fornecido' });
        return;
    }
    const token = authHeadler.replace('Bearer ', '').trim();
    try {
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        // req.userId = decodedToken.uid
    }
    catch (error) {
        req.log.error('error ao verificar token');
        reply.code(401).send({ error: ' token invalido ou expirado' });
    }
}
