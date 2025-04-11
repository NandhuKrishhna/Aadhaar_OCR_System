import assert from "node:assert";
import { HttpStatusCode } from "./http";
import AppErrorCode from "./AppErrorCode";
import AppError from "./AppError";

type ThrowIfInvalid = (
    condition: any,
    httpsStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts  condition;


const throwIfInvalid: ThrowIfInvalid = (
    condition,
    httpsStatusCode,
    message,
    appErrorCode
) => assert(condition, new AppError(httpsStatusCode, message, appErrorCode));

export default throwIfInvalid;