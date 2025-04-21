import App from "./app";
import { Request, Response } from "express";

const app = new App();

export default (req: Request, res: Response) => {
    app.app(req, res);
};
