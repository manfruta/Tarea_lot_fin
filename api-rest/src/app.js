import express from "express";
import morgan from "morgan";
// Routes
import apiRoutes from "./routes/api.routes";
// improt config 
import {JWT, PORT} from "./config";

// initializations database
import "./database/database";


const app = express();

// Settings
app.set("port", PORT.PORT);

// set JWT secret
app.set("jwt-secret", JWT.SECRET);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes version 1.0
app.use("/api/v1", apiRoutes);

export default app;
