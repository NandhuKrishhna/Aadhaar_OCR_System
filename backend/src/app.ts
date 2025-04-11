import { Application } from "express";
import express from "express";
import http from 'http'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from "helmet";
import logger from 'morgan'
import { CORS_URL1, CORS_URL2, NODE_ENV } from "./utils/env";
import route from "./app/routes/routes";
import { limiter } from "./utils/rateLimiter";

class App {
    public app: Application;
    public corsOptions = {
        origin: NODE_ENV === "PROD"
            ? CORS_URL1
            : CORS_URL2,
        credentials: true,
    };
    server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    constructor() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.applyMiddleware()
        this.routes()

    }
    private applyMiddleware(): void {
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(cors(this.corsOptions));

        this.app.use(helmet());
        this.app.use(logger("dev"));
        this.app.use(cookieParser());
        this.app.use('/api', route)
        this.app.use(limiter)
    }
    private routes(): void {
        this.app.use((req, res, next) => {
            res.status(500).send('Something broke!');
        });


    }

    public startServer(PORT: number): void {
        this.server.listen(PORT, () => {
            console.log(`Server is running  http://localhost:${PORT}`);

        })
    }

}
export default App