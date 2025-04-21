import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import route from "./app/routes/routes";
import { limiter } from "./utils/rateLimiter";
import errorHandler from "./app/errorHandler";
import { FRONTEND_URL } from "./utils/env";

const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(limiter);

app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", cors());

app.use("/api", route);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: "fail",
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

app.use(errorHandler);

// ✅ Export the app (important for Vercel)
export default app;
