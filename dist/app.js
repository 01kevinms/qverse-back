"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("../node_modules/fastify/fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const index_route_1 = __importDefault(require("./routes/index.route"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({
    logger: true
});
app.register(cors_1.default, {
    origin: ["https://01kevinms.github.io"], // Origem permitida (seu frontend no GitHub Pages)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos liberados
    allowedHeaders: ["Content-Type", "Authorization"]
});
app.register(index_route_1.default, { prefix: "/api" });
exports.default = app;
