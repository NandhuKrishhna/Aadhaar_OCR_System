import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import route from "./app/routes/routes";
import { limiter } from "./utils/rateLimiter";
import errorHandler from "./app/errorHandler";
import { FRONTEND_URL, PORT } from "./utils/env";

const app: Application = express();
const server = http.createServer(app);


const corsOptions = {
    origin: 'https://aadhaar-ocr-system-bq61.vercel.app',
    credentials: true,
};


app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(limiter);


app.use("/api", route);


app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: "fail",
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

app.use(errorHandler);

const port = Number(PORT);
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
