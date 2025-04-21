import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import AppErrorCode from "../utils/AppErrorCode";
import { INTERNAL_SERVER_ERROR } from "../utils/http";


const errorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {


    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: "error",
            message: error.message,
            errorCode: error.errorCode,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    if (error.name === "AssertionError" && error.message instanceof AppError) {
        const err = error.message;
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
            errorCode: err.errorCode || AppErrorCode.GENERIC,
            timestamp: new Date().toISOString(),
        });
        return;
    }

    console.error("Unhandled Error:", error);

    res.status(INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Something went wrong. Please try again later.",
        errorCode: AppErrorCode.GENERIC,
        timestamp: new Date().toISOString(),
    });
};

export default errorHandler