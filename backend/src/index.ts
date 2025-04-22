import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL, NODE_ENV, PORT } from "./utils/env";
import route from "./app/routes/routes";
import errorHandler from "./app/errorHandler";

const app = express();
console.log(FRONTEND_URL)
// Middleware
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/api", route);
app.use((req, res, next) => {
    console.log("Request Path:", req.path);
    next();
});


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
