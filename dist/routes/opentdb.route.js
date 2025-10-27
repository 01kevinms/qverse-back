"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRoutes = quizRoutes;
const opendtb_controller_1 = require("../controller/opendtb.controller");
async function quizRoutes(app) {
    app.get("/quiz", async (req, reply) => (0, opendtb_controller_1.getQuiz)(req, reply));
    app.get("/categories", async (req, reply) => (0, opendtb_controller_1.getCategories)(req, reply));
    app.get("/categories/:categoryId", async (req, reply) => (0, opendtb_controller_1.getQuizByCategory)(req, reply));
}
