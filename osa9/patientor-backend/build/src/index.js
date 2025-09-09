"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const diagnosisRoutes_1 = __importDefault(require("./routes/diagnosisRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
app.use("/api/diagnoses", diagnosisRoutes_1.default);
app.use("/api/patients", patientRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
