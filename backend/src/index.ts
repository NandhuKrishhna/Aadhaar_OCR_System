import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL, NODE_ENV, PORT } from "./utils/env";
import route from "./app/routes/routes";
import { limiter } from "./utils/rateLimiter";
import errorHandler from "./app/errorHandler";

const app = express();

// Middleware
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors({
    origin: FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(limiter);

// Routes
app.use("/api", route);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: "fail",
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

// Error Handler
app.use(errorHandler);

// Start Server
const port = Number(PORT) || 5000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
