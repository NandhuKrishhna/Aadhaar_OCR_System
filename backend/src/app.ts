import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import { FRONTEND_URL } from "./utils/env";
import route from "./app/routes/routes";
import { limiter } from "./utils/rateLimiter";
import errorHandler from "./app/errorHandler";

class App {
    public app: Application;
    public corsOptions = {
        origin: true,
        credentials: true,
    };

    constructor() {
        this.app = express();
        this.applyMiddleware();
        this.registerRoutes();
        this.registerErrorHandler();
    }

    private applyMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(cors(this.corsOptions));
        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(cookieParser());
        this.app.use(limiter);
    }

    private registerRoutes(): void {
        this.app.use("/api", route);

        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                status: "fail",
                message: `Cannot ${req.method} ${req.originalUrl}`,
            });
        });
    }

    private registerErrorHandler(): void {
        this.app.use(errorHandler);
    }
}

export default App;
