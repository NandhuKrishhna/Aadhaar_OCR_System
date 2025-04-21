import { Application, Request, Response, NextFunction } from "express";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import route from "./app/routes/routes";
import { limiter } from "./utils/rateLimiter";
import errorHandler from "./app/errorHandler";
import { FRONTEND_URL } from "./utils/env";

class App {
    public app: Application;
    public server: http.Server;
    public corsOptions = {
        origin: 'https://aadhaar-ocr-system-pjds.vercel.app',
        credentials: true,
    };

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
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

    public startServer(PORT: number): void {
        this.server.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    }
}

export default App;
