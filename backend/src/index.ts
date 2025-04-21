import App from "./app";
import { PORT } from "./utils/env";
import { Request, Response, } from "express";
const port = Number(PORT)
const app = new App();

export default (req: Request, res: Response,) => {
    app.app(req, res);
};